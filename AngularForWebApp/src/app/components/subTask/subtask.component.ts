import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {SubTask} from '../../models/SubTask';
import {StateOfTask} from '../../models/StateOfTask';
import {ProjectViewComponent} from '../project-view/project-view.component';

@Component({
  selector: 'app-subTask',
  templateUrl: './subtask.component.html',
  styleUrls: ['./subtask.component.scss']
})

export class SubTaskComponent implements OnInit {
	@Input() subTask: SubTask;
	@Output() selectEvent = new EventEmitter<SubTask>();
	state: string = "task-";
	constructor(private projectView:ProjectViewComponent) {}
	ngOnInit(): void {
		switch (this.subTask.state) {
			case StateOfTask.Backlog:
				this.state += "backlog";
				break;
			case StateOfTask.Running:
				this.state += "running";
				break;
			case StateOfTask.Finished:
				this.state += "finished";
				break;
		}
	}

	selectThisSubTask(){
		this.selectEvent.emit(this.subTask);
	}
}
