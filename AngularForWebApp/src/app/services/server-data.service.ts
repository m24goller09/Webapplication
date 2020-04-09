import {Inject, Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Project} from '../models/Project';

@Injectable({
  providedIn: 'root'
})
export class ServerDataService {
	dataBaseURL:string =  'hereNeedsToBeTheDBURL';
	data: Project[];
	count: number = 0;

	private runningParameter = new BehaviorSubject<string>("def");
	currentRunning = this.runningParameter.asObservable();
  	constructor(private http:HttpClient) {
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
		tProject.name = pName;
		tProject.creator = pCreator;
		tProject.running = true;
		tProject.description = pDesc;
		tProject.id = ++this.count;
		this.data.push(tProject);

	}

  	changeRunning(running: string){
  		this.runningParameter.next(running);
  	}
}
