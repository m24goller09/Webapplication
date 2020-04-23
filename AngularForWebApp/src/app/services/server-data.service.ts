import {Inject, Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Project} from '../models/Project';
import {SubTask} from '../models/SubTask';
import {StateOfTask} from '../models/StateOfTask';

@Injectable({
  providedIn: 'root'
})
export class ServerDataService {
	data: Project[];
	subTasksDummy:SubTask[];
	count: number = 0;
	dataBaseURL:string = "http://localhost:5050/";

	private runningParameter = new BehaviorSubject<string>("def");
	currentRunning = this.runningParameter.asObservable();

	private subTaskToShow = new BehaviorSubject<number>(-1);
	taskToShow = this.subTaskToShow.asObservable();

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
		this.data = [
			{
				name: 'test',
				creator: 'Me',
				running: true,
				description: 'This is the test description of this project and I like that long string.',
				id: ++this.count
			},
			{
				name: 'Test No 2',
				creator: 'Not me',
				running: true,
				description: 'What is this long project description nonsense.',
				id: ++this.count
			},
			{
				name: 'Test No 3',
				creator: 'Not me',
				running: true,
				description: 'What is this long project description nonsense.What is this long project description nonsense.What is this long project description nonsense.What is this long project description nonsense.What is this long project description nonsense.What is this long project description nonsense.What is this long project description nonsense.',
				id: ++this.count
			},
			{
				name: 'Test No 2',
				creator: 'Not me',
				running: true,
				description: 'What is this long project description nonsense.',
				id: ++this.count
			},
			{
				name: 'Test No 2',
				creator: 'Not me',
				running: true,
				description: 'What is this long project description nonsense.',
				id: ++this.count
			},
			{
				name: 'Test No 2',
				creator: 'Not me',
				running: true,
				description: 'What is this long project description nonsense.',
				id: ++this.count
			},
			{
				name: 'Test not running',
				creator: 'Not me',
				running: false,
				description: 'What is this long project description nonsense.',
				id: ++this.count
			}
		]
		//alert("New Service");
    }

	/*
	 * all getters
	 */
	getData(){
		// TODO: let queryURL = this.dataBaseURL + "Projects"
		let queryURL = this.dataBaseURL +"User/ew";
		return this.http.get(queryURL);
	}

	/**
	 * Returns all sub tasks of the specified project, by the id.
	 * @param idOfProject which specifies the project
	 */
	getSubtasks(idOfProject:number){
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
	 * @param name
	 * @param creator
	 * @param description
	 */
	addData(name:string,creator:string,description:string){

		let tProject:Project;
		tProject = new Project();

		tProject.name = name;
		tProject.creator = creator;
		tProject.description = description;
		tProject.running = true;	// TODO remove this and let database handle this
		tProject.id = ++this.count; // TODO remove this and let database handle this

		this.data.push(tProject);	// TODO replace with an actual post
	}

	/**
	 * changes the running attribute which is used to clarify which type of projects to show in the home view.
	 * @param running
	 */
  	changeRunning(running: string){
  		this.runningParameter.next(running);
	}

	/**
	 * Selects the sub task, which is identified by the given number and than more detailed information is shown on the project view.
	 * @param idOfSubTask
	 */
	selectSubTaskToShow(idOfSubTask:number){
		this.subTaskToShow.next(idOfSubTask);
		console.log("new subtask selected"+idOfSubTask);
	}
}
