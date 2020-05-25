import {Inject, Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Project} from '../models/Project';
import {SubTask} from '../models/SubTask';
import {StateOfTask} from '../models/StateOfTask';
import {StateOfProject} from '../models/StateOfProject';
import {environment} from '../../environments/environment';
import {AuthService} from '../components/core/authentication/auth.service';
import {log} from 'util';

@Injectable({
  providedIn: 'root'
})
export class ServerDataService {
	formProject: Project;
	dataBaseURL:string = environment.server;

	// setting all observables to share data across the websites
	private stateOfProject = new BehaviorSubject<StateOfProject>(null);
	stateOfProjectObservable = this.stateOfProject.asObservable();

  	constructor(private http:HttpClient, private authService:AuthService) {}

	/*
	 * all getters
	 */

	/**
	 * Gets all projects of the db
	 */
	getProjects(){
		return this.authService.getFromApiWithToken("Project/");
	}

	/**
	 * Get all projects of current user
	 */
	getProjectOfCurrentUser(){
		return this.authService.getFromApiWithToken("Project/ByUser/" + this.authService.userName);
	}

	/**
	 * Get the project of the db, which is identified by the given id
	 * @param idOfProject the id of the project to get from the db
	 */
	getProject(idOfProject:number){
		return this.authService.getFromApiWithToken("Project/" + idOfProject);
	}

	/**
	 * Returns all sub tasks of the specified project, by the id.
	 * @param idOfProject which specifies the project
	 */
	getSubTasks(idOfProject:number){
		return this.authService.getFromApiWithToken("SubTask/ByProject/"+idOfProject);
	}

	/**
 	* Returns all Members of the specified project, by the id.
 	* @param idOfProject which specifies the project
 	*/
	getUserOfProject(idOfProject:number){
		return this.authService.getFromApiWithToken('Project/'+idOfProject+'/ListUser');
	}


	/*
   	 * all posts
	 */
	/**
	 * Creates an project and adds it to the database with a post.
	 * @param name name of the project to add
	 * @param description description of the project to add
	 */
	addProject(name:string, description:string){
		let project:Object = {
			"projectID": 0, // no need to be set, is handled by the db
			"name": name,
			"description": description,
			"manager": this.authService.userName,
			"state" : "running"
		}
		return this.authService.postToApiWithToken('Project/',project);
	}

	/**
	 * Adds an sub task to the database using the api
	 * @param subTask
	 */
	addSubTask(subTask: any){
		return this.authService.postToApiWithToken('Subtask/',subTask);
	}

	/**
	 * TODO wait for final version from API
	 * Adds a user to the user database.
	 * @param username which is the primary key of the user
	 * @param name
	 */
	addUser(username:string,name:string){
		let user = {
			"username": username,
			"name":name,
		}
		this.http.post(this.dataBaseURL+"User",user).subscribe(value => {
			console.log(value);
		});
	}

	/**
	 * Join an existing Project via ProjectID
	 * @param projectID
	 */
	joinProject(projectID:number){
		return this.authService.postToApiWithTokenNoBody('Project/'+projectID+'/AddUser/'+this.authService.userName).subscribe(value => (console.log(value)));
	}

	/*
   	 * all puts
	 */
	/**
	 * Edits an existing project with a put-request.
	 * @param id Number to identify the project
	 * @param name name of the project to add
	 * @param description description of the project to add
	 * @param state state of running project
	 */

	editProject(id:number,name:string,description:string,state:string){
		let project:Object = {
			"projectID": id,
			"name": name,
			"description": description,
			"manager": this.authService.userName,
			"state" : state
		}
		return this.authService.putToApiWithToken('Project/',project);
	}

	/**
	 * Edits an existing sub task with a put-request.
	 * @param subTask The sub task object, which is already changed.
	 */
	editSubTask(subTask: SubTask){
		let parameter: string = JSON.stringify(subTask);
		return this.authService.putToApiWithToken('Subtask/', parameter);
	}

	/**
	 * changes the running attribute which is used to clarify which type of projects to show in the home view.
	 * @param running
	 */
  	changeRunning(running:StateOfProject){
  		this.stateOfProject.next(running);
	}

	/**
	 * Parses an array of JSON Objects to an array of projects
	 * @param rawProjects an array of json objects which represent projects
	 * @return an array of parsed projects
	 */
	static parseProjects(rawProjects:Object){
		let projects = [];
		for (let i in rawProjects){
			const project = rawProjects[i];
			projects.push(ServerDataService.parseProject(project));
		}
		return projects;
	}

	/**
	 * Parses an JSON Object to an project object.
	 * @param project the json object to parse
	 */
	static parseProject(project:any){
		return new Project(project.name,project.manager,project.description,project.state,project.projectID);
	}

	/**
	 * Parses an array of JSON Objects to an array of sub tasks
	 * @param subTasks an array of json objects which represent sub tasks
	 * @return an array of parsed sub tasks
	 */
	static parseSubTasks(subTasks:Object){
		let parsedSubTasks = [];
		for (let i in subTasks){
			parsedSubTasks.push(ServerDataService.parseSubTask(subTasks[i]));
		}
		return parsedSubTasks;
	}

	/**
	 * Parses an JSON Object to an sub task object.
	 * @param subTask the json object to parse
	 */
	static parseSubTask(subTask:any){
		return new SubTask(subTask.subtaskId,subTask.name,subTask.creator,subTask.description,subTask.state);
	}
}
