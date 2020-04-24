import { Component, OnInit , Input} from '@angular/core';
import {Project} from '../../models/Project';
import {ServerDataService} from '../../services/server-data.service';
import {StateOfProject} from '../../models/StateOfProject';

@Component({
	selector: 'app-project',
	templateUrl: './project.component.html',
	styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
	@Input() project: Project;
	@Input() state: StateOfProject;
	constructor(private dataService:ServerDataService) { }

	ngOnInit(): void {
		this.dataService.stateOfProjectObservable.subscribe(currentRunning => this.state = currentRunning);
	}
}
