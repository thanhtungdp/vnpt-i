const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const config = require('./src/config')

var app = express()

app.use(express.static(path.join(__dirname, 'build')))
app.use(bodyParser.urlencoded({ extended: true, limit: '100mb' }))
app.use(bodyParser.json())
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, ''))

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(config.PORT_DEPLOY, () => {
  console.log('App listen on ' + config.PORT_DEPLOY)
})
