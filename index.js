const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const flash = require('express-flash') // responsável pelas flash message
const conn = require('./db/conn')
const port = 3000

const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static('public'))

// config engine
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

// models
const User = require('./models/User')
const Tought = require('./models/Tought')

// routes
const toughtsRoutes = require('./routes/toughtsRoutes')
const authRoutes = require('./routes/authRoutes')

// controller apenas para a home
const ToughtController = require('./controllers/ToughtController')

// session middleware
app.use(session({
    name: 'session',
    secret: 'nosso_secret', //
    resave: false, // caiu a sessão.. ele desconecta
    saveUninitialized: false,
    store: new FileStore({
        logFn: function(){},
        path: require('path').join(require('os').tmpdir(), 'session')
    }),
    cookie: {
        secure: false,
        maxAge: 360000, // 1 dia
        httpOnly: true
    }
}))

// flash messages (Mensagens d status do sistema)
app.use(flash())

// set session to res (sempre verifica se o usuário está logado)
// se estiver -> segue com o id
// se não estiver -> segue sem o id
app.use((req, res, next)=>{
    if(req.session.userid){
        res.locals.session = req.session
    }
    next()
})

app.use('/toughts', toughtsRoutes)
app.use('/', authRoutes)
app.get('/', ToughtController.showToughts)


conn
// .sync({force: true})
.sync()
.then(()=>{
    app.listen(port, ()=>{
        console.log(`Servidor online. http://localhost:${port}`)
    })
})
.catch(err => console.error('Erro: ', err))