const numeroSecreto = Math.floor(Math.random() * 100) + 1;

console.log(numeroSecreto);



function verificarPalpite() {
    const chute = document.getElementById('chute').value;
    const corpo = document.body;

    if (chute > numeroSecreto) {
        // Se o chute for MAIOR, tela vermelha
        window.alert("MUITO ALTO! O numero é" + String(numeroSecreto))
        corpo.style.backgroundColor = "#ff4d4d";

    } else if (chute < numeroSecreto) {

                window.alert("MUITO BAIXO! O numero é" + String(numeroSecreto))
        // Se o chute for MENOR, tela verde
        corpo.style.backgroundColor = "#2ecc71";
    } else {
        // Se acertar, volta ao normal ou outra cor (ex: azul)
        corpo.style.backgroundColor = "#3498db";
                window.alert("ACERTOU!!!!")
        mensagem.innerText = "Parabéns! Você acertou!";
    }
}