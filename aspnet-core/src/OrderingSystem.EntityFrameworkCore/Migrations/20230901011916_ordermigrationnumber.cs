using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OrderingSystem.Migrations
{
    /// <inheritdoc />
    public partial class ordermigrationnumber : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Carts_CartId",
                table: "Orders");

            migrationBuilder.DropIndex(
                name: "IX_Orders_CartId",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "CartId",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "Cartfk",
                table: "Orders");

            migrationBuilder.AlterColumn<int>(
                name: "Status",
                table: "Orders",
                type: "int",
                nullable: true,
                oldClrType: typeof(bool),
                oldType: "bit");

            migrationBuilder.AddColumn<Guid>(
                name: "OrderNumber",
                table: "Orders",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Qty",
                table: "Orders",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Size",
                table: "Orders",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "Status",
                table: "Carts",
                type: "int",
                nullable: true,
                oldClrType: typeof(bool),
                oldType: "bit");

            migrationBuilder.AddColumn<int>(
                name: "CartId",
                table: "Carts",
                type: "int",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "OrderNumber",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "Qty",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "Size",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "CartId",
                table: "Carts");

            migrationBuilder.AlterColumn<bool>(
                name: "Status",
                table: "Orders",
                type: "bit",
                nullable: false,
                defaultValue: false,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "CartId",
                table: "Orders",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Cartfk",
                table: "Orders",
                type: "int",
                nullable: true);

            migrationBuilder.AlterColumn<bool>(
                name: "Status",
                table: "Carts",
                type: "bit",
                nullable: false,
                defaultValue: false,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Orders_CartId",
                table: "Orders",
                column: "CartId");

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_Carts_CartId",
                table: "Orders",
                column: "CartId",
                principalTable: "Carts",
                principalColumn: "Id");
        }
    }
}
