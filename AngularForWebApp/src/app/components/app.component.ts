import {Component, OnInit } from '@angular/core';
import { Title }     from '@angular/platform-browser';
import { Router,ActivatedRoute} from '@angular/router';

@Component({
		selector: 'app-root',
		templateUrl: './app.component.html',
		styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	projectName = 'PROMAS';
	title:string = this.projectName;

	constructor(private titleService:Title, private router:ActivatedRoute, private route:Router) {
		this.titleService.setTitle(this.title);
	}

	ngOnInit(){
		if (window.location.href == "http://localhost:4200/" || window.location.href == "http://localhost:4200/register"){
			console.log("Register");
		}
		else{
			//console.log("login succesfull");
		}
	}

}
