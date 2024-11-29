# NFL Player App

#### Instructions
1. Create a `dev.env` file in the project root directory with the following info
```
PORT=3000
DB_HOST=<insert host>
DB_NAME=<insert database name>
DB_PORT=<insert database port>
DB_USER=<insert username>
DB_PASS=<insert password>
```
2. Run `npm install` to install all packages
3. Run `npm run build:prod` to bundle the application
4. Run `npm run start` to host
5. Go to http://localhost:3000 to view the app


#### Notes
I want to make the player stats look like a trading card. For task 3, the visuals are the icons next to the stats labels. I know you say to only show two visuals, but I thought it makes sense to show all the stats related to the player position.

The stats bar compares selected players' stats with the highest stats on the list, regardless of their positions. So if you want a fair comparison, select players with the same position.

