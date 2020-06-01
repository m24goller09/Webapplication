create table public."User" (
	username text primary key,
	name text not null default ''
);

create table public."ProjectState" (
	state text primary key
);

insert into "ProjectState" values ('running'), ('finished'), ('paused');


create table public."Project" (
	"projectID" serial primary key,
	name text not null,
	"description" text not null default '',
	manager text not null,
	state text not null default 'running' references "ProjectState" (state)
);

create table public."ProjectAssignment" (
	username text,
	"projectID" integer,
	
	primary key (username, "projectID"),
	foreign key (username) references public.User (username) on delete cascade
);

alter table "ProjectAssignment" add foreign key ("projectID") references "Project" ("projectID") on delete cascade;
/* Deferrable foreign key due to chicken-and-egg problem */
alter table "Project" add foreign key (manager, "projectID") references "ProjectAssignment" (username, "projectID") on delete cascade deferrable initially deferred;


create table public."SubtaskState" (
	state text primary key
);

insert into "SubtaskState" values ('running'), ('backlog'), ('finished');

create table public."Subtask" (
	"subtaskID" serial primary key,
	name text not null,
	description text not null default '',
	"projectID" integer not null references "Project" ("projectID") on delete cascade,
	state text not null default 'running' references "SubtaskState" (state),
	creator text not null,
	assigned text,
	foreign key (creator, "projectID") references "ProjectAssignment" (username, "projectID") on delete set null,
	foreign key (assigned, "projectID") references "ProjectAssignment" (username, "projectID") on delete set null
);



