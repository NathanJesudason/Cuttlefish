using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Cuttlefish.Migrations
{
    public partial class m2mTables : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "LabelsToTasks",
                columns: table => new
                {
                    label = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    taskID = table.Column<int>(type: "int", nullable: false),
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LabelsToTasks", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TasksToTasks",
                columns: table => new
                {
                    independentTaskID = table.Column<int>(type: "int", nullable: false),
                    dependentTaskID = table.Column<int>(type: "int", nullable: false),
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TasksToTasks", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TeamMembersToProjects",
                columns: table => new
                {
                    teamMemberID = table.Column<int>(type: "int", nullable: false),
                    projectID = table.Column<int>(type: "int", nullable: false),
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TeamMembersToProjects", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "LabelsToTasks");

            migrationBuilder.DropTable(
                name: "TasksToTasks");

            migrationBuilder.DropTable(
                name: "TeamMembersToProjects");
        }
    }
}
