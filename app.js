// smooth scrolling
// gsap
// scrolltrigger

let time = document.getElementById("clock");

document.querySelectorAll("#second .elem h5").forEach(h5 => {
    h5.textContent = new Date().getFullYear();
});

setInterval(() => {
    let date = new Date();
    time.innerHTML = date.toLocaleTimeString();
}, 1000);

const scroll = new LocomotiveScroll({
    el: document.querySelector('main'),
    smooth: true
});

function firstPage() {
    let tl = gsap.timeline();
    
    tl.from("#nav", {
        y: '-20',
        opacity: 0,
        ease: Expo.easeInOut,
        duration: 1,
    })
    .to(".boundingelem", {
        y: '0',
        ease: Expo.easeInOut,
        duration: 1.5,
        stagger: 0.3
    })
    .from("#herofooter", {
        y: 10,
        opacity: 0,
        delay: -1,
        duration: 1.5,
        ease: Expo.easeInOut,
    });
}

var timer;
function skewCircle() {
    var xScale = 1;
    var yScale = 1;
    var xPrev = 0;
    var yPrev = 0;

    window.addEventListener("mousemove", function(dets) {
        clearTimeout(timer);
        xScale = gsap.utils.clamp(0.8, 1.2, dets.clientX - xPrev);
        yScale = gsap.utils.clamp(0.8, 1.2, dets.clientY - yPrev);

        xPrev = dets.clientX;
        yPrev = dets.clientY;

        timer = setTimeout(() => {
            document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px , ${dets.clientY}px) scale(1,1)`;
        }, 100);

        document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px , ${dets.clientY}px) scale(${xScale},${yScale})`;
    });
}

skewCircle();
firstPage();

document.querySelectorAll(".elem").forEach(function(elem) {
    var rotate = 0;
    var diffRot = 0;
    elem.addEventListener("mousemove", function(dets) {
        var difference = dets.clientY - elem.getBoundingClientRect().top;
        diffRot = dets.clientX - rotate;
        rotate = dets.clientX;
       
        gsap.to(elem.querySelector('img'), { 
            opacity: 1,
            ease: Power3,
            top: difference,
            left: dets.clientX,
            rotate: gsap.utils.clamp(-20, 20, diffRot * 0.4)
        });
    });
});

document.querySelectorAll(".elem").forEach(function(elem) {
    elem.addEventListener("mouseleave", function() {
        gsap.to(elem.querySelector('img'), { 
            opacity: 0,
            ease: Power3,
        });
    });
});