using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Cuttlefish.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Labels",
                columns: table => new
                {
                    label = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    color = table.Column<string>(type: "nvarchar(7)", maxLength: 7, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Labels", x => x.label);
                });

            migrationBuilder.CreateTable(
                name: "Projects",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    color = table.Column<string>(type: "nvarchar(7)", maxLength: 7, nullable: true),
                    description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    startDate = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    dueDate = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    funds = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Projects", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "TeamMembers",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    username = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    password = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    roles = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    avatar = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    token = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    resetPasswordToken = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    resetPasswordExpire = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TeamMembers", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Sprints",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    projectID = table.Column<int>(type: "int", nullable: false),
                    name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    goal = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    storyPointsAttempted = table.Column<int>(type: "int", nullable: false),
                    storyPointsCompleted = table.Column<int>(type: "int", nullable: false),
                    isBacklog = table.Column<bool>(type: "bit", nullable: false),
                    isCompleted = table.Column<bool>(type: "bit", nullable: false),
                    startDate = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    endDate = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sprints", x => x.id);
                    table.ForeignKey(
                        name: "FK_Sprints_Projects_projectID",
                        column: x => x.projectID,
                        principalTable: "Projects",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TeamMembersToProjects",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    teamMemberID = table.Column<int>(type: "int", nullable: false),
                    projectID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TeamMembersToProjects", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TeamMembersToProjects_Projects_projectID",
                        column: x => x.projectID,
                        principalTable: "Projects",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TeamMembersToProjects_TeamMembers_teamMemberID",
                        column: x => x.teamMemberID,
                        principalTable: "TeamMembers",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Tasks",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    sprintID = table.Column<int>(type: "int", nullable: false),
                    name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    assignee = table.Column<int>(type: "int", nullable: true),
                    order = table.Column<int>(type: "int", nullable: false),
                    storyPoints = table.Column<int>(type: "int", nullable: false),
                    description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    progress = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    startDate = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    endDate = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    priority = table.Column<int>(type: "int", nullable: false),
                    type = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    cost = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tasks", x => x.id);
                    table.ForeignKey(
                        name: "FK_Tasks_Sprints_sprintID",
                        column: x => x.sprintID,
                        principalTable: "Sprints",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Tasks_TeamMembers_assignee",
                        column: x => x.assignee,
                        principalTable: "TeamMembers",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "Comments",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    teamMemberID = table.Column<int>(type: "int", nullable: false),
                    taskID = table.Column<int>(type: "int", nullable: false),
                    date = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    content = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Comments", x => x.id);
                    table.ForeignKey(
                        name: "FK_Comments_Tasks_taskID",
                        column: x => x.taskID,
                        principalTable: "Tasks",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Comments_TeamMembers_teamMemberID",
                        column: x => x.teamMemberID,
                        principalTable: "TeamMembers",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "LabelsToTasks",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    label = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    taskID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LabelsToTasks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_LabelsToTasks_Labels_label",
                        column: x => x.label,
                        principalTable: "Labels",
                        principalColumn: "label");
                    table.ForeignKey(
                        name: "FK_LabelsToTasks_Tasks_taskID",
                        column: x => x.taskID,
                        principalTable: "Tasks",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TasksToTasks",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    independentTaskID = table.Column<int>(type: "int", nullable: false),
                    dependentTaskID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TasksToTasks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TasksToTasks_Tasks_dependentTaskID",
                        column: x => x.dependentTaskID,
                        principalTable: "Tasks",
                        principalColumn: "id",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_TasksToTasks_Tasks_independentTaskID",
                        column: x => x.independentTaskID,
                        principalTable: "Tasks",
                        principalColumn: "id",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Comments_taskID",
                table: "Comments",
                column: "taskID");

            migrationBuilder.CreateIndex(
                name: "IX_Comments_teamMemberID",
                table: "Comments",
                column: "teamMemberID");

            migrationBuilder.CreateIndex(
                name: "IX_LabelsToTasks_label",
                table: "LabelsToTasks",
                column: "label");

            migrationBuilder.CreateIndex(
                name: "IX_LabelsToTasks_taskID",
                table: "LabelsToTasks",
                column: "taskID");

            migrationBuilder.CreateIndex(
                name: "IX_Sprints_projectID",
                table: "Sprints",
                column: "projectID");

            migrationBuilder.CreateIndex(
                name: "IX_Tasks_assignee",
                table: "Tasks",
                column: "assignee");

            migrationBuilder.CreateIndex(
                name: "IX_Tasks_sprintID",
                table: "Tasks",
                column: "sprintID");

            migrationBuilder.CreateIndex(
                name: "IX_TasksToTasks_dependentTaskID",
                table: "TasksToTasks",
                column: "dependentTaskID");

            migrationBuilder.CreateIndex(
                name: "IX_TasksToTasks_independentTaskID",
                table: "TasksToTasks",
                column: "independentTaskID");

            migrationBuilder.CreateIndex(
                name: "IX_TeamMembersToProjects_projectID",
                table: "TeamMembersToProjects",
                column: "projectID");

            migrationBuilder.CreateIndex(
                name: "IX_TeamMembersToProjects_teamMemberID",
                table: "TeamMembersToProjects",
                column: "teamMemberID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Comments");

            migrationBuilder.DropTable(
                name: "LabelsToTasks");

            migrationBuilder.DropTable(
                name: "TasksToTasks");

            migrationBuilder.DropTable(
                name: "TeamMembersToProjects");

            migrationBuilder.DropTable(
                name: "Labels");

            migrationBuilder.DropTable(
                name: "Tasks");

            migrationBuilder.DropTable(
                name: "Sprints");

            migrationBuilder.DropTable(
                name: "TeamMembers");

            migrationBuilder.DropTable(
                name: "Projects");
        }
    }
}
