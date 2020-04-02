import { Component, OnInit } from '@angular/core';
import {ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.css']
})
export class ProjectViewComponent implements OnInit {

	projectID:number;
  	constructor(private route: ActivatedRoute) { }

  	ngOnInit(): void {
		this.route.paramMap.subscribe(params =>{
			this.projectID = +params.get('id')
		})

  	}

}
