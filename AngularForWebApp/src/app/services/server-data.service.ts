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
	dataBaseURL:string =  'hereNeedsToBeTheDBURL';
	data: Project[];
	subTasksDummy:SubTask[];
	count: number = 0;

	private runningParameter = new BehaviorSubject<string>("def");
	currentRunning = this.runningParameter.asObservable();
  	constructor(private http:HttpClient) {
  		this.subTasksDummy = [
  			{
  				id:1,
				name: 'sub task backlog',
				creator: 'me',
				description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore\n' +
					'\t\t\tmagna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd\n' +
					'\t\t\tgubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing\n' +
					'\t\t\telitr',
				state: StateOfTask.Backlog
			},
			{
				id:2,
				name: 'sub task running',
				creator: 'nice',
				description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore\n' +
					'\t\t\tmagna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd\n' +
					'\t\t\tgubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing\n' +
					'\t\t\telitr',
				state: StateOfTask.Running
			},
			{
				id:3,
				name: 'sub task finished',
				creator: 'not me',
				description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore\n' +
					'\t\t\tmagna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd\n' +
					'\t\t\tgubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing\n' +
					'\t\t\telitr',
				state: StateOfTask.Finished
			},
			{
				id:4,
				name: 'sub task backlog 2',
				creator: 'nice',
				description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore\n' +
					'\t\t\tmagna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd\n' +
					'\t\t\tgubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing\n' +
					'\t\t\telitr',
				state: StateOfTask.Backlog
			},
			{
				id:5,
				name: 'sub task running',
				creator: 'nice',
				description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore\n' +
					'\t\t\tmagna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd\n' +
					'\t\t\tgubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing\n' +
					'\t\t\telitr',
				state: StateOfTask.Running
			},
			{
				id:6,
				name: 'sub task running',
				creator: 'nice',
				description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore\n' +
					'\t\t\tmagna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd\n' +
					'\t\t\tgubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing\n' +
					'\t\t\telitr',
				state: StateOfTask.Finished
			},
			{
				id:7,
				name: 'sub task running',
				creator: 'nice',
				description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore\n' +
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



	getData(){
	/*getData():Observable<ClassName[]>{
	return this.data;
	TODO: get request for getting data from the db
	return this.http.get<ClassName[]>(dataBaseURL);	<- Class needs to be created and imported here
	*/
		return this.data;
	}

	addData(pName:string,pCreator:string,pDesc:string){

		let tProject:Project;
		tProject = new Project();

		tProject.name = pName;
		tProject.creator = pCreator;
		tProject.running = true;
		tProject.description = pDesc;
		tProject.id = ++this.count;

		this.data.push(tProject);

	}

  getSubtasks(id:number){
  		//TODO: get request for getting subtasks for id of task
  		// getSubtasks():Observable<SubTask[]>{
	  //return this.http.get<SubTask[]>(dataBaseURL);
	  return this.subTasksDummy;
  }

  changeRunning(running: string){
  		this.runningParameter.next(running);
  	}
}
