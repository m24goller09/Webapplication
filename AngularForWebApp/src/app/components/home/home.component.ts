import { Component, OnInit} from '@angular/core';
import {ServerDataService} from '../../services/server-data.service';
import { Project } from '../../models/Project';
import { ActivatedRoute, ROUTER_INITIALIZER} from '@angular/router';
import { CreateProjectComponent } from '../create-project/create-project.component';
import { MatDialog,MatDialogRef } from '@angular/material/dialog';
import { Route } from '@angular/compiler/src/core';
import { NgForOf } from '@angular/common';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

	currentDialog:MatDialogRef<any> = null;
	projects:Project[];
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


	openDialog():void{
		this.currentDialog = this.matDialog.open(CreateProjectComponent, {
			width: '500px'
		});

		this.currentDialog.afterClosed().subscribe(result=>{
			//alert("Dialog Closed");

		})
	}

	constructor(private matDialog: MatDialog, private dataService: ServerDataService, private route: ActivatedRoute) {

	}


}
