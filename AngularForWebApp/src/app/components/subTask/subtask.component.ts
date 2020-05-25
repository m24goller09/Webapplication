import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {SubTask} from '../../models/SubTask';
import {StateOfTask} from '../../models/StateOfTask';
import {ServerDataService} from '../../services/server-data.service';

@Component({
  selector: 'app-subTask',
  templateUrl: './subtask.component.html',
  styleUrls: ['./subtask.component.scss']
})

export class SubTaskComponent implements OnInit {
	@Input() subTask: SubTask;
	@Output() selectEvent = new EventEmitter<SubTask>();
	@Output() changeState = new EventEmitter<SubTask>();
	state: string;
	constructor(private api:ServerDataService) {}
	ngOnInit(): void {
		if (this.subTask != null){
			switch (this.subTask.state) {
				case StateOfTask.Backlog:
					this.state = "backlog";
					break;
				case StateOfTask.Running:
					this.state = "running";
					break;
				case StateOfTask.Finished:
					this.state = "finished";
					break;
			}
		}
	}

	/**
	 * Select this sub task to show additional information.
	 */
	selectThisSubTask(){
		this.selectEvent.emit(this.subTask);
	}

	/**
	 * Reduce the state of this sub task and update on db.
	 */
	leftArrow() {
		if (this.subTask.reduceState()){
			this.api.editSubTask(this.subTask).subscribe(() => {
				this.changeState.emit(this.subTask);
			});
		}
	}

	/**
	 * Increase the state of this sub task and update on db.
	 */
	rightArrow() {
		if (this.subTask.increaseState()){
			this.api.editSubTask(this.subTask).subscribe(() => {
				this.changeState.emit(this.subTask);
			});
		}
	}
}
