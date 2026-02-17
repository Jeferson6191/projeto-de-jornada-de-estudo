// importando o express
import console from "console"
import express from "express"
import fs from "fs"
import path from "path"
import "dotenv/config"

// executando funções de banco de dados
import * as db from "./db.js"

db.criandotabela()
db.connectDB()

// import * as db from ".\src\db.js"
// configurações iniciais
const app = express();
const PORT = process.env.PORT
app.use(express.static("public"));
app.use(express.json());

// fazendo a primeira rota de GET

app.get(`/`, (req, res) =>{
    
    console.log("rota acessada");
    
    res.sendFile(
        path.join(process.cwd("public","index.hmtl"))
    );

    
})

app.get("/api/trazerresposta", (req,res)=>{
    res.json(
        {resposta: "fala rapaziada essa aqui é a resposta do json",
         resposta2: "esse menino é tchola"
        }
    )
})

// abrindo o primeiro listen para teste
app.listen(PORT, () =>{
    console.log(`porta aberta ${PORT}`)
})

