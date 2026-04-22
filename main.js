document.addEventListener('DOMContentLoaded', () => {

    // Animated circuit background
    const canvas = document.getElementById('bg-canvas');
    const ctx = canvas.getContext('2d');
    let W, H, nodes = [], particles = [];

    function resize() {
        W = canvas.width = window.innerWidth;
        H = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    // Create circuit nodes
    for (let i = 0; i < 60; i++) {
        nodes.push({
            x: Math.random() * W, y: Math.random() * H,
            vx: (Math.random() - .5) * .3, vy: (Math.random() - .5) * .3,
            r: Math.random() * 2 + 1
        });
    }

    function drawBg() {
        ctx.clearRect(0, 0, W, H);
        // Draw grid
        ctx.strokeStyle = 'rgba(0,212,255,0.03)';
        ctx.lineWidth = 1;
        const gs = 60;
        for (let x = 0; x < W; x += gs) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
        for (let y = 0; y < H; y += gs) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }

        // Move nodes
        nodes.forEach(n => {
            n.x += n.vx; n.y += n.vy;
            if (n.x < 0 || n.x > W) n.vx *= -1;
            if (n.y < 0 || n.y > H) n.vy *= -1;
        });

        // Draw connections
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const dist = Math.sqrt(dx*dx + dy*dy);
                if (dist < 150) {
                    ctx.strokeStyle = `rgba(0,212,255,${(1 - dist/150) * 0.12})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.stroke();
                }
            }
        }

        // Draw nodes
        nodes.forEach(n => {
            ctx.fillStyle = 'rgba(0,212,255,0.4)';
            ctx.beginPath();
            ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
            ctx.fill();
        });

        requestAnimationFrame(drawBg);
    }
    drawBg();

    // Custom cursor
    const cursor = document.getElementById('cursor');
    const outer = document.getElementById('cursor-outer');
    document.addEventListener('mousemove', e => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        setTimeout(() => {
            outer.style.left = e.clientX + 'px';
            outer.style.top = e.clientY + 'px';
        }, 80);
    });
    document.querySelectorAll('a,button').forEach(el => {
        el.addEventListener('mouseenter', () => { cursor.classList.add('big'); outer.classList.add('big'); });
        el.addEventListener('mouseleave', () => { cursor.classList.remove('big'); outer.classList.remove('big'); });
    });

    // Navbar scroll
    const nav = document.getElementById('nav');
    window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 50), { passive: true });

    // Burger
    const burger = document.getElementById('burger');
    const mob = document.getElementById('mob-menu');
    burger.addEventListener('click', () => mob.classList.toggle('open'));
    mob.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mob.classList.remove('open')));

    // Typing effect
    const phrases = ['Securing Cloud Infrastructure', 'Automating CI/CD Pipelines', 'Building Full Stack Systems', 'Hardening Docker Containers', 'Penetration Testing & VAPT'];
    let pi = 0, ci = 0, del = false;
    const el = document.getElementById('typing');
    function type() {
        const phrase = phrases[pi];
        if (!del) {
            el.textContent = phrase.slice(0, ++ci);
            if (ci === phrase.length) { del = true; setTimeout(type, 1800); return; }
        } else {
            el.textContent = phrase.slice(0, --ci);
            if (ci === 0) { del = false; pi = (pi + 1) % phrases.length; }
        }
        setTimeout(type, del ? 40 : 65);
    }
    type();

    // Scroll reveal
    const io = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
        });
    }, { threshold: 0.08 });
    document.querySelectorAll('.reveal,.reveal-d').forEach(el => io.observe(el));
});