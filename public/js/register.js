// pegando ids

const usernamevalue = document.querySelector("#Username");
const passwordvalue = document.querySelector("#password");

document.querySelector("#submitloginbtn").addEventListener("click", async(e) => {
    e.preventDefault();
    fetch("http://localhost:8000/register",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            Username: usernamevalue.value,
            password: passwordvalue.value 
        })   
    })
    .then(res => {
        if (!res.ok) throw new Error("Erro na requisição");
        return res.json();
    })
    })
    .then(data => {
        console.log("Resposta:", data);
        console.log(String(data));
        document.querySelector("#feedback").textContent = JSON.stringify(data.message);
    })
    .catch(err => {
        console.error("Erro:", err);
    });


    console.log(res);
    