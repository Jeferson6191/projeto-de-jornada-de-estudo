const botao = document.querySelector("#btnteste")

botao.addEventListener("click", async() => {
    const requisicao = await fetch("/api/trazerresposta")
    const res = await requisicao.json();
    alert(`a resposta do  backend foi:  ${JSON.stringify(res.resposta2)}`)  
});