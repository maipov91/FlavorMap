using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FlavorMap.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddStickerImage : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "StickerImage",
                table: "Places",
                type: "TEXT",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "StickerImage",
                table: "Places");
        }
    }
}
