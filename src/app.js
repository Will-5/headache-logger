const express = require('express')
const hbs = require('hbs')
const path = require('path')
require('./db/mongoose')
const userRouter = require('./routers/user')
const headacheRouter = require('./routers/headache')
const triggerRouter = require('./routers/trigger')
const remedyRouter = require('./routers/remedy')


const app = express()
const port = process.env.PORT || 3000

//define paths for Express config
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '/templates/views')
const partialsPath = path.join(path.join(__dirname, '/templates/partials'))

// setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectory))


app.use(express.json())
app.use(userRouter)
app.use(headacheRouter)
app.use(triggerRouter)
app.use(remedyRouter)


//home
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Headache-logger',
        name: 'William'
    })
})

// cadastrar dor de cabeça
app.get('/cadastrar_dor', (req, res) =>{
    res.render('cadastrar_dor'), {
        title: 'Headache-logger',
        name: 'William'
    }
})

//meu perfil
app.get('/meuperfil', (req, res) => {
    res.render('meuperfil', {
        title: 'Headache-logger',
        name: 'William'
    })
})
//ajuda
app.get('/ajuda', (req, res) => {
    res.render('ajuda', {
        title: 'Headache-logger',
        name: 'William'
    })
})

app.get('/ajuda/*', (req, res) => {
    res.render('404', {
        title: '404',
        error: 'Error 404 - help article not found',
        name: 'William'
    })
})

app.get('*',(req, res) => {
    res.render('404', {
        title: '404',
        error: 'Error 404 - page not found',
        name: 'William'
    })
})
app.listen(port, () => {
    console.log("SERVER ON! - port - ", port)
})