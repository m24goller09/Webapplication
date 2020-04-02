import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Project} from '../models/Project';

@Injectable({
  providedIn: 'root'
})
export class ServerDataService {
	dataBaseURL:string =  'hereNeedsToBeTheDBURL';
	data:Project[];

  constructor(private http:HttpClient) {
  }

  getData(){
  	// getData():Observable<ClassName[]>{
  	return this.data;
  	//TODO: get request for getting data from the db
  	//return this.http.get<ClassName[]>(dataBaseURL);	<- Class needs to be created and imported here
  }
}
