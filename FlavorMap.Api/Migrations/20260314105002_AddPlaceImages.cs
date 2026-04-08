using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FlavorMap.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddPlaceImages : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CultureImage",
                table: "Places",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MenuImage",
                table: "Places",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MoodImage",
                table: "Places",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "WeightImage",
                table: "Places",
                type: "TEXT",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CultureImage",
                table: "Places");

            migrationBuilder.DropColumn(
                name: "MenuImage",
                table: "Places");

            migrationBuilder.DropColumn(
                name: "MoodImage",
                table: "Places");

            migrationBuilder.DropColumn(
                name: "WeightImage",
                table: "Places");
        }
    }
}
