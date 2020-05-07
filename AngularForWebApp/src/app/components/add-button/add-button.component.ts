import { Component, OnInit, Input } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {CreateProjectComponent} from '../create-project/create-project.component';
import {CreateSubTaskComponent} from '../create-sub-task/create-sub-task.component';

@Component({
  selector: 'app-add-button',
  templateUrl: './add-button.component.html',
  styleUrls: ['./add-button.component.css']
})
export class AddButtonComponent implements OnInit {
	@Input() state: string = null;
	@Input() id: number = null;
	constructor(private matDialog: MatDialog) { }

	ngOnInit(): void {}

	openDialog():void{
		if (this.state !== null){
			console.log("State: " + this.state);
			this.Dialog();
		}else {
			const dialogConfig = new MatDialogConfig();
			dialogConfig.autoFocus = true;
			dialogConfig.width="50%";
			this.matDialog.open(CreateProjectComponent,dialogConfig);
		}
	}
	Dialog(): void {
		this.matDialog.open(CreateSubTaskComponent, {
			width: '500px',
			data: {state: this.state, id: this.id}
		});
	}
}
