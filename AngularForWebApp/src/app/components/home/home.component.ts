import { Component, OnInit} from '@angular/core';
import {ServerDataService} from '../../services/server-data.service';
import { Project } from '../../models/Project';
import { ActivatedRoute, ROUTER_INITIALIZER} from '@angular/router';
import { CreateProjectComponent } from '../create-project/create-project.component';
import { MatDialog,MatDialogRef } from '@angular/material/dialog';
import { Route } from '@angular/compiler/src/core';
import { NgForOf } from '@angular/common';
import {StateOfProject} from '../../models/StateOfProject';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

	currentDialog:MatDialogRef<any> = null;
	projects:Project[];
	filter:string = 'def';

	constructor(private matDialog: MatDialog, private dataService: ServerDataService, private route: ActivatedRoute) {}

	changeRunning(running:StateOfProject) {
		this.dataService.changeRunning(running);
	}

    ngOnInit(): void {
		// subscribe to the parameter running
		this.route.paramMap.subscribe(params => {
			this.changeRunning(Project.parseState(params.get('filter')));
		});
		// get all projects from the data service
		this.dataService.getProjects().subscribe((result)=>{
			this.projects = ServerDataService.parseProjects(result);
		});
	}


	openDialog():void{
		this.currentDialog = this.matDialog.open(CreateProjectComponent, {
			width: '500px'
		});

		this.currentDialog.afterClosed().subscribe(result=>{
			// TODO was macht das? kann das weg?
			console.log("subscribe log");
		})
	}
}
