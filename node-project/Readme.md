
Should have node v14 postgesql v12
1. check and configure .env file
2. run script ```psql -f application/db/install.sql -U postgres```
3. run script ``` npm run migration && npm run seed```
4. npm start
