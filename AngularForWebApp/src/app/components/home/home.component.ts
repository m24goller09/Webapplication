import { Component, OnInit} from '@angular/core';
import {ServerDataService} from '../../services/server-data.service';
import { Project } from '../../models/Project';
import { ActivatedRoute, ROUTER_INITIALIZER} from '@angular/router';
import { CreateProjectComponent } from '../create-project/create-project.component';
import { MatDialog,MatDialogRef,MatDialogConfig } from '@angular/material/dialog';
import { Route } from '@angular/compiler/src/core';
import { NgForOf } from '@angular/common';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

	projects:Project[];
	filter:string = 'def';

	constructor(private matDialog: MatDialog, private dataService: ServerDataService, private route: ActivatedRoute) {}

	changeRunning(running: string) {
		this.dataService.changeRunning(running);
	}

    ngOnInit(): void {
		// subscribe to the parameter running
		this.route.paramMap.subscribe(params => {
			this.changeRunning(params.get('filter'));
		});
		// get all projects from the data service
		this.dataService.getProjects().subscribe((result)=>{
			this.projects = [];
			for (let i in result){
				const project = result[i];
				// TODO: Get actual running state from db, if API provides that
				this.projects.push(new Project(project.name,project.manager,project.description,true,project.projectID));
			}
		});
	}


	openDialog():void{

		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.width="50%";
		this.matDialog.open(CreateProjectComponent,dialogConfig);
	}
}
