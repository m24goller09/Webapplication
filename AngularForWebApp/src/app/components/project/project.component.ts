import { Component, OnInit , Input} from '@angular/core';
import {Project} from '../../models/Project';
import {ServerDataService} from '../../services/server-data.service';

@Component({
	selector: 'app-project',
	templateUrl: './project.component.html',
	styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
	@Input() project: Project;
	@Input() running: String;
	constructor(private dataService:ServerDataService) { }

	ngOnInit(): void {
		this.dataService.currentRunning.subscribe(currentRunning => this.running = currentRunning);
	}
}
