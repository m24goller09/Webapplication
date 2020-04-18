import { Component, OnInit } from '@angular/core';
import {ServerDataService} from '../../services/server-data.service';
import { Project } from '../../models/Project';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	projects:Project[];
	//count:number = 0;
	filter:string = 'def';


	changeRunning(running: string) {
		this.dataService.changeRunning(running);
	}

    ngOnInit(): void {
		this.route.paramMap.subscribe(params => {
			this.changeRunning(params.get('filter'));
		})
		this.projects = this.dataService.getData();
	}

	constructor(private dataService: ServerDataService, private route: ActivatedRoute) {}
}
