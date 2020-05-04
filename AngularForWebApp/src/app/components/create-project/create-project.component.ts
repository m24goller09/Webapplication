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

	count:number=0;

	constructor(private dataService: ServerDataService,private dialogRef:MatDialogRef<CreateProjectComponent>) { }

  	ngOnInit(): void {
	}

	submit(){
		let tempName:string = this.nameInput.nativeElement.value;
		let tempDescription:string = this.descInput.nativeElement.value;
		let tempCreator = "me" + ++this.count;
		this.dataService.addProject(tempName,tempCreator,tempDescription);
		this.onClose();

	}

	onClose(){
		this.dialogRef.close()
	}

}
