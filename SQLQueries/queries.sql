-- Queries containing ":" denote that the variable will be supplied from the backend

-- Get all data from a table
SELECT idsprint, startDate, endDate, Goal, pointsCompleted, pointsAttempted, idproject, IsBacklog, Name from sprint
SELECT ProjectID, Name, Color, Description, DueDate, Funds from project
SELECT team_memberID, Username, email, Role, Avatar_file from team_member
    -- Get all task info and comments for a task
SELECT idtask, Type, idParentTask, dueDate, assigneeTMID, creatorTMID, sprintID, cost, projectID, Description, Priority, storyPoints, Status, completionApproval, EpicLabel, startDate, endDate, Name from task where taskID = :curTaskID
SELECT idcomment, Author, Date, Content from comment where task = :curTaskID ORDER BY date desc

-- Insert item into table
INSERT INTO task () values ();
INSERT INTO comment () values ();
INSERT INTO Project () values ();
INSERT INTO team_member () values ();

-- Find specific item from a table
    -- Get all tasks assigned to a person
    SELECT idtask, Type, idParentTask, dueDate, assigneeTMID, creatorTMID, sprintID, cost, projectID, Description, Priority, storyPoints, Status, completionApproval, EpicLabel, startDate, endDate, Name from task where assigneeID = :curUsername
    -- Get all tasks based on status/label
    SELECT idtask, Type, idParentTask, dueDate, assigneeTMID, creatorTMID, sprintID, cost, projectID, Description, Priority, storyPoints, Status, completionApproval, EpicLabel, startDate, endDate, Name from task where label = :curLabel
    -- Get all tasks in a sprint
    SELECT idtask, Type, idParentTask, dueDate, assigneeTMID, creatorTMID, sprintID, cost, projectID, Description, Priority, storyPoints, Status, completionApproval, EpicLabel, startDate, endDate, Name from task where sprintID = :curSprintID

-- Update item in a table
UPDATE task SET Name = :curName, Type = :curType, idParentTask = :curParentID, dueDate = :curDueDate, assigneeTMID = :curAssignID, sprintID = :curSprintID, cost = :curCostID, projectID := curProjectID, Description := curDescription, Priority = :curPriority, storyPoints = :curPoints, Status = :curStatus, completionApproval := curApproval, EpicLabel := curEpicLabel, startDate := curStartDate, endDate := curEndDate, WHERE taskID = curTaskID

-- Delete item from a table
DELETE FROM task WHERE idtask = :curIDtask;

