import {Component } from '@angular/core';
import { Title }     from '@angular/platform-browser';
// TODO: this import needs to be removed as well
import {ServerDataService} from '../services/server-data.service';
@Component({
		selector: 'app-root',
		templateUrl: './app.component.html',
		styleUrls: ['./app.component.css']
})
export class AppComponent {
	projectName = 'PROMAS';
	title:string = this.projectName;

	// TODO: the following is only for demo and should be removed later
	ngOnInit(): void {
		console.log("Init");
		this.dataService.getData().subscribe((result)=>{
			console.log(result["username"]);
			console.log(result["firstname"]);
			console.log(result["lastname"]);
		});
	}

	constructor(private titleService:Title, private dataService:ServerDataService) {
		this.titleService.setTitle(this.title);
	}
}
