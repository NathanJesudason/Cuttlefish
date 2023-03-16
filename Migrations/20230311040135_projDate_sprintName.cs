using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Cuttlefish.Migrations
{
    public partial class projDate_sprintName : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "name",
                table: "Sprints",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "startDate",
                table: "Projects",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "name",
                table: "Sprints");

            migrationBuilder.DropColumn(
                name: "startDate",
                table: "Projects");
        }
    }
}
