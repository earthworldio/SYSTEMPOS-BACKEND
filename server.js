const express = require('express')

const app = express()
const port = 3000

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

var cors = require('cors')
app.use(cors())

app.use(require('./controllers/PackageController'))
app.use(require('./controllers/MemberControllers'))
app.use(require('./controllers/ProductController'))

app.listen(port, (req, res) => { console.log(`App listening on port : ${port}`) })