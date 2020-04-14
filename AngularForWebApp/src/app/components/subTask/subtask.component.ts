import { Component, OnInit, Input } from '@angular/core';
import {SubTask} from '../../models/SubTask';
import {StateOfTask} from '../../models/StateOfTask';

@Component({
  selector: 'app-subTask',
  templateUrl: './subTask.component.html',
  styleUrls: ['./subTask.component.css']
})

export class SubTaskComponent implements OnInit {
	@Input() subTask: SubTask;
	state: string = "task-";
	constructor() {

	}
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
}
