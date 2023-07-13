@echo off
setlocal
 
set "migration_path=./src/migrations/%1"
npm run typeorm migration:generate -p "%migration_path%"
 
endlocal