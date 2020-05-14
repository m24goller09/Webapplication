import {Component, OnInit } from '@angular/core';
import { Title }     from '@angular/platform-browser';

@Component({
		selector: 'app-root',
		templateUrl: './app.component.html',
		styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	projectName = 'PROMAS';
	title:string = this.projectName;

	constructor(private titleService:Title) {
		this.titleService.setTitle(this.title);
	}

	ngOnInit(){}
}
