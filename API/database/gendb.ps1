#!/bin/pwsh
# Delete and recreate database and fill it with test values
$dbname = 'db.sqlite'
cd $PSScriptRoot
Remove-Item $dbname -ErrorAction Ignore
Get-Content database.sql,test-values.sql | sqlite3 $dbname
