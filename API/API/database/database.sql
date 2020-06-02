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
	creator text,
	assigned text,
	foreign key (creator, "projectID") references "ProjectAssignment" (username, "projectID"),
	foreign key (assigned, "projectID") references "ProjectAssignment" (username, "projectID")
);

/* create trigger to emulate 'on delete set null' for the foreign keys in "Subtask", but without setting projectID to null */
create or replace function subtask_creator_fk_setnull_func()
returns trigger as
$$
begin
	update public."Subtask" subt set subt.creator = null where creator = old.username and "projectID" = old."projectID";
	return old;
end;
$$ language plpgsql;

create trigger subtask_creator_fk_setnull before delete on public."ProjectAssignment"
for each row execute procedure subtask_creator_fk_setnull_func();


create or replace function subtask_assigned_fk_setnull_func()
returns trigger as
$$
begin
	update public."Subtask" subt set subt.assigned = null where assigned = old.username and "projectID" = old."projectID";
	return old;
end;
$$ language plpgsql;

create trigger subtask_assigned_fk_setnull before delete on public."ProjectAssignment"
for each row execute procedure subtask_assigned_fk_setnull_func();
