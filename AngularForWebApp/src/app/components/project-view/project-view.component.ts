import {Component, OnInit} from '@angular/core';
import {ServerDataService} from '../../services/server-data.service';
import {SubTask} from '../../models/SubTask';
import {StateOfTask} from '../../models/StateOfTask';
import {Project} from '../../models/Project';
import {StateOfProject} from '../../models/StateOfProject';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../core/authentication/auth.service';

@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.scss']
})
export class ProjectViewComponent implements OnInit {
	project:Project = null;

	tasks = {
		"Backlog": [],
		"Running": [],
		"Finished": []
	};
	subTaskToShow: SubTask;
	// initial sub task, show this if this project has no sub tasks
	private defaultSubTask: SubTask = new SubTask(-1,"No sub task to display.", "",
		"Please create an sub task to show more information", StateOfTask.Running,);

	editor:boolean = false;
	owner:boolean = true;
	member:boolean = false;
	projectState:string;
	projectMember:string[] = [];

  	constructor(private route: ActivatedRoute, private dataService: ServerDataService,private authService:AuthService) { }

  	ngOnInit(): void {
		this.owner = true;
  		// default sub task is shown in the beginning
  		this.subTaskToShow = this.defaultSubTask;
		this.route.paramMap.subscribe(params =>{
			try {
				let id:number = Number.parseInt(params.get("id"));
				let users:any;
				let username:string = this.authService.userName;
				this.dataService.getProject(id).subscribe(value => {
					this.project = ServerDataService.parseProject(value);
					if(this.project.creator != this.authService.userName){
						this.owner = false;
					}
					this.parseStateNumToString(this.project.state);
					// load in sub tasks for opened project
					this.dataService.getSubTasks(this.project.id).subscribe(value => {
						this.divideSubTasks(ServerDataService.parseSubTasks(value));
					})

					this.dataService.getUserOfProject(this.project.id).subscribe(res => {
						users = res;
						users.forEach(function (user) {
							updateMember(user['username']);
							if(user['username'] == username) {
								isMember(true);
							}
						});
					});

				});
			}catch (e) {
				throw e;
			}
		});
		const isMember = bool => {
			this.member = bool;
		};

		const updateMember = username => {
			this.projectMember.push(username);
		};
	}

	receiveSubTaskSelected($event){
  		this.subTaskToShow = $event;
	}

	newSubTaskCreated(value){
		const newSubTask = ServerDataService.parseSubTask(value);
		this.insertIntoArray(newSubTask);
  		this.subTaskToShow = newSubTask;
	}

	/**
	 * Divides all sub tasks into three arrays by their states. (backlog, running and finished)
	 * And selects first task to show in the info tab.
	 * @param subTasks which are being divided into the three arrays
	 */
	private divideSubTasks(subTasks: SubTask[]) {
		if (subTasks.length <= 0){
			// if there are no sub tasks from this project, display the default task
			this.subTaskToShow = this.defaultSubTask;
			return;
		}
		let first: boolean = true;
		for (let subTask of subTasks){
			if (first){
				// select first task for info tab
				this.subTaskToShow = subTask;
				first = false;
			}
			this.insertIntoArray(subTask);
		}
	}

	/**
	 * Inserts the given sub task into one of three arrays, by the state of the sub task
	 * @param subTask The sub task to insert
	 */
	insertIntoArray(subTask: SubTask){
		switch (subTask.state) {
			case StateOfTask.Backlog:
				this.tasks.Backlog.push(subTask);
				break;
			case StateOfTask.Running:
				this.tasks.Running.push(subTask);
				break;
			case StateOfTask.Finished:
				this.tasks.Finished.push(subTask);
				break;
			default:
				throw new Error('Wrong type of sub task!');
		}
	}

	// keep insert order on iterating
	asIsOrder(a, b) {
		return -1;
	}

	toggleView(){
		if(this.authService.userName == this.project.creator){
			if(this.editor == false){
				this.parseStateNumToString(this.project.state);
				this.editor = true;
			}
			else{
				this.editor = false;
			}
		}
		else{
			throw new DOMException('User is not allowed to access the editor section!');
		}
	}

	submitChanges(){
		let title = document.getElementById('titleInput') as HTMLInputElement;
		let desc = document.getElementById('descriptionInput') as HTMLInputElement;
		let st = document.getElementById('stateSelect') as HTMLSelectElement;
		let stateString = st.value;
		this.dataService.editProject(this.project.id,title.value,desc.value,stateString).subscribe(value => {
			this.project.description = desc.value;
			this.project.name = title.value;
			this.project.state = this.parseStateStringToEnum(stateString);
		});
		this.toggleView();
	}

	joinProject(){
		console.log("joining Project Nr.: " + this.project.id);
		this.dataService.joinProject(this.project.id);
		this.member = true;
	}

	parseStateNumToString(value:number){
		switch (value) {
			case 0: {
				this.projectState = "running";
				break;
			}
			case 1: {
				this.projectState = "paused";
				break;
			}
			case 2: {
				this.projectState = "finished";
				break;
			}
		}
	}

	parseStateStringToEnum(value: string) {
		let state:StateOfProject;
		switch (value) {
			case 'running': {
				state = StateOfProject.Running;
				break;
			}
			case 'paused': {
				state = StateOfProject.Paused;
				break;
			}
			case 'finished': {
				state = StateOfProject.Finished;
				break;
			}
		}
		return state;
	}
}
