const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

var app = express()

app.use(express.static(path.join(__dirname, 'build')))
app.use(bodyParser.urlencoded({ extended: true, limit: '100mb' }))
app.use(bodyParser.json())
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, ''))

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 5555
app.listen(PORT, () => {
  console.log('App listen on ' + PORT)
})
