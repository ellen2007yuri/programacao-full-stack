let canvas=document.getElementById('canvas');
let ctx=canvas.getContext('2d');



ctx.beginPath();
ctx.lineWidth=2;
ctx.fillStyle= 'yellow';
ctx.arc(300,100,50,0,2*Math.PI);
ctx.fill();
ctx.closePath();



ctx.beginPath();
ctx.lineWidth=2;
ctx.fillStyle= 'gray';
ctx.fillRect(0,300,400,100);      ''
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.lineWidth=2;
ctx.fillStyle='brown';
ctx.fillRect(140,180,120,120);
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.lineWidth=2;
ctx.fillStyle='red';
ctx.moveTo(140,180);
ctx.lineTo(200,120);
// 140+60,140-60
ctx.lineTo(260,180);
// 200+60,volta y=180
ctx.fill();
ctx.closePath();




ctx.beginPath();
ctx.lineWidth=2;
ctx.fillStyle='brown';
ctx.fillRect(50,230,25,70);
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.lineWidth=2;
ctx.fillStyle='green';
ctx.arc(60,210,30,0,2*Math.PI);
ctx.fill();
ctx.closePath();





ctx.beginPath();
ctx.lineWidth=2;
ctx.fillStyle='brown';
ctx.fillRect(350,280,25,70);
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.lineWidth=2;
ctx.fillStyle='green';
ctx.arc(360,255,30,0,2*Math.PI);
ctx.fill();
ctx.closePath();




ctx.beginPath();
ctx.lineWidth=2;
ctx.fillStyle='black';
ctx.fillRect(190,230,20,70);
ctx.fill();
ctx.closePath();



ctx.beginPath();
ctx.lineWidth=2;
ctx.fillStyle='#61BBFB';
ctx.fillRect(150,200,30,30);
ctx.fill();
ctx.closePath();



ctx.beginPath();
ctx.lineWidth=2;
ctx.fillStyle='#61BBFB';
ctx.fillRect(220,200,30,30);
ctx.fill();
ctx.closePath();



ctx.beginPath();
ctx.fillStyle='#598CFA';
ctx.arc(0,300,50,0*Math.PI,2*Math.PI);
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.fillStyle='#598CFA';
ctx.fillRect(0,300,50,100);
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.fillStyle='#598CFA';
ctx.arc(150,400,50,0*Math.PI,2*Math.PI);
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.fillStyle='#598CFA';
ctx.fillRect(50,350,100,50);
ctx.fill();
ctx.closePath();





let canvas2=document.getElementById('canvas1');
let ctx2=canvas2.getContext('2d');


// quadrado azul
ctx2.beginPath();
ctx2.fillStyle= 'blue';
ctx2.fillRect(0,0,50,50);
ctx2.fill();
ctx2.closePath();


// quadrado vermelho
ctx2.beginPath();
ctx2.fillStyle= 'red';
ctx2.fillRect(250,0,50,50);
ctx2.fill();
ctx2.closePath();



ctx2.beginPath();
ctx2.fillStyle= '#56FDFE';
ctx2.fillRect(0,120,30,60);
ctx2.fill();
ctx2.closePath();


ctx2.beginPath();
ctx2.fillStyle= '#56FDFE';
ctx2.fillRect(270,135,30,30);
ctx2.fill();
ctx2.closePath();


ctx2.beginPath();
ctx2.fillStyle= 'yellow';
ctx2.fillRect(0,250,30,130);
ctx2.fill();
ctx2.closePath();

ctx2.beginPath();
ctx2.fillStyle= 'yellow';
ctx2.fillRect(30,280,30,30);
ctx2.fill();
ctx2.closePath();


ctx2.beginPath();
ctx2.fillStyle= 'black';
ctx2.fillRect(250,280,60,130);
ctx2.fill();
ctx2.closePath();


ctx2.beginPath();
ctx2.fillStyle= 'black';
ctx2.fillRect(270,250,30,290);
ctx2.fill();
ctx2.closePath();



