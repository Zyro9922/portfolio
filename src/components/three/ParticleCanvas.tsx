// @ts-nocheck
"use client";

import { useEffect, useRef } from "react";

const LEAF_COUNT_DESKTOP = 60;
const LEAF_COUNT_MOBILE = 20;
const CURSOR_RADIUS = 280;
const PULL_FORCE = 0.12;
const PUSH_FORCE = 0.02; // Reduced from 0.08 for a more subtle effect

interface Leaf {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  rotSpeed: number;
  alpha: number;
}

function drawLeaf(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number, alpha: number) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);
  ctx.globalAlpha = alpha;

  ctx.beginPath();
  ctx.moveTo(0, -size);
  ctx.bezierCurveTo(size * 0.8, -size * 0.6, size * 0.8, size * 0.6, 0, size);
  ctx.bezierCurveTo(-size * 0.8, size * 0.6, -size * 0.8, -size * 0.6, 0, -size);
  ctx.fillStyle = `rgba(217, 7, 45, ${alpha})`;
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(0, -size * 0.8);
  ctx.lineTo(0, size * 0.8);
  ctx.strokeStyle = `rgba(217, 61, 102, ${alpha * 0.4})`;
  ctx.lineWidth = 0.5;
  ctx.stroke();

  ctx.globalAlpha = 1;
  ctx.restore();
}

function drawTree(ctx: CanvasRenderingContext2D, w: number, h: number, isMobile: boolean) {
  // Tree trunk starts at bottom-left, branches spread across the top
  const trunkX = w * 0.08;
  const bottom = h * 0.95;
  const treeAlpha = 0.05;

  ctx.save();
  ctx.globalAlpha = treeAlpha;
  ctx.strokeStyle = "#0D0D0D";
  ctx.lineCap = "round";

  // Trunk — slightly curved, going up from bottom-left
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(trunkX, bottom);
  ctx.bezierCurveTo(trunkX + 5, bottom - h * 0.2, trunkX - 5, bottom - h * 0.4, trunkX + 10, bottom - h * 0.55);
  ctx.stroke();

  const branchBase = bottom - h * 0.55;
  const bx = trunkX + 10;

  function drawBranch(startX: number, startY: number, angle: number, length: number, width: number, depth: number) {
    if (depth <= 0 || length < 6) return;

    const endX = startX + Math.cos(angle) * length;
    const endY = startY + Math.sin(angle) * length;

    ctx.lineWidth = width;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();

    // Red leaf clusters at tips
    if (depth <= 2) {
      ctx.globalAlpha = isMobile ? 0.04 : 0.06;
      const clusterCount = isMobile ? 2 : 4;
      for (let i = 0; i < clusterCount; i++) {
        const lx = endX + (Math.random() - 0.5) * 18;
        const ly = endY + (Math.random() - 0.5) * 14;
        ctx.beginPath();
        ctx.ellipse(lx, ly, 3 + Math.random() * 3, 5 + Math.random() * 4, Math.random() * Math.PI, 0, Math.PI * 2);
        ctx.fillStyle = "#D9072D";
        ctx.fill();
      }
      ctx.globalAlpha = treeAlpha;
    }

    const spread = 0.35 + Math.random() * 0.25;
    drawBranch(endX, endY, angle - spread, length * 0.72, width * 0.65, depth - 1);
    drawBranch(endX, endY, angle + spread, length * 0.72, width * 0.65, depth - 1);
    if (depth > 3) {
      drawBranch(endX, endY, angle + (Math.random() - 0.5) * 0.4, length * 0.55, width * 0.5, depth - 1);
    }
  }

  // MAJOR branches spreading from top-left across the top of the page
  // Up-right dominant to cover the top
  drawBranch(bx, branchBase, -Math.PI / 4, h * 0.18, 3, 6);        // diagonal right-up
  drawBranch(bx, branchBase, -Math.PI / 3, h * 0.15, 2.5, 5);      // steeper right
  drawBranch(bx, branchBase, -Math.PI / 6, h * 0.2, 2.5, 6);       // flatter right (across top)
  drawBranch(bx, branchBase, -Math.PI / 2 - 0.2, h * 0.12, 2, 5);  // up-left
  drawBranch(bx, branchBase, -Math.PI / 2 + 0.1, h * 0.14, 2, 5);  // up

  // Extra long branch reaching far right across the top
  drawBranch(bx, branchBase, -Math.PI / 8, h * 0.25, 2, 6);

  // Small downward branches on the trunk
  drawBranch(trunkX + 3, bottom - h * 0.3, -Math.PI / 3 - 0.5, h * 0.06, 1.5, 3);
  drawBranch(trunkX + 5, bottom - h * 0.4, -Math.PI / 4, h * 0.05, 1.2, 3);

  ctx.restore();
}

