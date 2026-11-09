
import { useEffect, useRef } from "react";

export default function Fireworks() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        let animationId;
        let particles = [];
        let active = true;

        const colors = [
            "#FFD700",
            "#F5C542",
            "#00FF78",
            "#00D66B",
            "#FFFFFF",
            "#FF4545",
            "#E9B949"
        ];

        const resize = () => {
            const ratio = Math.min(window.devicePixelRatio || 1, 2);

            canvas.width = window.innerWidth * ratio;
            canvas.height = window.innerHeight * ratio;

            ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
        };

        resize();
        window.addEventListener("resize", resize);

        // Crear explosión de fuegos artificiales
        const createFirework = () => {
            const x = Math.random() * window.innerWidth;
            const y = 60 + Math.random() * window.innerHeight * 0.48;

            const color = colors[
                Math.floor(Math.random() * colors.length)
            ];

            const amount = 45;

            for (let i = 0; i < amount; i++) {
                const angle = (Math.PI * 2 * i) / amount;
                const speed = 1.5 + Math.random() * 4;

                particles.push({
                    x,
                    y,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed,
                    color,
                    alpha: 1,
                    size: 2 + Math.random() * 2.5,
                    gravity: 0.045,
                    type: "firework"
                });
            }
        };

        // Crear confeti
        const createConfetti = () => {
            for (let i = 0; i < 110; i++) {
                particles.push({
                    x: Math.random() * window.innerWidth,
                    y: -Math.random() * window.innerHeight,
                    vx: (Math.random() - 0.5) * 2.5,
                    vy: 1.5 + Math.random() * 3,
                    color: colors[
                        Math.floor(Math.random() * colors.length)
                    ],
                    alpha: 1,
                    size: 4 + Math.random() * 5,
                    gravity: 0.025,
                    rotation: Math.random() * 6,
                    rotationSpeed: (Math.random() - 0.5) * 0.12,
                    type: "confetti"
                });
            }
        };

        createConfetti();
        createFirework();

        let lastFirework = 0;

        const animate = (time) => {
            if (!active) return;

            ctx.clearRect(
                0,
                0,
                window.innerWidth,
                window.innerHeight
            );

            if (time - lastFirework > 750) {
                createFirework();
                lastFirework = time;
            }

            particles.forEach((p) => {
                p.x += p.vx;
                p.y += p.vy;
                p.vy += p.gravity;

                if (p.type === "firework") {
                    p.vx *= 0.985;
                    p.vy *= 0.985;
                    p.alpha -= 0.012;

                    ctx.globalAlpha = Math.max(0, p.alpha);
                    ctx.fillStyle = p.color;
                    ctx.shadowBlur = 12;
                    ctx.shadowColor = p.color;

                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                    ctx.fill();
                } else {
                    p.rotation += p.rotationSpeed;
                    p.alpha -= p.y > window.innerHeight + 30 ? 0.04 : 0;

                    ctx.globalAlpha = Math.max(0, p.alpha);
                    ctx.fillStyle = p.color;

                    ctx.save();
                    ctx.translate(p.x, p.y);
                    ctx.rotate(p.rotation);
                    ctx.fillRect(
                        -p.size / 2,
                        -p.size / 2,
                        p.size,
                        p.size * 1.5
                    );
                    ctx.restore();
                }
            });

            ctx.globalAlpha = 1;
            ctx.shadowBlur = 0;

            particles = particles.filter(
                p =>
                    p.alpha > 0 &&
                    p.y < window.innerHeight + 60 &&
                    p.x > -60 &&
                    p.x < window.innerWidth + 60
            );

            animationId = requestAnimationFrame(animate);
        };

        animationId = requestAnimationFrame(animate);

        return () => {
            active = false;
            cancelAnimationFrame(animationId);
            window.removeEventListener("resize", resize);
            particles = [];
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fireworks-canvas"
            aria-hidden="true"
        />
    );
}
