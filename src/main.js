// importando o express
const express = require("express")

// configurações iniciais
const app = express()
const PORT = 8000

// fazendo a primeira rota de GET

app.get(`/`, (req, res) =>{
    requisisao = req
    console.log("rota acessada")
    res.send("Hello World !!" + req._read())
    
})

app.post(`/main`, (req, res) =>{
    res.send(`rota  de POST acessada`)
    console.log(`rota de POST acessada`);
    
})
// abrindo o primeiro listen para teste
app.listen(PORT, () =>{
    console.log(`porta aberta ${PORT}`)
})

