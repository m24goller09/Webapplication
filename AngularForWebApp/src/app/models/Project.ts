export class Project {
	name:string;
	creator:string;
	description:string;
	running:boolean;
	id:number;

	constructor(name:string, creator:string, description:string, running:boolean, id:number) {
		this.name = name;
		this.creator = creator;
		this.description = description;
		this.running = running;
		this.id = id;
	}
}
