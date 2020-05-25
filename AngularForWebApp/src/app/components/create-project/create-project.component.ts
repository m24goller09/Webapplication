import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { ServerDataService } from '../../services/server-data.service';
import {MatDialogRef} from '@angular/material/dialog';
import {NgForm} from '@angular/forms';
import { StateOfProject } from '../../models/StateOfProject';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
/**
 * Component that needs to be opened as a Dialog to create a new Project
 */
export class CreateProjectComponent implements OnInit {

	@ViewChild('nameInput') nameInput: ElementRef;
	@ViewChild('descInput') descInput: ElementRef;

	constructor(public dataService: ServerDataService,private dialogRef:MatDialogRef<CreateProjectComponent>) { }

  	ngOnInit(): void {
		  this.resetForm();
	}

	/**
	 * resets the form to its initial settings and resets all temporary placeholders if given form is build
	 * @param form contains a handler to a  NgForm-Element
	 */
	resetForm(form?:NgForm){
		if(form!=null)
		form.resetForm();

		this.dataService.formProject = {
			name:"",
			creator:"",
			description:"",
			id:0,
			state: StateOfProject.Running
		}
	}

	onClose(){
		this.dialogRef.close();
	}

	/**
	 * providing all needed information to the ServerDataService to add a new Project to Database.
	 * After success-response changing current path to projectView of the just created Project
	 * @param form contains a handler to a  NgForm-Element
	 */
	onSubmit(form:NgForm){
		this.dataService.addProject(form.value.ProjectName,form.value.ProjectDescription).subscribe(value => {
			let id = ServerDataService.parseProject(value).id;
			window.location.href ="/projectView/"+id;
		})
	}
}
