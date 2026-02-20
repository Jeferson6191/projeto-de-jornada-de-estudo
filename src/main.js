// importando dedpendencias
import console from "console"
import express from "express"
import path from "path"
import "dotenv/config"

// executando funções de banco de dados
import * as db from "./db.js"
db.criandotabela()

// configurações iniciais
const app = express();
const PORT = process.env.PORT
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// iniciando rotas

app.get(`/`, (req, res) =>{
    
    console.log("rota acessada");
    
    res.sendFile(
        path.join(process.cwd("public","index.hmtl"))
    );

    
})

app.get("/register", (req,res) =>{

    res.sendFile(
        path.join(process.cwd(), "public", "register.html")
    );
})

app.post("/register", async(req, res) =>{
    console.log(res.body);
    const senha = String(req.body["password"]);
    const usuario = String(req.body["Username"]);
    const { status, data } = await db.register(usuario,senha)

    res.status(status).json(data)

})


// abrindo o primeiro listen para teste
app.listen(PORT, () =>{
    console.log(`porta aberta ${PORT}`)
})

