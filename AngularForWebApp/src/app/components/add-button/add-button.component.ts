import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {CreateProjectComponent} from '../create-project/create-project.component';
import {CreateSubTaskComponent} from '../create-sub-task/create-sub-task.component';
import {SubTask} from '../../models/SubTask';

@Component({
  selector: 'app-add-button',
  templateUrl: './add-button.component.html',
  styleUrls: ['./add-button.component.css']
})
export class AddButtonComponent implements OnInit {
	@Input() state: string = null;
	@Input() id: number = null;
	@Output() createdSubTask = new EventEmitter();
	constructor(private matDialog: MatDialog) { }

	ngOnInit(): void {}

	openDialog():void{
		if (this.state !== null){
			this.addSubTaskDialog();
		}else {
			const dialogConfig = new MatDialogConfig();
			dialogConfig.autoFocus = true;
			dialogConfig.width="50%";
			this.matDialog.open(CreateProjectComponent,dialogConfig);
		}
	}

	addSubTaskDialog(): void {
		this.matDialog.open(CreateSubTaskComponent, {
			width: '40vw',
			data: {state: this.state, id: this.id}
		}).afterClosed().subscribe(value => {
			this.createdSubTask.emit(value);
		});
	}
}
