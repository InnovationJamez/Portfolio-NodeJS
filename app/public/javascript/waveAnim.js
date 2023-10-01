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

function anim(ctx, canvas, time){

    ctx.clearRect(0, 0, innerWidth, innerHeight);

    let yMin = canvas.height / 2;
    let yRange = canvas.height - yMin;

    let width = 40, height = 20;

    let yDelta = yRange / height;
    let xDelta = canvas.width / width;

    for(let i = 0; i < width; i++){
        for(let j = 0; j < height + 1; j++){
            ctx.fillStyle = "white";
            ctx.strokeStyle = "white";
            ctx.beginPath();
            let x = i * xDelta;
            if(j % 2 == 0){
                x += xDelta / 2;
            }
            let y = yMin + j * yDelta + (height - j) * Math.cos((x + time) * Math.PI / 180);
            let rad = Math.sqrt(j/4);
            ctx.arc(x, y, rad, 0, 2 * Math.PI);
            ctx.fill();
            ctx.stroke();
        }
    }

    time++;

    window.requestAnimationFrame(function(){
        anim(ctx, canvas, time);
    }); 
}