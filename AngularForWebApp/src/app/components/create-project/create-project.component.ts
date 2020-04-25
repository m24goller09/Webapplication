import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { ServerDataService } from '../../services/server-data.service';
import { ActivatedRoute,Router } from '@angular/router';
import {MatDialogRef} from '@angular/material/dialog';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {

	@ViewChild('nameInput') nameInput: ElementRef;
	@ViewChild('descInput') descInput: ElementRef;

	count:number=0;

	constructor(public dataService: ServerDataService,private dialogRef:MatDialogRef<CreateProjectComponent>) { }

  	ngOnInit(): void {
		  this.resetForm();
	}


	resetForm(form?:NgForm){
		if(form!=null)
		form.resetForm();

		this.dataService.formProject = {
			name:"",
			creator:"",
			description:"",
			id:0,
			running:true,

		}
	}

	onClose(){
		this.dialogRef.close();
	}

	onSubmit(form:NgForm){
		alert(form.value.ProjectName);
		this.dataService.addProject(form.value.ProjectName,form.value.ProjectDescription);
	}

}
