function revealCard() {
    document.getElementById('page1').classList.add('hide');
    document.getElementById('page2').classList.add('show');
    spawnHearts();
    launchConfetti();
    calcDays();
}

/**
 * Calculates the number of days between birth and today.
 */
function calcDays() {
    const bday = new Date('2004-04-23');
    const today = new Date();
    
    // Calculate difference in milliseconds
    const diffTime = today - bday;
    
    // Convert to days: ms / (sec * min * hr * day)
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); 
    
    const displayElement = document.getElementById('daysCount');
    if (displayElement) {
        displayElement.textContent = diffDays.toLocaleString();
    }
}

/**
 * Creates floating heart background effect
 */
function spawnHearts() {
    const container = document.getElementById('heartsContainer');
    const emojis = ['❤️','🩷','💕','💗','💓'];
    
    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart-float';
        heart.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = (6 + Math.random() * 8) + 's';
        heart.style.animationDelay = (Math.random() * 6) + 's';
        heart.style.fontSize = (14 + Math.random() * 16) + 'px';
        container.appendChild(heart);
    }
}

/**
 * Renders a custom confetti explosion using Canvas API
 */
function launchConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');
    const pieces = [];
    const colors = ['#FF4D6D','#FF8FA3','#FFB3C1','#c77dff','#7b2ff7','#ffd60a','#80ed99'];

    for (let i = 0; i < 160; i++) {
        pieces.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            w: 6 + Math.random() * 8,
            h: 4 + Math.random() * 6,
            color: colors[Math.floor(Math.random() * colors.length)],
            r: Math.random() * Math.PI * 2,
            rSpeed: (Math.random() - 0.5) * 0.12,
            speed: 1.5 + Math.random() * 3,
            drift: (Math.random() - 0.5) * 1.2,
            alpha: 1
        });
    }

    let frame = 0;
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        pieces.forEach(p => {
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.r);
            ctx.globalAlpha = p.alpha;
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.w/2, -p.h/2, p.w, p.h);
            ctx.restore();
            
            p.y += p.speed;
            p.x += p.drift;
            p.r += p.rSpeed;
            
            // Fade out after a certain amount of time
            if (frame > 180) p.alpha -= 0.005;
        });
        
        frame++;
        
        if (pieces.some(p => p.alpha > 0)) {
            requestAnimationFrame(draw);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }
    draw();
}

// Ensure canvas stays full screen if user rotates phone or resizes window
window.addEventListener('resize', () => {
    const canvas = document.getElementById('confetti-canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});