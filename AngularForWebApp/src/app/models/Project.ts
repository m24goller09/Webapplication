import {StateOfProject} from './StateOfProject';

export class Project {
	name:string;
	creator:string;
	description:string;
	state:StateOfProject;
	id:number;

	constructor(name:string, creator:string, description:string, state:string, id:number) {
		this.name = name;
		this.creator = creator;
		this.description = description;
		this.id = id;
		this.state = Project.parseState(state);
	}

	/**
	 * Parses the given string to an StateOfProject.
	 * Allowed are: running, Running, paused, Paused, finished or Finished.
	 * @param state which should be parsed
	 * @throws ExceptionInformation if the state couldn't be parsed to: running, paused or finished
	 */
	static parseState(state:string) {
		if (state === "running" || state === "Running"){
			return StateOfProject.Running;
		} else {
			if (state === "paused" || state === "Paused"){
				return StateOfProject.Paused;
			} else {
				if (state === "finished" || state === "Finished"){
					return StateOfProject.Finished;
				} else {
					if (state === "def"){
						return null;
					}
					throw new DOMException("Wrong type of running, cannot be converted to state. Given state: "+ state+
						"\nAllowed states are: running, paused or finished.");
				}
			}
		}
	}
}
