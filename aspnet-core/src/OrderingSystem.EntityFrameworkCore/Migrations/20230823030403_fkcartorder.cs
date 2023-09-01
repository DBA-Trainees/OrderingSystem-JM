using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OrderingSystem.Migrations
{
    /// <inheritdoc />
    public partial class fkcartorder : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Cartfk",
                table: "Orders",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Cartfk",
                table: "Carts",
                type: "int",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Cartfk",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "Cartfk",
                table: "Carts");
        }
    }
}
