using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FlavorMap.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddSeasonSection : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "SeasonSection",
                table: "Places",
                type: "TEXT",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SeasonSection",
                table: "Places");
        }
    }
}