ctx2.beginPath();
ctx2.lineWidth=1;
ctx2.fillStyle= 'yellow';
ctx2.strokeStyle='green';
ctx2.arc(80,230,15,0,2*Math.PI);
ctx2.fill();
ctx2.stroke();
ctx2.closePath();



ctx2.beginPath();
ctx2.lineWidth=1;
ctx2.fillStyle= 'yellow';
ctx2.strokeStyle='green';
ctx2.arc(220,230,15,0,2*Math.PI);
ctx2.fill();
ctx2.stroke();
ctx2.closePath();


ctx2.beginPath();
ctx2.lineWidth=1;
ctx2.fillStyle= '#56FDFE';
ctx2.strokeStyle='blue';
ctx2.arc(150,120,15,0,2*Math.PI);
ctx2.fill();
ctx2.stroke();
ctx2.closePath();


ctx2.beginPath();
ctx2.lineWidth=1;
ctx2.fillStyle= '#56FDFE';
ctx2.strokeStyle='green';
ctx2.arc(150,300,40,1*Math.PI,0*Math.PI);
ctx2.fill();
ctx2.stroke();
ctx2.closePath();


// linha verde 
ctx2.beginPath();
ctx2.moveTo(0, 150);
ctx2.lineTo(150, 150);
ctx2.lineWidth = 1;
ctx2.strokeStyle = "green";
ctx2.stroke();
ctx2.fill();
ctx2.closePath();

// linha verde
ctx2.beginPath();
ctx2.moveTo(150, 150);
ctx2.lineTo(300, 150);
ctx2.lineWidth = 1;
ctx2.strokeStyle = "green";
ctx2.stroke();
ctx2.fill();
ctx2.closePath();


// linha azul
ctx2.beginPath();
ctx2.moveTo(0, 0);
ctx2.lineTo(150, 150);
ctx2.lineWidth = 1;
ctx2.strokeStyle = "blue";
ctx2.stroke();
ctx2.fill();
ctx2.closePath();


// linha vermelha 
ctx2.beginPath();
ctx2.moveTo(300, 0);
ctx2.lineTo(150, 150);
ctx2.lineWidth = 1;
ctx2.strokeStyle = "#FF0000";
ctx2.stroke();
ctx2.fill();
ctx2.closePath();

// quadrado vermelho no meio do quadro
ctx2.beginPath();
ctx2.fillStyle= 'red';
ctx2.fillRect(110,150,40,40);
ctx2.fill();
ctx2.closePath();


//  meia bola  com contorno verde
ctx2.beginPath();
ctx2.lineWidth=1;
ctx2.strokeStyle='green';
ctx2.arc(150,150,70,1*Math.PI,0*Math.PI);
ctx2.stroke();
ctx2.closePath();

// linha reta cinza
ctx2.beginPath();
ctx2.moveTo(150, 260);
ctx2.lineTo(150,150);
ctx2.lineWidth = 1;
ctx2.strokeStyle = "#808080";
ctx2.stroke();
ctx2.closePath();

// meia circunferencia verde do chao do lado direito
ctx2.beginPath();
ctx2.lineWidth=1;
ctx2.strokeStyle='green';
ctx2.arc(150,300,60,1.5*Math.PI,0*Math.PI);
ctx2.stroke();
ctx2.closePath();


//  meia circunferencia verde do chao do lado esquerdo 
ctx2.beginPath();
ctx2.lineWidth=1;
ctx2.strokeStyle='green';
ctx2.arc(150,300,80,1*Math.PI,1.5*Math.PI);
ctx2.stroke();
ctx2.closePath();

//  meia circunferencia de cima 
ctx2.beginPath();
ctx2.lineWidth=1;
ctx2.strokeStyle='green';
ctx2.arc(150,150,90,1.75*Math.PI,Math.PI*0);
ctx2.stroke();
ctx2.closePath();

ctx2.beginPath();
ctx2.lineWidth=1;
ctx2.strokeStyle='green';
ctx2.arc(150,150,90,1*Math.PI,1.25*Math.PI);
ctx2.stroke();
ctx2.closePath();