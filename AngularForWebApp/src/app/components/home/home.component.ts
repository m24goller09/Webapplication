import { Component, OnInit } from '@angular/core';
import {Todo} from '../../models/Todo';
import {ServerDataService} from '../../services/server-data.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	data:Todo[];
	constructor(private dataService:ServerDataService) {

	}
	ngOnInit(): void {
		this.dataService.getData();//.subscibe(returnValue => {
		// this.data = returnValue;
		// );
	}
}
