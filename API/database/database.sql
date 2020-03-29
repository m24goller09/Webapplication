create table User (
	username text primary key,
	/* password? */
	firstname text not null default '',
	lastname text not null default '',
	isAdmin boolean not null default 0/* note: there are no booleans in sqlite, maybe add a check constraint */
);

create table Project (
	projectID integer primary key,
	name text not null,
	description text not null default '',
	manager text not null,

	/* Deferrable foreign key due to chicken-and-egg problem */
	foreign key (manager, projectID) references ProjectAssignment (username, projectID) deferrable initially deferred
);

create table ProjectAssignment (
	username text,
	projectID integer,
	
	primary key (username, projectID),
	foreign key (username) references User (username),
	foreign key (projectID) references Project (projectID)
);

create table Task (
	taskID integer primary key,
	name text not null,
	description text not null default '',
	projectID integer not null references Project (projectID)
);

create table TaskAssignment (
	username text,
	taskID integer,
	/* possible bug: it is possible to assign a user to a task but not to the project
	this can be prevented by adding a column for the projectID here and referencing
	ProjectAssignment (username, projectID) instead of User (username) and
	Task (taskID, projectID) instead of Task (taskID)

	I haven't implemented this because the additional column does not carry any information
	and it might be simpler to do this check in the application code */

	primary key (username, taskID),
	foreign key (username) references User (username),
	foreign key (taskID) references Task (taskID)
);
