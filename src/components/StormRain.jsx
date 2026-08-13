import React, { useRef, useEffect } from "react";

const StormRain = ({ onReveal }) => {
  const canvasRef = useRef(null);
  const wrapperRef = useRef(null);

  const RAIN_COLOR = "#b11111ff";
  const FLASH_COLOR = "#babca9";
  const DENSITY = 800;
  const SPEED_MULT = 1.0;

  const colors = [
    RAIN_COLOR,
    `color-mix(in srgb, ${RAIN_COLOR} 70%, transparent)`,
    `color-mix(in srgb, ${RAIN_COLOR} 45%, transparent)`,
    `color-mix(in srgb, ${RAIN_COLOR} 25%, transparent)`,
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;

    const ctx = canvas.getContext("2d");
    let width, height;
    let drops = [];
    let splashes = [];
    let animationId;
    let spawnTimer = 0;
    let hasRevealed = false;

    // Lightning state machine
    let lightning = {
      state: "idle",
      nextTime: Date.now() + 2000, // Flash at 2 seconds
      flickerCount: 0,
      startTime: 0,
      opacity: 0,
    };

    const resize = () => {
      const rect = wrapper.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    const createDrop = () => {
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

    const createSplash = (x, y, size) => {
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

    const drawDrop = (drop) => {
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

    const updateLightning = () => {
      const now = Date.now();

      if (lightning.state === "idle") {
        lightning.opacity = 0;
        if (now >= lightning.nextTime) {
          lightning.state = "flicker";
          lightning.startTime = now;
          lightning.flickerCount = 2 + Math.floor(Math.random() * 2);
        }
      } else if (lightning.state === "flicker") {
        const elapsed = now - lightning.startTime;
        const flickerDuration = 70;
        if (elapsed > flickerDuration * lightning.flickerCount) {
          lightning.state = "flash";
          lightning.startTime = now;
        } else {
          const cycle = elapsed % flickerDuration;
          lightning.opacity = cycle < 35 ? 0.12 + Math.random() * 0.08 : 0;
        }
      } else if (lightning.state === "flash") {
        const elapsed = now - lightning.startTime;
        const flashDuration = 50 + Math.random() * 60;
        if (elapsed > flashDuration) {
          lightning.state = "fade";
          lightning.startTime = now;
          if (onReveal && !hasRevealed) {
            hasRevealed = true;
            onReveal();
          }
        } else {
          lightning.opacity = 0.75 + Math.random() * 0.25;
        }
      } else if (lightning.state === "fade") {
        const elapsed = now - lightning.startTime;
        const fadeDuration = 300; // Fast fade for the flash
        if (elapsed > fadeDuration) {
          lightning.state = "idle";
          lightning.nextTime = now + 10000; // Prevent further flashes
          lightning.opacity = 0;
        } else {
          lightning.opacity = 0.5 * (1 - elapsed / fadeDuration);
        }
      }
    };

    const drawLightning = () => {
      if (lightning.opacity <= 0) return;
      ctx.save();
      ctx.globalAlpha = lightning.opacity;
      ctx.fillStyle = FLASH_COLOR;
      ctx.fillRect(0, 0, width, height);
      ctx.restore();
    };

    const update = () => {
      ctx.clearRect(0, 0, width, height);

      updateLightning();
      drawLightning();

      // Spawn drops
      spawnTimer++;
      const spawnRate = Math.max(1, Math.floor(3 / SPEED_MULT));
      if (spawnTimer >= spawnRate && drops.length < DENSITY) {
        const toSpawn = Math.min(6, DENSITY - drops.length);
        for (let i = 0; i < toSpawn; i++) {
          drops.push(createDrop());
        }
        spawnTimer = 0;
      }

      // Update & draw drops
      for (let i = drops.length - 1; i >= 0; i--) {
        const d = drops[i];
        d.prevY = d.y;
        d.y += d.speed;
        d.x += d.drift;

        if (d.y > height - 4) {
          createSplash(d.x, height - 2, d.size);
          drops.splice(i, 1);
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

        drawDrop(d);
      }

      // Update & draw splashes
      for (let i = splashes.length - 1; i >= 0; i--) {
        const s = splashes[i];
        s.x += s.vx;
        s.y += s.vy;
        s.vy += 0.15;
        s.life -= s.decay;

        if (s.life <= 0) {
          splashes.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = s.life * 0.6;
        ctx.strokeStyle = `color-mix(in srgb, ${RAIN_COLOR} 60%, transparent)`;
        ctx.lineWidth = Math.max(0.5, s.size * 0.1);
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(s.x - s.size * 0.3, s.y);
        ctx.lineTo(s.x + s.size * 0.3, s.y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(s.x, s.y - s.size * 0.3);
        ctx.lineTo(s.x, s.y + s.size * 0.3);
        ctx.stroke();
        ctx.restore();
      }

      if (drops.length > DENSITY) {
        drops.splice(0, drops.length - DENSITY);
      }

      animationId = requestAnimationFrame(update);
    };

    const handleResize = () => resize();
    window.addEventListener("resize", handleResize);

    resize();
    update();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
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

export default StormRain;
