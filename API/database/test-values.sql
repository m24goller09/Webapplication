insert into User (username, name) values
('ew', 'Emma Woodhouse'),
('eb', 'Elizabeth Bennet');


begin transaction;
	insert into Project (projectID, name, description, manager) values
	('1', 'test', 'test project', 'ew');

	insert into ProjectAssignment (username, projectID) values
	('eb', 1),
	('ew', 1);
commit transaction;

insert into Subtask (subtaskID, projectID, name, description, state, creator, assigned) values
(1, 1, 'test subtask', 'test subtask description', 'running','ew', null);
