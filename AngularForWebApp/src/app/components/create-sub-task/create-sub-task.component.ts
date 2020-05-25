import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../core/authentication/auth.service';
import {ServerDataService} from '../../services/server-data.service';
import {SubTask} from '../../models/SubTask';

export interface DialogData {
	projectId: number;
	state: number;
	subTask: SubTask;
}

@Component({
	selector: 'dialog-sub-task-dialog',
	templateUrl: './create-sub-task.component.html',
	styleUrls: ['./create-sub-task.component.css']
})
export class CreateSubTaskComponent {
	dialogTitle: string;
	form: FormGroup;
	state: string;
	title = new FormControl('', [Validators.required, Validators.minLength(3)]);
	description = new FormControl('', [Validators.required, Validators.minLength(10)]);

	constructor(public dialog: MatDialogRef<CreateSubTaskComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData,
				fb: FormBuilder, private auth:AuthService, private dataService:ServerDataService) {
		if (data.subTask == undefined){
			console.log('project id',data.projectId);
			this.dialogTitle = 'Create a sub task';
			this.form = fb.group({
				"subtaskId": 0,
				"name": this.title,
				"description": this.description,
				"projectId": data.projectId,
				"state": [data.state,Validators.required],
				"creator": auth.userName,
				"assigned": auth.userName
			});
		} else {
			this.dialogTitle = 'Edit a sub task';
			this.description.setValue(data.subTask.description);
			this.title.setValue(data.subTask.name)
			console.log('project id',data.projectId);
			this.form = fb.group({
				"subtaskId": data.subTask.subtaskId,
				"name": this.title,
				"description": this.description,
				"projectId": data.projectId,
				"state": [data.subTask.state,Validators.required],
				"creator": data.subTask.creator,
				"assigned": data.subTask.assigned
			});
		}
	}

	getErrorMessage(control: FormControl) {
		if (control.hasError('required')) {
			return 'You must enter a value';
		}
		return control.hasError('minlength') ? 'You need more characters!':'';
	}

	onSubmit(){
		if (this.form.valid){
			if (this.dialogTitle === 'Create a sub task'){
				this.dataService.addSubTask(this.form.value).subscribe(value => {
					this.dialog.close(value);
				});
			}
			if (this.dialogTitle === 'Edit a sub task') {
				this.dataService.editSubTask(this.form.value).subscribe(() => {
					this.dialog.close(this.form.value);
				})
			}
		}
	}
	cancel(){
		this.dialog.close(null);
	}
}
