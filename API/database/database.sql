create table public.User (
	username text primary key,
	name text not null default ''
);

create table ProjectState (
	state text primary key
);

insert into ProjectState values ('running'), ('finished'), ('paused');


create table Project (
	projectID serial primary key,
	name text not null,
	description text not null default '',
	manager text not null,
	state text not null default 'running' references ProjectState (state)
);

create table ProjectAssignment (
	username text,
	projectID integer,
	
	primary key (username, projectID),
	foreign key (username) references public.User (username)
);

alter table ProjectAssignment add foreign key (projectID) references Project (projectID);
/* Deferrable foreign key due to chicken-and-egg problem */
alter table Project add foreign key (manager, projectID) references ProjectAssignment (username, projectID) deferrable initially deferred;


create table SubtaskState (
	state text primary key
);

insert into SubtaskState values ('running'), ('backlog'), ('finished');

create table Subtask (
	subtaskID serial primary key,
	name text not null,
	description text not null default '',
	projectID integer not null references Project (projectID),
	state text not null default 'running' references SubtaskState (state),
	creator text not null,
	assigned text,
	foreign key (creator, projectID) references ProjectAssignment (username, projectID),
	foreign key (assigned, projectID) references ProjectAssignment (username, projectID)
);
