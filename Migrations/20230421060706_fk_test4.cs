using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Cuttlefish.Migrations
{
    public partial class fk_test4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Projects.id",
                table: "Sprints",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Sprints_Projects.id",
                table: "Sprints",
                column: "Projects.id");

            migrationBuilder.AddForeignKey(
                name: "FK_Sprints_Projects_Projects.id",
                table: "Sprints",
                column: "Projects.id",
                principalTable: "Projects",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Sprints_Projects_Projects.id",
                table: "Sprints");

            migrationBuilder.DropIndex(
                name: "IX_Sprints_Projects.id",
                table: "Sprints");

            migrationBuilder.DropColumn(
                name: "Projects.id",
                table: "Sprints");
        }
    }
}
