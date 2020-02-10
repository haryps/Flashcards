using Microsoft.EntityFrameworkCore.Migrations;

namespace IdentityServer.Data.Migrations
{
    public partial class DecreaesWordLength : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Word",
                table: "Progressions",
                maxLength: 20,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Word",
                table: "Progressions",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldMaxLength: 20);
        }
    }
}
