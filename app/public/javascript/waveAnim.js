window.onload = () => {
    let canvas = document.querySelector("canvas");
    let ctx = canvas.getContext("2d");
    let time = 0;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener('resize', function(){
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    window.requestAnimationFrame(function(){
        anim(ctx, canvas, time);
    });
}

function cGrad(curr, max){

    let ratio = curr / max;

    let r = 255 * ratio;
    let g = 255 - r
    let b = 0;

    return `rgb(${r}, ${g}, ${0})`;
}


function trigColor(curr){
    let time = curr * 0.25;
    let r = 255 * Math.abs(Math.sin(time * Math.PI / 180));
    let g = 0;
    let b = 255 * Math.abs(Math.cos(time * Math.PI / 180));

    return `rgb(${r}, ${g}, ${b})`;
}

function anim(ctx, canvas, time){

    //ctx.clearRect(0, 0, innerWidth, innerHeight);
    ctx.fillStyle = "rgba(0,0,0,0.05)";
    ctx.fillRect(0, 0, innerWidth, innerHeight);

    let yMin = canvas.height / 2;
    let yRange = canvas.height - yMin;

    let width = 40, height = 20;

    let yDelta = yRange / height;
    let xDelta = canvas.width / width;

    for(let i = 0; i < width; i++){
        for(let j = 0; j < height + 1; j++){
            ctx.beginPath();
            let x = i * xDelta;
            if(j % 2 == 0){
                x += xDelta / 2;
            }
            let y = yMin + j * yDelta + 2 * (height - j) * Math.cos(0.5 * (x + time) * Math.PI / 180);
            let rad = Math.sqrt(j/4);
            ctx.arc(x, y, rad, 0, 2 * Math.PI);
            ctx.fillStyle = trigColor(x + time);
            ctx.strokeStyle = trigColor(x + time);
            ctx.fill();
            ctx.stroke();
        }
    }

    time++;

    window.requestAnimationFrame(function(){
        anim(ctx, canvas, time);
    }); 
}