const path = require("path");
const fs = require("fs");


var raiz = "./main.html"

function pegaarquivo(caminho) {

    var encoding = "UTF-8";

    fs.readFile(caminho, encoding, (_, txtarquivo) =>{
        console.log(txtarquivo)
    })

}

pegaarquivo(raiz);
