import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../core/authentication/auth.service';
import {ServerDataService} from '../../services/server-data.service';
import {SubTask} from '../../models/SubTask';

export interface DialogData {
	id: number;
	state: number;
}

@Component({
	selector: 'dialog-sub-task-dialog',
	templateUrl: './create-sub-task.component.html',
	styleUrls: ['./create-sub-task.component.css']
})
export class CreateSubTaskComponent {
	form: FormGroup;
	state: string;
	title = new FormControl('', [Validators.required, Validators.minLength(3)]);
	description = new FormControl('', [Validators.required, Validators.minLength(10)]);
	constructor(public dialog: MatDialogRef<CreateSubTaskComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData,
				fb: FormBuilder, private auth:AuthService, private dataService:ServerDataService) {
		this.form = fb.group({
			"subtaskId": 0,
			"name": this.title,
			"description": this.description,
			"projectId": data.id,
			"state": [data.state,Validators.required],
			"creator": auth.userName,
			"assigned": auth.userName
		});
	}

	getErrorMessage(control: FormControl) {
		if (control.hasError('required')) {
			return 'You must enter a value';
		}
		return control.hasError('minlength') ? 'You need more characters!':'';
	}

	onSubmit(){
		if (this.form.valid){
			this.dataService.addSubTask(this.form.value).subscribe(value => {
				this.dialog.close(value);
			});
		}
	}
	cancel(){
		this.dialog.close(null);
	}
}
