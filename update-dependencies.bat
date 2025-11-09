@echo off
echo Updating dependencies to latest secure versions...

echo Installing updated dependencies...
npm install axios@^1.7.9
npm install --save-dev @eslint/js@^9.17.0
npm install --save-dev eslint@^9.17.0

echo Checking for security vulnerabilities...
npm audit

echo Fixing security vulnerabilities...
npm audit fix

echo Cleaning up...
rmdir /s /q node_modules 2>nul
del package-lock.json 2>nul

echo Fresh install with updated dependencies...
npm install

echo Update complete! Run 'npm audit' to verify security status.
pause