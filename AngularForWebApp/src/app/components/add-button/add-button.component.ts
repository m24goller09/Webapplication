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
/**
 * A Component that provides the function to add either a new Project or a new Subtask of a new Project, depending of the given State
 */
export class AddButtonComponent implements OnInit {
	@Input() state: string = null;
	@Input() projectId: number = null;
	@Output() createdSubTask = new EventEmitter();
	constructor(private matDialog: MatDialog) { }

	ngOnInit(): void {}

	/**
	 * function called on Button-Click Event
	 * when there is no given state a dialog is opened wich contains the CreateProjectComponent
	 * else the addSubTaskDialog function is called
	 */
	openDialog():void{
		if (this.state !== null){
			// Open the sub task dialog
			this.addSubTaskDialog();
		}else {
			// Open the project dialog
			const dialogConfig = new MatDialogConfig();
			dialogConfig.autoFocus = true;
			dialogConfig.width="50%";
			this.matDialog.open(CreateProjectComponent,dialogConfig);
		}
	}

	/**
	 * Opens the dialog which is used for adding a new sub task to the project
	 * and injects some settings to the dialog.
	 */
	addSubTaskDialog(): void {
		this.matDialog.open(CreateSubTaskComponent, {
			width: '40vw',
			data: {state: this.state, projectId: this.projectId}
		}).afterClosed().subscribe(value => {
			if (value !== null && value !== undefined){
				this.createdSubTask.emit(value);
			}
		});
	}
}
