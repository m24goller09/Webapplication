import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Project} from '../models/Project';

@Injectable({
  providedIn: 'root'
})
export class ServerDataService {
	dataBaseURL:string =  'hereNeedsToBeTheDBURL';
	data:Project[];

	private runningParameter = new BehaviorSubject<string>("def");
	currentRunning = this.runningParameter.asObservable();
  	constructor(private http:HttpClient) {
  }

  getData(){
  	// getData():Observable<ClassName[]>{
  	return this.data;
  	//TODO: get request for getting data from the db
  	//return this.http.get<ClassName[]>(dataBaseURL);	<- Class needs to be created and imported here
  }

  changeRunning(running: string){
  		this.runningParameter.next(running);
  }
}
