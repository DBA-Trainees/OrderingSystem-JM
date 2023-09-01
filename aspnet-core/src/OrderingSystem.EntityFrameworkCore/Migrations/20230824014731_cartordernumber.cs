using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OrderingSystem.Migrations
{
    /// <inheritdoc />
    public partial class cartordernumber : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Cartfk",
                table: "Carts",
                newName: "OrderNumber");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "OrderNumber",
                table: "Carts",
                newName: "Cartfk");
        }
    }
}
