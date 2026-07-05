import { useEffect, useRef } from "react";

const SynthwaveGrid = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let offset = 0;

    // Track mouse coordinates (normalized 0 to 1)
    const mousePos = { x: 0.5, y: 0.5 };
    const targetMousePos = { x: 0.5, y: 0.5 };
    let currentVanishX = canvas.offsetWidth / 2;

    const resize = () => {
      if (canvas.width !== canvas.offsetWidth || canvas.height !== canvas.offsetHeight) {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMousePos.x = (e.clientX - rect.left) / rect.width;
      targetMousePos.y = (e.clientY - rect.top) / rect.height;
    };

    window.addEventListener("mousemove", handleMouseMove);
    resize();

    const draw = () => {
      resize();
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);

      // Lerp mouse positions for extra smoothness
      mousePos.x += (targetMousePos.x - mousePos.x) * 0.05;
      mousePos.y += (targetMousePos.y - mousePos.y) * 0.05;

      const horizon = height * 0.5;
      const lines = 20;
      const cols = 30;

      // Horizontal perspective lines
      ctx.strokeStyle = "rgba(255, 110, 199, 0.2)";
      ctx.lineWidth = 1;

      for (let i = 0; i <= lines; i++) {
        const t = i / lines;
        const y = horizon + (height - horizon) * Math.pow(t, 1.5);
        const adjustedY = y + ((offset * Math.pow(t, 1.5) * (height - horizon) / lines) % ((height - horizon) / lines));
        
        if (adjustedY > horizon && adjustedY <= height) {
          ctx.beginPath();
          ctx.moveTo(0, adjustedY);
          ctx.lineTo(width, adjustedY);
          ctx.stroke();
        }
      }

      // Vertical converging lines (with parallax vanishX shift)
      ctx.strokeStyle = "rgba(0, 240, 255, 0.15)";
      const targetVanishX = width / 2 + (mousePos.x - 0.5) * 120; // parallax shift
      currentVanishX += (targetVanishX - currentVanishX) * 0.05;

      const vanishX = currentVanishX;
      for (let i = 0; i <= cols; i++) {
        const x = (i / cols) * width;
        ctx.beginPath();
        ctx.moveTo(vanishX, horizon);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Horizon glow
      const grad = ctx.createLinearGradient(0, horizon - 40, 0, horizon + 10);
      grad.addColorStop(0, "transparent");
      grad.addColorStop(0.5, "rgba(255, 110, 199, 0.1)");
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.fillRect(0, horizon - 40, width, 50);

      // Cursor-reactive spotlight glow
      const mousePixelX = mousePos.x * width;
      const mousePixelY = mousePos.y * height;
      const radialGlow = ctx.createRadialGradient(
        mousePixelX,
        mousePixelY,
        0,
        mousePixelX,
        mousePixelY,
        220
      );
      radialGlow.addColorStop(0, "rgba(0, 240, 255, 0.08)");
      radialGlow.addColorStop(0.5, "rgba(255, 110, 199, 0.03)");
      radialGlow.addColorStop(1, "transparent");
      ctx.fillStyle = radialGlow;
      ctx.fillRect(0, 0, width, height);

      offset += 0.005;
      animationId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.6 }}
    />
  );
};

export default SynthwaveGrid;
