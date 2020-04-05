using Microsoft.EntityFrameworkCore.Migrations;

namespace AuthServer.Infrastructure.Migrations
{
    public partial class initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "30ce784d-ebd2-4fc4-800a-696495c98ab8");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "41c5218d-8965-41f5-9141-8c5d0edf09c3");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "e68b0180-8274-4e2f-a4e9-0e3c7ee727d8", "0fedb1d1-7213-464b-871c-e5e42bc5ec69", "consumer", "CONSUMER" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "91c0e488-32d0-411a-917a-b40cb9c0d68c", "1b482208-850f-415a-a7f0-13c0eaaadbfd", "admin", "ADMIN" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "91c0e488-32d0-411a-917a-b40cb9c0d68c");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "e68b0180-8274-4e2f-a4e9-0e3c7ee727d8");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "30ce784d-ebd2-4fc4-800a-696495c98ab8", "cad28fe9-eb25-46a2-ae2f-7fa4643576b9", "consumer", "CONSUMER" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "41c5218d-8965-41f5-9141-8c5d0edf09c3", "18d8770d-7702-407e-aa6d-c3d68e8dc041", "admin", "ADMIN" });
        }
    }
}
