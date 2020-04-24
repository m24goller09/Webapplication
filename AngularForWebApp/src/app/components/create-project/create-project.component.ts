import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { ServerDataService } from '../../services/server-data.service';
import { ActivatedRoute,Router } from '@angular/router';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {

	@ViewChild('nameInput') nameInput: ElementRef;
	@ViewChild('descInput') descInput: ElementRef;

	constructor(private dataService: ServerDataService,private dialogRef:MatDialogRef<CreateProjectComponent>) { }

  	ngOnInit(): void {}

	submit(){
		let tempName:string = this.nameInput.nativeElement.value;
		let tempDescription:string = this.descInput.nativeElement.value;
		this.dataService.addProject(tempName,tempDescription).subscribe(value => {
			// TODO test if this works
			open("/projectView/"+ServerDataService.parseProjects(value)[0].projectId);
		});
		this.onClose();
	}

	onClose(){
		this.dialogRef.close()
	}
}
