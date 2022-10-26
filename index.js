//importação do express para o arquivo
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const routes = require('./config/routes')

const server = express()

server.use(morgan('dev'))
server.use(bodyParser.urlencoded({ extended: false }))
server.use(express.json())
server.use(cors())
server.use(routes)


//porta utilizada
server.listen(3000, () =>{
    console.log("Bom dia, funcionando")
})
