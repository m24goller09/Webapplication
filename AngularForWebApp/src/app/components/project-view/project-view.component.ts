import {Component, OnInit} from '@angular/core';
import {ServerDataService} from '../../services/server-data.service';
import {SubTask} from '../../models/SubTask';
import {StateOfTask} from '../../models/StateOfTask';
import {Project} from '../../models/Project';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.scss']
})
export class ProjectViewComponent implements OnInit {
	// TODO add loading icon
	project:Project = null;

	backlogTasks: SubTask[];
	runningTasks: SubTask[];
	finishedTasks: SubTask[];
	tasks = new Map();
	subTaskToShow: SubTask;
	// initial sub task, show this if this project has no sub tasks
	private defaultSubTask: SubTask = {
		id: -1,
		name:"Sub task information",
		creator:"def",
		description:"No information to show.",
		state:StateOfTask.Backlog
	};

  	constructor(private route: ActivatedRoute, private dataService: ServerDataService) { }

  	ngOnInit(): void {
		this.route.paramMap.subscribe(params =>{
			try {
				let id:number = Number.parseInt(params.get("id"));
				this.dataService.getProject(id).subscribe(value => {
					this.project = ServerDataService.parseProject(value);

					// load in sub tasks for opened project
					this.dataService.getSubTasks(this.project.id).subscribe(value => {
						console.log(value);
						this.divideSubTasks(ServerDataService.parseSubTasks(value));
					});
				});
			}catch (e) {
				throw e;
			}
		});
	}

	receiveSubTaskSelected($event){
  		this.subTaskToShow = $event;
	}

	/**
	 * Divides all sub tasks into three arrays by their states. (backlog, running and finished)
	 * And selects first task to show in the info tab.
	 * @param subTasks which are being divided into the three arrays
	 */
	private divideSubTasks(subTasks: SubTask[]) {
		 this.backlogTasks = [];
		 this.runningTasks = [];
		 this.finishedTasks = [];

		for (let subTask of subTasks){
			// put all sub tasks in map to quickly show info
			if (this.tasks.size === 0){
				// select first task for info tab
				this.subTaskToShow = subTask;
			}
			this.tasks.set(subTask.id,subTask);
			switch (subTask.state) {
				case StateOfTask.Backlog:
					this.backlogTasks.push(subTask);
					break;
				case StateOfTask.Running:
					this.runningTasks.push(subTask);
					break;
				case StateOfTask.Finished:
					this.finishedTasks.push(subTask);
					break;
				default:
					console.error('Wrong type of sub task!');
			}
		}
	}
}
