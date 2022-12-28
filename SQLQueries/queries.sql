-- Queries containing ":" denote that the variable will be supplied from the backend

-- Get all data from a table
SELECT sprintID, startDate, endDate, Goal, storyPointsCompleted, storyPointsAttempted, projectID, IsBacklog from Sprint
SELECT projectID, name, color, description, dueDate, funds from Project
SELECT username, email, role, avatar from team_member

--Get all task info and comments for a task
SELECT * from task where taskID = :curTaskID
SELECT * from comment where task = :curTaskID ORDER BY date desc

-- Insert item into table
INSERT INTO task
INSERT INTO comment
INSERT INTO Project

-- Find specific item from a table
    -- Get all tasks assigned to a person
    SELECT * from task where assigneeID = :curUsername
    -- Get all tasks based on status/label
    SELECT * from task where label = :curLabel

-- Update item in a table
UPDATE task SET name = :currName, ... , WHERE taskID = curTaskID

-- Delete item from a table

