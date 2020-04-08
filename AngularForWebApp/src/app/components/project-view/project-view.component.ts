import { Component, OnInit } from '@angular/core';
import {ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.css']
})
export class ProjectViewComponent implements OnInit {

	projectID:number;
	projectName: string;
	projectDesc: string;
	projectCreator: string;
	projectStatus: string;
  	constructor(private route: ActivatedRoute) { }

  	ngOnInit(): void {
		this.route.paramMap.subscribe(params =>{
			this.projectID = +params.get('id')
			this.projectName = params.get('name')
			this.projectDesc = params.get('desc')
			this.projectCreator = params.get('creator')
			this.projectStatus = params.get('status')

		})

  	}

}
