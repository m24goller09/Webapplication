#!/bin/pwsh
# Generate the C# classes with Entity Framework
cd $PSScriptRoot/..
dotnet ef dbcontext scaffold 'Data Source=database/db.sqlite' Microsoft.EntityFrameworkCore.Sqlite
