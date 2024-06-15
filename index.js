const express = require('express')
const exphbs = require('express-handlebars')
const port = 3000

const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static('public'))

// config engine
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.get('/', (req, res)=>{
    res.render('home')
})

app.listen(port, ()=>{
    console.log(`Servidor online. http://localhost:${port}`)
})