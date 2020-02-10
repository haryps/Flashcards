using Microsoft.EntityFrameworkCore.Migrations;

namespace IdentityServer.Data.Migrations
{
    public partial class SetDeckIdRequiredAndUniqueIndex : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Progressions_AppUserId_Word_Understand",
                table: "Progressions");

            migrationBuilder.CreateIndex(
                name: "IX_Progressions_AppUserId_DeckId_Word_Understand",
                table: "Progressions",
                columns: new[] { "AppUserId", "DeckId", "Word", "Understand" },
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Progressions_AppUserId_DeckId_Word_Understand",
                table: "Progressions");

            migrationBuilder.CreateIndex(
                name: "IX_Progressions_AppUserId_Word_Understand",
                table: "Progressions",
                columns: new[] { "AppUserId", "Word", "Understand" },
                unique: true);
        }
    }
}
