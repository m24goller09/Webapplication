import {Inject, Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Project} from '../models/Project';
import {SubTask} from '../models/SubTask';
import {StateOfTask} from '../models/StateOfTask';
import {StateOfProject} from '../models/StateOfProject';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServerDataService {
	projects: Project[];
	formProject: Project;
	subTasksDummy:SubTask[];
	dataBaseURL:string = environment.server;

	// setting all observables to share data across the websites
	private stateOfProject = new BehaviorSubject<StateOfProject>(null);
	stateOfProjectObservable = this.stateOfProject.asObservable();

  	constructor(private http:HttpClient) {}

	/*
	 * all getters
	 */

	/**
	 * Gets all projects of the db
	 */
	getProjects(){
		let queryURL = this.dataBaseURL + "Project"
		return this.http.get(queryURL);
	}

	/**
	 * Get the project of the db, which is identified by the given id
	 * @param idOfProject the id of the project to get from the db
	 */
	getProject(idOfProject:number){
		let queryURL = this.dataBaseURL + "Project/" + idOfProject;
		return this.http.get(queryURL);
	}

	/**
	 * Returns all sub tasks of the specified project, by the id.
	 * @param idOfProject which specifies the project
	 */
	getSubTasks(idOfProject:number){
		let queryURL = this.dataBaseURL +"SubTask/"+idOfProject;
		return this.http.get(queryURL);
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
			"manager": "lcdb", // TODO use logged in user
			"state" : "running"
		}
		return this.http.post(this.dataBaseURL+"Project", project);
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
		return [ServerDataService.parseSubTask(subTasks)];
		// TODO comment out
		for (let i in subTasks){
			const subTask = subTasks[i];
			console.log(subTask);
			parsedSubTasks.push(ServerDataService.parseSubTask(subTask));
		}
		return parsedSubTasks;
	}

	/**
	 * Parses an JSON Object to an sub task object.
	 * @param subTask the json object to parse
	 */
	static parseSubTask(subTask:any){
		console.log("parse "+subTask.state);
		return new SubTask(subTask.subtaskId,subTask.name,"TODO: placeholder",subTask.description,subTask.state);
	}
}
