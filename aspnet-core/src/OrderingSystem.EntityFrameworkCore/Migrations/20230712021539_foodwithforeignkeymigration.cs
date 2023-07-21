using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OrderingSystem.Migrations
{
    /// <inheritdoc />
    public partial class foodwithforeignkeymigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Category",
                table: "Foods");

            migrationBuilder.DropColumn(
                name: "Type",
                table: "Foods");

            migrationBuilder.AddColumn<int>(
                name: "CategoryId",
                table: "Foods",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "TypesId",
                table: "Foods",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Foods_CategoryId",
                table: "Foods",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Foods_TypesId",
                table: "Foods",
                column: "TypesId");

            migrationBuilder.AddForeignKey(
                name: "FK_Foods_Categories_CategoryId",
                table: "Foods",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Foods_Types_TypesId",
                table: "Foods",
                column: "TypesId",
                principalTable: "Types",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Foods_Categories_CategoryId",
                table: "Foods");

            migrationBuilder.DropForeignKey(
                name: "FK_Foods_Types_TypesId",
                table: "Foods");

            migrationBuilder.DropIndex(
                name: "IX_Foods_CategoryId",
                table: "Foods");

            migrationBuilder.DropIndex(
                name: "IX_Foods_TypesId",
                table: "Foods");

            migrationBuilder.DropColumn(
                name: "CategoryId",
                table: "Foods");

            migrationBuilder.DropColumn(
                name: "TypesId",
                table: "Foods");

            migrationBuilder.AddColumn<string>(
                name: "Category",
                table: "Foods",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Type",
                table: "Foods",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
