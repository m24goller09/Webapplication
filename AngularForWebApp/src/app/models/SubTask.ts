import {StateOfTask} from './StateOfTask';

export class SubTask {
	id:number;
	name:string;
	creator:string;
	description:string;
	state:StateOfTask;

	/**
	 * Creates an sub task object.
	 * @param id			of sub task
	 * @param name			of sub task
	 * @param creator		of sub task	("manager")
	 * @param description	of sub task
	 * @param state			of sub task	(as string)
	 */
	constructor(id:number, name:string, creator:string, description:string, state:string) {
		this.id = id;
		this.name = name;
		this.creator = creator;
		this.description = description;
		console.log(state);
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
					throw new DOMException("Wrong type of state, cannot be converted to StateOfTask. Given state: "+ state+
						"\nAllowed states are: backlog, running or finished.");
				}
			}
		}
	}
}
