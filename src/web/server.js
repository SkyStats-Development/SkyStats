const rateLimit = require('express-rate-limit');
const express = require('express');
const app = express();
const chalk = require(`chalk`)
const port = 80;
const logger = require(`../Logger.js`)
app.set('view engine', 'ejs');

process.on('uncaughtException', (error) => console.log(error));
process.on('unhandledRejection', (error) => console.log(error));

const limiter = rateLimit({
    windowMs: 1000 * 60, // 1 minute
    max: 60,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        status: 429,
        message: 'Too many requests, please try again later.',
    },
});
app.use(express.static('stats'));
app.set('views', `${__dirname + `/views`}`);
// Define the route for /stats/:username
app.get('/stats/:username/', (req, res) => {
  const username = req.params.username;
  res.render('stats', { username });
});


app.use(express.static(__dirname + '/'));
app.use(limiter);
app.use(require('cors')());
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true }));



app.listen(port, () => {
    logger.websiteMessage(
        `Client Ready, Website listening to port:${port}` + ` DNS Online.`
    )
    
});