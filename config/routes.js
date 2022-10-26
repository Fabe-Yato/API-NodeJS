const express = require('express')
const req = require('express/lib/request')
const routes = express.Router()

let usuarios = [
    {id: 1, usuario: "Leonardo", senha: 123}, 
    {id: 2, usuario: "Davi", senha: 456}, 
    {id: 3, usuario: "Fabiano", senha: 789}
]

//requisição GET
routes.get('/usuarios', (req, res) => {
    return res.json(usuarios)
})

routes.get('/login', (req, res) => {
    const id = req.query['id']
    const senha = req.query['senha']

    console.log(id)
    console.log(senha)
    let resposta = validacao(id, senha)
    
    return res.json(resposta)
})

routes.post('/usuarios', (req, res) => {
    const body = req.body
    
    if(!body){
        return res.status(400).end()
    }
    usuarios.push(body)
    return res.json(body)
    
})

routes.put('/usuarios/:id', (req, res) => {
    const { id } = req.params
    const { usuario, senha } = req.body

    const newUsuario = {
        id,
        usuario,
        senha
    }

    const usuariosIndex = usuarios.findIndex( usuarios => usuarios.id == id)

    usuarios[usuariosIndex] = newUsuario

    return res.json(newUsuario)
})

routes.delete('/usuarios/:id', (req, res) => {
    const id = req.params.id
    const usuariosIndex = usuarios.findIndex( usuarios => usuarios.id == id)

    usuarios.splice(usuariosIndex, 1)
    return res.status(204).send()
 
})

module.exports = routes 

const validacao = (id, senha) => {
    let usuarioStatus = false
    let senhaStatus = false
    let resposta = ""
    const usuariosIndex = usuarios.findIndex( usuarios => usuarios.id == id)

    if(id == null){
        resposta = "Usuario não informado"
    }
    else if(senha == null){
        resposta = "Senha não informada"
    }

    else if(id != "" && senha != ""){
        for(let i = 0; i < usuarios.length; i++){
                if(id == usuarios[i].id && senha == usuarios[i].senha){
                    resposta = "está correto, seja bem vindo" + " " + usuarios[usuariosIndex].usuario
                    usuarioStatus = true
                    senhaStatus = true
                }

                else if(id == usuarios[i].id){
                    usuarioStatus = true
                }

                else if(senha == usuarios[i].senha){
                    senhaStatus = true
                }
               

            }

            if(usuarioStatus == false){
                resposta = "Usuário não encontrado no banco de dados"
            }
            else if(senhaStatus == false){
                resposta = "Senha não encontrada no banco de dados"
            }
    }
    
        
    return resposta
}