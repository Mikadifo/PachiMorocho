import { useRef, useEffect } from "react";

const RainStorm = () => {
  const canvasRef = useRef(null);
  const wrapperRef = useRef(null);
  const stateRef = useRef({
    drops: [],
    splashes: [],
    width: 0,
    height: 0,
    animationId: null,
    spawnTimer: 0,
  });

  const RAIN_COLOR = "#2e120f";
  const DENSITY = 800;
  const SPEED_MULT = 1.0;

  const colors = [
    RAIN_COLOR,
    `color-mix(in srgb, ${RAIN_COLOR} 70%, transparent)`,
    `color-mix(in srgb, ${RAIN_COLOR} 45%, transparent)`,
    `color-mix(in srgb, ${RAIN_COLOR} 25%, transparent)`,
  ];

  const resize = (canvas, wrapper) => {
    const rect = wrapper.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    const ctx = canvas.getContext("2d");
    ctx.scale(dpr, dpr);
    stateRef.current.width = rect.width;
    stateRef.current.height = rect.height;
  };

  const createDrop = (width) => {
    const depth = Math.random();
    const size = 6 + depth * 14;
    const opacity = 0.6 + depth * 0.4;
    const baseSpeed = (8 + Math.random() * 12 + depth * 15) * SPEED_MULT;
    const wind = SPEED_MULT * 1.5;
    const drift = wind + (Math.random() - 0.5) * 1.5;
    const colorIdx = Math.floor((1 - depth) * colors.length);

    return {
      x: Math.random() * (width + 100) - 50,
      y: -size * 2,
      size,
      speed: baseSpeed,
      drift,
      opacity,
      color: colors[Math.min(colorIdx, colors.length - 1)],
      prevY: -size * 2,
    };
  };

  const createSplash = (splashes, x, y, size) => {
    const count = 2 + Math.floor(Math.random() * 3);
    for (let i = 0; i < count; i++) {
      splashes.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 4,
        vy: -Math.random() * 3 - 1,
        life: 1.0,
        decay: 0.04 + Math.random() * 0.04,
        size: size * 0.3,
      });
    }
  };

  const drawDrop = (ctx, drop) => {
    ctx.save();
    ctx.globalAlpha = drop.opacity;

    const s = drop.size;
    const t = Math.max(1, s * 0.08);
    const slant = drop.drift * 2;

    ctx.strokeStyle = drop.color;
    ctx.lineWidth = t;
    ctx.lineCap = "round";

    // Vertical bar
    ctx.beginPath();
    ctx.moveTo(drop.x, drop.y - s * 0.9);
    ctx.lineTo(drop.x + slant, drop.y + s * 0.9);
    ctx.stroke();

    // Horizontal bar
    ctx.beginPath();
    ctx.moveTo(drop.x - s * 0.35, drop.y);
    ctx.lineTo(drop.x + s * 0.35 + slant * 0.3, drop.y);
    ctx.stroke();

    ctx.restore();
  };

  const drawSplash = (ctx, splash, color) => {
    ctx.save();
    ctx.globalAlpha = splash.life * 0.6;
    ctx.strokeStyle = `color-mix(in srgb, ${color} 60%, transparent)`;
    ctx.lineWidth = Math.max(0.5, splash.size * 0.1);
    ctx.lineCap = "round";

    ctx.beginPath();
    ctx.moveTo(splash.x - splash.size * 0.3, splash.y);
    ctx.lineTo(splash.x + splash.size * 0.3, splash.y);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(splash.x, splash.y - splash.size * 0.3);
    ctx.lineTo(splash.x, splash.y + splash.size * 0.3);
    ctx.stroke();

    ctx.restore();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;

    const ctx = canvas.getContext("2d");
    const state = stateRef.current;

    resize(canvas, wrapper);

    const update = () => {
      const { width, height } = state;
      ctx.clearRect(0, 0, width, height);

      // Spawn drops
      state.spawnTimer++;
      const spawnRate = Math.max(1, Math.floor(3 / SPEED_MULT));
      if (state.spawnTimer >= spawnRate && state.drops.length < DENSITY) {
        const toSpawn = Math.min(6, DENSITY - state.drops.length);
        for (let i = 0; i < toSpawn; i++) {
          state.drops.push(createDrop(width));
        }
        state.spawnTimer = 0;
      }

      // Update & draw drops
      for (let i = state.drops.length - 1; i >= 0; i--) {
        const d = state.drops[i];
        d.prevY = d.y;
        d.y += d.speed;
        d.x += d.drift;

        if (d.y > height - 4) {
          createSplash(state.splashes, d.x, height - 2, d.size);
          state.drops.splice(i, 1);
          continue;
        }

        // Motion streak
        ctx.save();
        ctx.globalAlpha = d.opacity * 0.3;
        ctx.strokeStyle = d.color;
        ctx.lineWidth = Math.max(0.5, d.size * 0.06);
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(d.x, d.prevY);
        ctx.lineTo(d.x + d.drift, d.y);
        ctx.stroke();
        ctx.restore();

        drawDrop(ctx, d);
      }

      // Update & draw splashes
      for (let i = state.splashes.length - 1; i >= 0; i--) {
        const s = state.splashes[i];
        s.x += s.vx;
        s.y += s.vy;
        s.vy += 0.15;
        s.life -= s.decay;

        if (s.life <= 0) {
          state.splashes.splice(i, 1);
          continue;
        }

        drawSplash(ctx, s, RAIN_COLOR);
      }

      if (state.drops.length > DENSITY) {
        state.drops.splice(0, state.drops.length - DENSITY);
      }

      state.animationId = requestAnimationFrame(update);
    };

    const handleResize = () => resize(canvas, wrapper);
    window.addEventListener("resize", handleResize);

    state.animationId = requestAnimationFrame(update);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (state.animationId) cancelAnimationFrame(state.animationId);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      style={{
        width: "100%",
        height: "420px",
        position: "relative",
        overflow: "hidden",
        borderRadius: "12px",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          display: "block",
        }}
      />
    </div>
  );
};

export default RainStorm;
