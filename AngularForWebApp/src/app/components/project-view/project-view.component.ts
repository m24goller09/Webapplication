import {Component, OnInit} from '@angular/core';
import {ServerDataService} from '../../services/server-data.service';
import {SubTask} from '../../models/SubTask';
import {StateOfTask} from '../../models/StateOfTask';
import {Project} from '../../models/Project';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../core/authentication/auth.service';
import {MatDialog} from '@angular/material/dialog';
import {CreateSubTaskComponent} from '../create-sub-task/create-sub-task.component';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.scss']
})
export class ProjectViewComponent implements OnInit {
	/**
	 * The current displayed project.
	 */
	project:Project = null;
	/**
	 * Object of arrays which hold all sub tasks.
	 */
	tasks = {
		"Backlog": [],
		"Running": [],
		"Finished": []
	};
	/**
	 * The task about which more information is displayed.
	 */
	subTaskToShow: SubTask;
	/**
	 * Initial sub task, show this if this project has no sub tasks.
 	 */
	public defaultSubTask: SubTask = new SubTask(-1,"No sub task to display.", "",
		"Please create an sub task to show more information", StateOfTask.Running,);

	editor:boolean = false;
	owner:boolean = true;
	admin:boolean = false;
	member:boolean = false;
	projectMember:string[] = [];

  	constructor(private route: ActivatedRoute, private dataService: ServerDataService,
				private authService: AuthService, private matDialog: MatDialog) {}

  	ngOnInit(): void {
		//provide admin with special rights
		if(this.authService.userName == "admin@promas.de")
		{
			this.admin = true;
		}
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
					// this.projectState = this.project.state;
					// load in sub tasks for opened project
					this.dataService.getSubTasks(this.project.id).subscribe(value => {
						if (value != undefined){
							this.divideSubTasks(ServerDataService.parseSubTasks(value));
						}
					})

					this.dataService.getUserOfProject(this.project.id).subscribe(res => {
						if (res != undefined) {
							users = res;
							users.forEach(function(user) {
								updateMember(user['username']);
								if (user['username'] == username) {
									isMember(true);
								}
							});
						}
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

	/**
	 * Select the given task to show more information.
	 * @param task
	 */
	selectSubTask(task: SubTask){
  		this.subTaskToShow = task;
	}

	/**
	 * Adds sub task to arrays and selects this task.
	 * @param task The task to add and select.
	 */
	addNewSubTask(task: SubTask){
		this.insertIntoArray(task);
  		this.selectSubTask(task);
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

	/**
	 * keep insert order on iterating
 	 */
	order(a, b) {
		if (a.key === 'Backlog' || a.key === 'Running' && b.key === 'Finished'){
			return -1;
		}
		if (b.key === 'Backlog' || a.key === 'Finished' && b.key === 'Running'){
			return 1;
		}
		return 0;
	}

	/**
	 * button-click-event\
	 * if current user is creator of opened project the projectView switches between the editor and spectator mode
	 * if user is not creator mode doesnt switch
	 */
	toggleView(){
		if(this.authService.userName == this.project.creator){
			this.editor = this.editor == false;
		} else {
			throw new DOMException('User is not allowed to access the editor section!');
		}
	}

	/**
	 * submiting changes made in editor-view to both, external Database and localy loaded project.\
	 * after submiting the changes the user leaves editor-mode
	 */
	submitChanges(){
		let title = document.getElementById('titleInput') as HTMLInputElement;
		let desc = document.getElementById('descriptionInput') as HTMLInputElement;
		let st = document.getElementById('stateSelect') as HTMLSelectElement;
		let stateString = st.value;
		this.dataService.editProject(this.project.id,title.value,desc.value,stateString).subscribe(value => {
			this.project.description = desc.value;
			this.project.name = title.value;
			this.project.state = Project.parseState(stateString);
		});
		this.toggleView();
	}

	/**
	 * joining currently opened project
	 */
	joinProject(){
		this.dataService.joinProject(this.project.id);
		this.member = true;
		this.projectMember.push(this.authService.userName);
	}

	/**
	 * leaving current project if not creator
	 */
	leaveProject(){
		this.matDialog.open(ConfirmDialogComponent, {
			width: '20%',
			data: { projectId: this.project.id, call: "leave"}
		}).afterClosed().subscribe(res => {
			console.log(res);
		});
	}

	/**
	 * deleting current project\
	 * only possible if owner
	 */
	deleteProject(){
		this.matDialog.open(ConfirmDialogComponent, {
			width: '20%',
			data: { projectId: this.project.id, call: "delete" }
		}).afterClosed().subscribe(res => {
			console.log(res);
		});
	}

	/**
	 * Inserts the given sub task into its new array and removes it from the other one.
	 * @param changedTask The task which is
	 */
	insertAndRemove(changedTask: SubTask): boolean {
		for (let category in this.tasks){
			for (let i in this.tasks[category]){
				if (changedTask.subtaskId === this.tasks[category][i].subtaskId){
					this.tasks[category].splice(i,1);
					this.insertIntoArray(changedTask);
					return;
				}
			}
		}
		throw new Error("The sub task was not found and couldn't be inserted nor removed from the array of sub tasks.\nproject-view.component.ts - insertAndRemove()");
	}

	/**
	 * Opens a dialog which can be used to edit the given sub task. On completion the sub task is edited on the database and selected.
	 * @param subTask The sub task which can be edited.
	 */
	editSubTask(subTask: SubTask) {
		console.log(this.project.id);
		this.matDialog.open(CreateSubTaskComponent, {
			width: '40vw',
			data: {projectId: this.project.id, subTask: subTask}
		}).afterClosed().subscribe((task: SubTask) => {
			if (task !== undefined && task !== null){
				this.insertAndRemove(task)
				this.subTaskToShow = task;
			}
		});
	}

	/**
	 * the owner of the project can exclude a current Project Member
	 * @param member contains the username that needs to be kicked
	 */
	kick(member:string)
	{
		if(member != this.project.creator )
		{
			this.matDialog.open(ConfirmDialogComponent, {
				width: '20%',
				data: { user:member, projectId: this.project.id, call: "kick" }
			}).afterClosed().subscribe(res => {
				this.projectMember = this.projectMember.filter(f => f !== member)
				console.log(this.projectMember);
			});
		}
	}

	/**
	 * Removes the given sub task from the tasks array.
	 * @param subTask task to delete
	 */
	public removeSubTask(subTask: SubTask) {
		const state: string = subTask.state.charAt(0).toUpperCase() + subTask.state.slice(1);
		for (let i in this.tasks[state]){
			if (subTask.subtaskId === this.tasks[state][i].subtaskId){
				this.tasks[state].splice(i,1);
				return;
			}
		}
	}

	/**
	 * Deletes the sub task.
	 * @param subTask the id of the sub task, which should be deleted
	 */
	deleteSubTask(subTask: SubTask) {
		this.matDialog.open(ConfirmDialogComponent, {
			width: '20%',
			data: { subTaskId: subTask.subtaskId, call: "deleteSubTask" }
		}).afterClosed().subscribe(()=>{
				this.removeSubTask(subTask);
				this.selectFirstSubTask();
		});
	}

	private selectFirstSubTask() {
		for (let category in this.tasks){
			for (let task of this.tasks[category]){
				if (task !== null){
					this.selectSubTask(task);
					return;
				}
			}
		}
		this.selectSubTask(this.defaultSubTask);
	}
}