export function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -100, y: -100 });
  const lastMouseRef = useRef({ x: -100, y: -100 });
  const mouseVelocity = useRef(0);
  const animRef = useRef<number>(0);
  const treeCanvas = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = window.innerWidth;
    let h = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio, 2);
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);

    // Pre-render tree
    const offscreen = document.createElement("canvas");
    offscreen.width = w * dpr;
    offscreen.height = h * dpr;
    const offCtx = offscreen.getContext("2d")!;
    offCtx.scale(dpr, dpr);
    const isMobile = w < 768;
    const leafCount = isMobile ? LEAF_COUNT_MOBILE : LEAF_COUNT_DESKTOP;
    drawTree(offCtx, w, h, isMobile);
    treeCanvas.current = offscreen;

    const leaves: Leaf[] = [];
    for (let i = 0; i < leafCount; i++) {
      leaves.push({
        x: Math.random() * w * 0.6,
        y: Math.random() * h * 0.4,
        vx: (Math.random() - 0.3) * 0.4,
        vy: Math.random() * 0.4 + 0.1,
        size: Math.random() * 5 + 3,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.02,
        alpha: Math.random() * 0.4 + 0.15,
      });
    }

    const handleMouse = (e: MouseEvent) => {
      const dx = e.clientX - lastMouseRef.current.x;
      const dy = e.clientY - lastMouseRef.current.y;
      mouseVelocity.current = Math.min(Math.sqrt(dx * dx + dy * dy), 50);
      
      lastMouseRef.current.x = e.clientX;
      lastMouseRef.current.y = e.clientY;
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleTouch = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const dx = touch.clientX - lastMouseRef.current.x;
        const dy = touch.clientY - lastMouseRef.current.y;
        mouseVelocity.current = Math.min(Math.sqrt(dx * dx + dy * dy), 50);

        lastMouseRef.current.x = touch.clientX;
        lastMouseRef.current.y = touch.clientY;
        mouseRef.current.x = touch.clientX;
        mouseRef.current.y = touch.clientY;
      }
    };

    const handleResize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
      offscreen.width = w * dpr;
      offscreen.height = h * dpr;
      offCtx.scale(dpr, dpr);
      const mobile = w < 768;
      drawTree(offCtx, w, h, mobile);
    };

    window.addEventListener("mousemove", handleMouse);
    window.addEventListener("touchmove", handleTouch, { passive: true });
    window.addEventListener("resize", handleResize);

    function animate() {
      ctx.clearRect(0, 0, w, h);

      if (treeCanvas.current) {
        ctx.drawImage(treeCanvas.current, 0, 0, w, h);
      }

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Mouse velocity-dependent force
      mouseVelocity.current *= 0.95; // Decay velocity
      const vel = mouseVelocity.current;
      const attractionFactor = Math.min(vel / 5, 1); // Transition from repel to pull based on velocity
      
      for (const leaf of leaves) {
        leaf.vy += 0.003;
        leaf.vx += (Math.random() - 0.5) * 0.01;

        // Interaction with cursor
        const dx = mx - leaf.x;
        const dy = my - leaf.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < CURSOR_RADIUS && dist > 0) {
          const forceFactor = (CURSOR_RADIUS - dist) / CURSOR_RADIUS;
          
          // If mouse is moving, pull. If stationary, push away (repel)
          const pull = PULL_FORCE * attractionFactor;
          const push = PUSH_FORCE * (1 - attractionFactor);
          const totalForce = (pull - push) * forceFactor;

          leaf.vx += (dx / dist) * totalForce;
          leaf.vy += (dy / dist) * totalForce;
        }

        // Wind sway
        leaf.vx += Math.sin(Date.now() * 0.001 + leaf.y * 0.01) * 0.004;

        leaf.vx *= 0.98;
        leaf.vy *= 0.98;

        const speed = Math.sqrt(leaf.vx * leaf.vx + leaf.vy * leaf.vy);
        if (speed > 2) {
          leaf.vx = (leaf.vx / speed) * 2;
          leaf.vy = (leaf.vy / speed) * 2;
        }

        leaf.x += leaf.vx;
        leaf.y += leaf.vy;
        leaf.rotation += leaf.rotSpeed + leaf.vx * 0.04;

        // Wrap around with global distribution
        if (leaf.y > h + 20) { 
          leaf.y = -20; 
          leaf.x = Math.random() * w; // Spread across full width on respawn
        }
        if (leaf.x < -20) leaf.x = w + 20;
        if (leaf.x > w + 20) leaf.x = -20;
        if (leaf.y < -40) leaf.y = h + 20;

        drawLeaf(ctx, leaf.x, leaf.y, leaf.size, leaf.rotation, leaf.alpha);
      }

      animRef.current = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("touchmove", handleTouch);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0"
      style={{ width: "100%", height: "100%" }}
    />
  );
}
