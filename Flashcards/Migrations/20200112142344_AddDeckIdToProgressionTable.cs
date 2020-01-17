using Microsoft.EntityFrameworkCore.Migrations;

namespace Flashcards.Migrations
{
    public partial class AddDeckIdToProgressionTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "DeckId",
                table: "Progressions",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DeckId",
                table: "Progressions");
        }
    }
}
