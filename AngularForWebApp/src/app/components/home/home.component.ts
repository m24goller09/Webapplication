import { Component, OnInit} from '@angular/core';
import {ServerDataService} from '../../services/server-data.service';
import { Project } from '../../models/Project';
import { ActivatedRoute, ROUTER_INITIALIZER, Router} from '@angular/router';
import { CreateProjectComponent } from '../create-project/create-project.component';
import { MatDialog,MatDialogRef,MatDialogConfig } from '@angular/material/dialog';
import { Route } from '@angular/compiler/src/core';
import { NgForOf } from '@angular/common';
import { StateOfProject } from '../../models/StateOfProject';
import { finalize } from 'rxjs/operators'
import { AuthService } from '../core/authentication/auth.service';
import {log} from 'util';



@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

	projects:Project[];
	filter:string = 'def';
	busy: boolean;
	claims = null;

	constructor(private matDialog: MatDialog, private dataService: ServerDataService, private route: ActivatedRoute, private router: Router, private authService: AuthService) {}

	changeRunning(running:StateOfProject) {
		this.dataService.changeRunning(running);
	}

    ngOnInit(): void {

		this.busy = true;
		// subscribe to the parameter running
		this.route.paramMap.subscribe(params => {
			this.changeRunning(Project.parseState(params.get('filter')));
		});
		// get all projects from the data service
		this.dataService.getProjects().subscribe((result)=>{
			this.projects = ServerDataService.parseProjects(result);
		});


		this.authService.fetchTopSecretData(this.authService.authorizationHeaderValue)
			.pipe(finalize(() => {
				this.busy = false;
			})).subscribe(
				result => {
					this.claims = result;
				});

	}


	openDialog():void{
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.width="50%";
		this.matDialog.open(CreateProjectComponent,dialogConfig);
	}

	onLogin() {
		console.log("Login");
		this.authService.login().then(r =>{
			console.log("home:");
			console.log(r)
		});
	}

	async onRegister() {
		try {
			console.log('Register');
			this.router.navigate(['']);
		}
		catch (er) {
			console.log(er);
		}
	}
}
