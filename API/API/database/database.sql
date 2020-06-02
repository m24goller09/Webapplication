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
	/* deferrable because an immediate foreign key would cause the triggers to fail if the project is deleted, see below */
	"projectID" integer not null references "Project" ("projectID") on delete cascade deferrable initially deferred,
	state text not null default 'running' references "SubtaskState" (state),
	creator text,
	assigned text,
	foreign key (creator, "projectID") references "ProjectAssignment" (username, "projectID"),
	foreign key (assigned, "projectID") references "ProjectAssignment" (username, "projectID")
);

/* These triggers emulate 'on delete set null' for the foreign keys in "Subtask", but without setting projectID to null because it
might still be valid (for example, if a user leaves the project, he should be removed from all subtasks, but the subtasks are still part of the project.
In addition to these triggers, the foreign key to Project.projectID needs to be 'deferrable initially deferred', because otherwise deleting
a project deletes all rows in ProjectAssignment that reference it, which causes the triggers to update the Subtasks of the Project (which have not
yet been deleted). Updating the row runs all checks related to it, and the foreign key to Project.projectID fails because the project no longer exists. */
create or replace function subtask_creator_fk_setnull_func()
returns trigger as
$$
begin
	update public."Subtask" set creator = null where creator = old.username and "projectID" = old."projectID";
	return old;
end;
$$ language plpgsql;

drop trigger subtask_creator_fk_setnull on public."ProjectAssignment";

create trigger subtask_creator_fk_setnull before delete on public."ProjectAssignment"
for each row execute procedure subtask_creator_fk_setnull_func();


create or replace function subtask_assigned_fk_setnull_func()
returns trigger as
$$
begin
	update public."Subtask" set assigned = null where assigned = old.username and "projectID" = old."projectID";
	return old;
end;
$$ language plpgsql;

drop trigger subtask_assigned_fk_setnull on public."ProjectAssignment";

create trigger subtask_assigned_fk_setnull before delete on public."ProjectAssignment"
for each row execute procedure subtask_assigned_fk_setnull_func();
