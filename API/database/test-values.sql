insert into User (username, firstname, lastname) values
('ew', 'Emma', 'Woodhouse'),
('eb', 'Elizabeth', 'Bennet'),
('cc', 'Charlotte', 'Collins'),
('mc', 'Mr.', 'Collins'),
('lcdb', 'Catherine', 'de Bourgh');


begin transaction;
insert into Project (projectID, name, description, manager) values
('0', 'Rosings', 'Dine at Rosings', 'lcdb');

insert into ProjectAssignment (username, projectID) values
('eb', 0),
('cc', 0),
('mc', 0),
('lcdb', 0);
commit transaction;

insert into Task (taskID, projectID, name, description) values
(0, 0, 'Describe', 'Praise Rosings and describe it in great detail'),
(1, 0, 'Ask questions', ''),
(2, 0, 'Interfere', "Interfere in other people's affairs");

insert into TaskAssignment (username, taskID) values
('ew', 2), /* assigned to task but not to project */
('lcdb', 1),
('mc', 0);
