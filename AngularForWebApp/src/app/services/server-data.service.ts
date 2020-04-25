import {Inject, Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Project} from '../models/Project';
import {SubTask} from '../models/SubTask';
import {StateOfTask} from '../models/StateOfTask';
import {StateOfProject} from '../models/StateOfProject';

@Injectable({
  providedIn: 'root'
})
export class  ServerDataService {
	projects: Project[];
	formProject: Project;
	subTasksDummy:SubTask[];
	dataBaseURL:string = "http://localhost:5050/";

	// setting all observables to share data across the websites
	private stateOfProject = new BehaviorSubject<StateOfProject>(null);
	stateOfProjectObservable = this.stateOfProject.asObservable();

  	constructor(private http:HttpClient) {
  		this.subTasksDummy = [
  			{
  				id:1,
				name: 'sub task backlog',
				creator: 'me',
				description: 'This is sub task 1, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore\n' +
					'\t\t\tmagna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd\n' +
					'\t\t\tgubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing\n' +
					'\t\t\telitr',
				state: StateOfTask.Backlog
			},
			{
				id:2,
				name: 'sub task running',
				creator: 'nice',
				description: ' 2 Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore\n' +
					'\t\t\tmagna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd\n' +
					'\t\t\tgubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing\n' +
					'\t\t\telitr',
				state: StateOfTask.Running
			},
			{
				id:3,
				name: 'sub task finished',
				creator: 'not me',
				description: '3 Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore\n' +
					'\t\t\tmagna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd\n' +
					'\t\t\tgubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing\n' +
					'\t\t\telitr',
				state: StateOfTask.Finished
			},
			{
				id:4,
				name: 'sub task backlog 2',
				creator: 'nice',
				description: '4 Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore\n' +
					'\t\t\tmagna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd\n' +
					'\t\t\tgubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing\n' +
					'\t\t\telitr',
				state: StateOfTask.Backlog
			},
			{
				id:5,
				name: 'sub task running',
				creator: 'nice',
				description: '5 Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore\n' +
					'\t\t\tmagna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd\n' +
					'\t\t\tgubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing\n' +
					'\t\t\telitr',
				state: StateOfTask.Running
			},
			{
				id:6,
				name: 'sub task running',
				creator: 'nice',
				description: '6 Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore\n' +
					'\t\t\tmagna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd\n' +
					'\t\t\tgubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing\n' +
					'\t\t\telitr',
				state: StateOfTask.Finished
			},
			{
				id:7,
				name: 'sub task running',
				creator: 'nice',
				description: '7 Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore\n' +
					'\t\t\tmagna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd\n' +
					'\t\t\tgubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing\n' +
					'\t\t\telitr',
				state: StateOfTask.Running
			}
		]
  	}

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
  		/* TODO:
		* let queryURL = this.dataBaseURL +"SubTasks/"+idOfProject;
		* return this.http.get(queryURL);
  		 */
		return this.subTasksDummy;
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
		alert(name);
		let project:Object = {
			"projectID": 0, // no need to be set, is handled by the db
			"name": name,
			"description": description,
			"manager": "lcdb",
			"state" : "running"
		}
		return this.http.post(this.dataBaseURL+"Project", project);
	}

	/**
	 * TODO wait for final version from API
	 * Adds a user to the user database.
	 * @param username which is the primary key of the user
	 * @param placeholder
	 * @param placeholder2
	 */
	addUser(username:string, placeholder:string,placeholder2:string){
		let user = {
			"username": username,
			"firstname":placeholder,
			"lastname":placeholder2
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
}
