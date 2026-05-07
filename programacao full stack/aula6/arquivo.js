let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');


var jay= {
    x: 0,
    y: 100,
    raio: 50,
    img: new Image(),
    desenha: function() {
        this.img.src = 'jay.jpg';
        ctx.beginPath();
        ctx.drawImage(this.img, this.x - this.raio, this.y - this.raio, 2 * this.raio, 2 * this.raio);
        ctx.closePath();
    }

}


function animacao() {
    ctx.clearRect(0, 0, 300, 300)
    jay.desenha();
    requestAnimationFrame(animacao)
}
animacao();

document.addEventListener('mousemove', function (evento) {
    let rect = canvas.getBoundingClientRect();
    let x_mouse = evento.clientX - rect.left;
    let y_mouse = evento.clientY - rect.top;
    console.log(x_mouse, y_mouse);
    jay.x = Math.max(50,Math.min(x_mouse,300-1*jay.raio));
    jay.y = Math.max(50,Math.min(y_mouse,300-1*jay.raio));

})


