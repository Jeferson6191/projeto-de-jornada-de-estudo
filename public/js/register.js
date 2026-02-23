

const usernamevalue = document.querySelector("#Username");
const passwordvalue = document.querySelector("#password");

document.querySelector("#submitloginbtn").addEventListener("click", async(e) => {
    e.preventDefault();
            document.querySelector("#feedback").textContent = "";
    
    const resposta_nome = document.querySelector(".resposta_nome");
    const resposta_senha = document.querySelector(".resposta_senha");
    resposta_nome.textContent =""
    resposta_senha.textContent =""
    // testando se o username é numerico
    let sucessovalidacao = true

    if (Number(usernamevalue.value.slice(0,1))) {
        resposta_nome.textContent = "O Username não pode inciar com numero";
        sucessovalidacao = false
    }
    if(usernamevalue.value.length < 3){
        resposta_nome.textContent = "o nome deve conter pelo menos mais de 3 caracteres";
        sucessovalidacao = false
    }
    if(passwordvalue.value.length < 6){
        resposta_senha.textContent = "A senha deve conter pelo menos mais de 6 caracteres "
        sucessovalidacao = false
    }
    

    
        

    
    if (sucessovalidacao == false) {
        return

    }
    
    try {
        
    
    const response = await fetch("/register",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            Username: usernamevalue.value,
            password: passwordvalue.value 
        })   
    })

    const data = await response.json()

    document.querySelector("#feedback").style.color = "green"
    document.querySelector("#feedback").textContent = JSON.stringify(data.message).replaceAll(`"`,"");

    if (!response.ok){
        document.querySelector("#feedback").style.color = "red"
        document.querySelector("#feedback").textContent = JSON.stringify(data.message).replaceAll(`"`,"");
        throw new Error("Erro na requisição");
    }
    }
    catch (err) {
        console.log(`Error${err}`);
    }
})
    