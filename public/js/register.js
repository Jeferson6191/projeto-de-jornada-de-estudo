

const usernamevalue = document.querySelector("#Username");
const passwordvalue = document.querySelector("#password");

document.querySelector("#submitloginbtn").addEventListener("click", async(e) => {
    e.preventDefault();
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

    document.querySelector("#feedback").textContent = JSON.stringify(data.message).replaceAll(`"`,"");


    if (!response.ok){

        throw new Error("Erro na requisição");
    }
    }
    catch (err) {
        console.log(`Error${err}`);
    }
})
    