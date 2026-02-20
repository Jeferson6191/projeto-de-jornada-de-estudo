// importando dedpendencias
import console from "console"
import express from "express"
import path from "path"
import "dotenv/config"

// executando funções de banco de dados
import * as db from "./db.js"

// configurações iniciais
const app = express();
const PORT = process.env.PORT
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));