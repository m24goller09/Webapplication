import { Component, OnInit} from '@angular/core';
import {ServerDataService} from '../../services/server-data.service';
import { Project } from '../../models/Project';
import { ActivatedRoute, Router} from '@angular/router';
import { StateOfProject } from '../../models/StateOfProject';
import { finalize } from 'rxjs/operators'
import { AuthService } from '../core/authentication/auth.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

	projects:Project[];
	filter:string = 'def';
	busy: boolean;
	loggedIn: boolean;

	constructor( private dataService: ServerDataService, private route: ActivatedRoute, private router: Router, private authService: AuthService) {}

	changeRunning(running:StateOfProject) {
		this.dataService.changeRunning(running);
		this.authService.authNavStatus$.subscribe(value => {
			this.loggedIn = value;
		})
	}

    ngOnInit(): void {
		this.busy = true;
		// subscribe to the parameter running
		this.route.paramMap.subscribe(params => {
			this.changeRunning(Project.parseState(params.get('filter')));
		});
		// get all projects from the user
		this.dataService.getProjectOfCurrentUser().pipe(finalize(() => {
			this.busy = false;
		})).subscribe(result => {
			this.projects = ServerDataService.parseProjects(result);
		});
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
