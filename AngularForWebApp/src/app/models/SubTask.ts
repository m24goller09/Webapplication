import {StateOfTask} from './StateOfTask';

export class SubTask {
	subtaskId:number;
	name:string;
	creator:string;
	description:string;
	assigned:string;
	state:StateOfTask;

	/**
	 * Creates an sub task object.
	 * @param id			of sub task
	 * @param name			of sub task
	 * @param creator		of sub task
	 * @param description	of sub task
	 * @param state			of sub task
	 */
	constructor(id:number, name:string, creator:string, description:string, state:string) {
		this.subtaskId = id;
		this.name = name;
		this.creator = creator;
		this.description = description;
		this.assigned = creator;
		this.state = SubTask.parseState(state);
	}

	/**
	 * Parses the given string to an StateOfTask.
	 * Allowed are: running, Running, backlog, Backlog, finished or Finished.
	 * @param state which should be parsed
	 * @throws ExceptionInformation if the state couldn't be parsed to: running, backlog or finished
	 */
	static parseState(state:string) {
		if (state === "running" || state === "Running"){
			return StateOfTask.Running;
		} else {
			if (state === "backlog" || state === "Backlog"){
				return StateOfTask.Backlog;
			} else {
				if (state === "finished" || state === "Finished"){
					return StateOfTask.Finished;
				} else {
					throw new DOMException("Wrong type of state, cannot be converted to StateOfTask. Given state: "+ state +
						"\nAllowed states are: backlog, running or finished.");
				}
			}
		}
	}

	/**
	 * Reduces the state of the sub task.
	 * @return true, if the state was reduced
	 */
	reduceState(): boolean {
		switch (this.state) {
			case StateOfTask.Backlog:
				return false;
			case StateOfTask.Running:
				this.state = StateOfTask.Backlog;
				return true;
			case StateOfTask.Finished:
				this.state = StateOfTask.Running;
				return true;
		}
	}

	/**
	 * Increases the state of the sub task.
	 * @return true, if the state was increased
	 */
	increaseState(): boolean {
		switch (this.state) {
			case StateOfTask.Backlog:
				this.state = StateOfTask.Running
				return true;
			case StateOfTask.Running:
				this.state = StateOfTask.Finished;
				return true;
			case StateOfTask.Finished:
				return false;
		}
	}
}
