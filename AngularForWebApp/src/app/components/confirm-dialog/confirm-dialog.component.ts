import { Component, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../core/authentication/auth.service';
import { ServerDataService } from '../../services/server-data.service';
import { NgForm } from '@angular/forms';

export interface ConfirmData {
	user: string;
	projectId: number;
	subTaskId: number;
	call: string;
}

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent{
	dialogTitle: string;
	dialogMessage:string;
	buttonMessage:string;

	constructor(public dialog: MatDialogRef<ConfirmDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: ConfirmData,
				private auth: AuthService, private dataService: ServerDataService) {
		if (data.call == "leave"){
			this.dialogTitle = 'Confirm Leaving';
			this.dialogMessage = "Do you really want to leave this project?";
			this.buttonMessage ="Leave";
		} else if (data.call == "delete"){
			this.dialogTitle = "Confirm Deleting";
			this.dialogMessage = "Do you really want to delete this project?";
			this.buttonMessage ="Delete";
		} else if (data.call == "kick") {
			this.dialogTitle = "Confirm Kicking";
			this.dialogMessage = "Do you really want to kick '" + data.user + "' from this project?";
			this.buttonMessage = "Kick";
		} else if (data.call == "deleteSubTask"){
			this.dialogTitle = "Confirm Delete";
			this.dialogMessage = "Do you really want to delete this sub task?";
			this.buttonMessage ="Delete";
		}
	 }

	 /**
	  * calls the requiered Service-Function depending on the given call-param
	  */
	onSubmit() {
		if(this.data.call=="leave"){
			this.dataService.leaveProject(this.data.projectId).subscribe(result => {
				window.location.href = "/home/def";
			})
		} else if(this.data.call =="delete"){
			this.dataService.deleteProject(this.data.projectId).subscribe(result => {
				window.location.href = "home/def"
			})
		} else if (this.data.call == "kick") {
			this.dataService.kickFromProject(this.data.projectId,this.data.user).subscribe(result => {
				console.log(result);
			})
		} else if (this.data.call == "deleteSubTask") {
			this.dataService.deleteSubTask(this.data.subTaskId).subscribe(result => {
				console.log(result);
			})
		}
  	}

  	cancel(){
	  	this.dialog.close(null);
	  }

	onClose() {
		this.dialog.close();
	}
}
