import { Component, OnInit } from '@angular/core';
import {ServerDataService} from '../../services/server-data.service';
import {Project} from '../../models/Project';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	projects:Project[];
	count:number = 0;
	pRunning:string= 'def';
    ngOnInit(): void {}
	constructor(private dataService:ServerDataService) {
		this.projects = [
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
}
