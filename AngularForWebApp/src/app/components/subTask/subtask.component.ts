import { Component, OnInit, Input } from '@angular/core';
import {SubTask} from '../../models/SubTask';
import {StateOfTask} from '../../models/StateOfTask';
import {ServerDataService} from '../../services/server-data.service';

@Component({
  selector: 'app-subTask',
  templateUrl: './subTask.component.html',
  styleUrls: ['./subtask.component.scss']
})

export class SubTaskComponent implements OnInit {
	@Input() subTask: SubTask;
	state: string = "task-";
	constructor(private dataService:ServerDataService) {}
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
		this.dataService.selectSubTaskToShow(this.subTask.id);
		console.log("jap"+this.subTask.id);
	}
}
