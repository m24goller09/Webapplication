import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {CreateProjectComponent} from '../create-project/create-project.component';

@Component({
  selector: 'app-add-button',
  templateUrl: './add-button.component.html',
  styleUrls: ['./add-button.component.css']
})
export class AddButtonComponent implements OnInit {
	constructor(private matDialog: MatDialog) { }

	ngOnInit(): void {}

	openDialog():void{
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.width="50%";
		this.matDialog.open(CreateProjectComponent,dialogConfig);
	}
}
