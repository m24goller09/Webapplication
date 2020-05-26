import { Component, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../core/authentication/auth.service';
import { ServerDataService } from '../../services/server-data.service';
import { NgForm } from '@angular/forms';

export interface ConfirmData {
	projectId: number;
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
			console.log("confirm leave project",data.projectId);
			this.dialogTitle = 'Cornfirm Leaving';
			this.dialogMessage = "Do you really want to leave this project?";
			this.buttonMessage ="Leave";
		}
		else if (data.call == "delete"){
			console.log("confirm deleting project",data.projectId);
			this.dialogTitle = "Confirm Deleting";
			this.dialogMessage = "Do you really want to delete this project?";
			this.buttonMessage ="Delete";
		}
	 }

	 /**
	  * leavs/deletes a project
	  */
	onSubmit() {
		if(this.data.call=="leave"){
			this.dataService.leaveProject(this.data.projectId);
			console.log("left project Nr.: " + this.data.projectId);
			window.location.href = "/home/def";
		}
		else if(this.data.call =="delete"){
			this.dataService.deleteProject(this.data.projectId);
			console.log("deleted project Nr.: " + this.data.projectId);
			window.location.href = "home/def"
		}
  	}

  	cancel(){
	  	this.dialog.close(null);
	  }

	onClose() {
		this.dialog.close();
	}
}
