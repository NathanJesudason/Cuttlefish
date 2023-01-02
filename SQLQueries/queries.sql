-- Queries containing ":" denote that the variable will be supplied from the backend

-- Get all data from a table
SELECT idsprint, startDate, endDate, Goal, pointsCompleted, pointsAttempted, idproject, IsBacklog, Name from sprint;
SELECT ProjectID, Name, Color, Description, DueDate, Funds from project;
SELECT team_memberID, Username, email, Role, Avatar_file from team_member;
    -- Get all task info and comments for a task
    SELECT idtask, Type, idParentTask, dueDate, assigneeTMID, creatorTMID, sprintID, cost, projectID, Description, Priority, storyPoints, Status, completionApproval, EpicLabel, startDate, endDate, Name from task where taskID = :curTaskID;
    SELECT idcomment, Author, Date, Content from comment where task = :curTaskID ORDER BY date desc;

-- Insert item into table
    -- Insert task will also need to insert task dependency if it is a subtask or is being set to depend on another task
    INSERT INTO task (Type, idParentTask, dueDate, assigneeTMID, creatorTMID, sprintID, cost, projectID, Description, Priority, storyPoints, Status, completionApproval, EpicLabel, startDate, endDate, Name) values (:curType, :curidParentTask, :curdueDate, :curassigneeTMID, :curcreatorTMID, :cursprintID, :curcost, :curprojectID, :curDescription, :curPriority, :curstoryPoints, :curStatus, :curcompletionApproval, :curEpicLabel, :curstartDate, :curendDate, :curName);
    INSERT INTO task_dependency (independent_task, dependent_task) values (:curIndepent_task, :curDependent_task);
INSERT INTO comment (Author, Date, Task, Project, Content) values (:curAuthor, :curDate, :curTaskID, :curProjectID, :curContent);
INSERT INTO Project (Name, Color, Description, DueDate, Funds) values (:curName, :curColor, :curDescription, :curDueDate, :curFunds);
INSERT INTO team_member (Username, Password, email, Role, Avatar_file) values (:curUsername, :curPassword, :curEmail, :curRole, :curAvatar);
INSERT INTO label_to_task (label, task) values (:curLabel, :curTask);
INSERT INTO label (Label, color) values (:curLabel, :curColor);
INSERT INTO team_member_to_project (team_member, project) values (:curTMID, :curProjectID);

-- Find specific item from a table
    -- Get all tasks assigned to a person
    SELECT idtask, Type, idParentTask, dueDate, assigneeTMID, creatorTMID, sprintID, cost, projectID, Description, Priority, storyPoints, Status, completionApproval, EpicLabel, startDate, endDate, Name from task where assigneeID = :curUsername;
    -- Get all tasks based on status/label
    SELECT idtask, Type, idParentTask, dueDate, assigneeTMID, creatorTMID, sprintID, cost, projectID, Description, Priority, storyPoints, Status, completionApproval, EpicLabel, startDate, endDate, Name from task where label = :curLabel;
    -- Get all tasks in a sprint
    SELECT idtask, Type, idParentTask, dueDate, assigneeTMID, creatorTMID, sprintID, cost, projectID, Description, Priority, storyPoints, Status, completionApproval, EpicLabel, startDate, endDate, Name from task where sprintID = :curSprintID;
    -- Get all team members on a project
    SELECT team_memberID, Username, email, Role, Avatar_file from team_member WHERE team_memberID IN (SELECT team_member FROM team_member_to_project WHERE team_member_to_project.project = :curProjectID);
-- Update item in a table
UPDATE task SET Name = :curName, Type = :curType, idParentTask = :curParentID, dueDate = :curDueDate, assigneeTMID = :curAssignID, sprintID = :curSprintID, cost = :curCostID, projectID = :curProjectID, Description = :curDescription, Priority = :curPriority, storyPoints = :curPoints, Status = :curStatus, completionApproval := curApproval, EpicLabel := curEpicLabel, startDate := curStartDate, endDate := curEndDate, WHERE taskID = curTaskID;
UPDATE team_member SET Username = :curUsername, Password = :curPassword, email = :curEmail, Role = :curRole, Avatar_file = :curAvatar WHERE team_memberID = :curTMID;
UPDATE comment SET Content = :curContent WHERE idcomment = :curCommentID;
UPDATE task_dependency SET independent_task = :curIndepent_task, dependent_task = :curDependent_task WHERE independent_task = :old_independent_task AND dependent_task = :old_dependent_task;

-- Delete item from a table
DELETE FROM task WHERE idtask = :curIDtask;
DELETE FROM team_member where team_memberID where :curTMID;
DELETE FROM comment where idcomment = :curCommentID;
DELETE FROM project WHERE idproject = :curProjectID;
DELETE FROM task_dependency WHERE independent_task = :curIndepent_task AND dependent_task = :curDependent_task;
DELETE FROM label_to_task WHERE label = :curlabel AND task = :curTask;
DELETE FROM team_member_to_project WHERE team_member = :curTMID AND project = :curProjectID;
DELETE FROM label where labelID = :curLabelID;