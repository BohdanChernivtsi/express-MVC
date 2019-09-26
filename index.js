const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const modelesModule = require('./models/models.js');

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.set('view engine', 'ejs');

app.get('/', modelesModule.list)
app.get('/todo/new', modelesModule.add)
app.get('/todo', modelesModule.show)
app.get('/todo/delete', modelesModule.remove)
app.get('/todo/edit', modelesModule.edit)
app.post('/todo/create', modelesModule.create)
app.post('/todo/update', modelesModule.update)

// Start server
app.listen(3002, () => {
  console.log(`Server listening`)
})