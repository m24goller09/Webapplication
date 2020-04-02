import {Component } from '@angular/core';
import { Title }     from '@angular/platform-browser';
@Component({
		selector: 'app-root',
		templateUrl: './app.component.html',
		styleUrls: ['./app.component.css']
})
export class AppComponent {
	projectName = 'PROMAS';
	title:string = 'PROMAS';
		constructor(private titleService:Title) {
			this.titleService.setTitle(this.title);
			this.projectName = 'test';
		}
}
