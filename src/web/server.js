const rateLimit = require('express-rate-limit');
const express = require('express');
const app = express();
const chalk = require(`chalk`)
const port = 80;
const logger = require(`../Logger.js`)
app.set('view engine', 'ejs');
const { getSkyStats } = require(`../../API/functions/getSkystats.js`);
const { getPlayer2 } = require(`../../API/functions/getPlayer2.js`);

process.on('uncaughtException', (error) => console.log(error));
process.on('unhandledRejection', (error) => console.log(error));


app.use(express.static('stats'));
app.set('views', `${__dirname + `/views`}`);
// Define the route for /stats/:username
app.get('/stats/:username/', async (req, res) => {
  const username = req.params.username;

  

  res.render('stats', { username, });
});

app.locals.require = require;
app.use(express.static(__dirname + '/'));
app.use(require('cors')());
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true }));



app.listen(port, () => {
    logger.websiteMessage(
        `Client Ready, Website listening to port:${port}` + ` DNS Online.`
    )
    
});