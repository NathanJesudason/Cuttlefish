using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Cuttlefish.Migrations
{
    public partial class fk_test : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "projectID",
                table: "Sprints",
                newName: "ProjectsID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ProjectsID",
                table: "Sprints",
                newName: "projectID");
        }
    }
}
