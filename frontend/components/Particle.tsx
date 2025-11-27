'use client';
import React, { useEffect, useRef } from 'react';

// ========== ✨ デザイン設定エリア ✨ ==========
const CONFIG = {
  // ■ 配置とサイズ
  spacingX: 80,
  spacingY: 80,
  slantAngle: -30,
  sizePattern: [2.5, 1.5, 0.8],

  // ■ インタラクション（動き）の設定
  mouseInteractionRadius: 300,
  interactionStrength: 3.0,
  ease: 0.1,
  interactionDecay: 0.015, 
  interactionRecovery: 0.03,

  // ■ 色の設定
  hueTop: 260,    // 紫
  hueBottom: 40,  // オレンジ
  hueRandomness: 40,
  colorAnimationSpeed: 0.02, 

  // ■ スクロール設定
  scrollColorSpeed: 0.1, 

  baseLightness: 60,
  sparkleLightness: 100,

  // ■ 立方体設定
  baseCubeSize: 12,
  wireframeWidth: 1.5,
  
  // ■ ウェーブ設定
  waveSpeed: 4.0,
  waveAngle: -45,
  waveWidth: 600,
  waveInterval: 2500,

  // ■ 発光設定
  shadowBlurStrength: 50, 
};

// ヘルパー
interface Point3D { x: number; y: number; z: number; }
interface Point2D { x: number; y: number; scale: number; }
const mod = (n: number, m: number) => ((n % m) + m) % m;

// ★Propsの型定義を追加
interface ParticleBackgroundProps {
  disableInteraction?: boolean; // インタラクションを無効にするフラグ
}

const ParticleBackground: React.FC<ParticleBackgroundProps> = ({ disableInteraction = false }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  let wavePhase = 0;
  const waveRad = CONFIG.waveAngle * Math.PI / 180;
  const waveDirX = Math.cos(waveRad);
  const waveDirY = Math.sin(waveRad);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let centerX = canvas.width / 2;
    let centerY = canvas.height / 2;
    const fov = 2000;

    const project = (p: Point3D): Point2D => {
      const scale = fov / (fov + p.z);
      return {
        x: centerX + p.x * scale,
        y: centerY + p.y * scale,
        scale: scale,
      };
    };

    class Particle {
      basePos: Point3D;
      currentPos: Point3D;
      baseSize: number;
      currentSize: number;
      targetSize: number;
      
      baseHue: number;
      colorTimer: number;

      waveIntensity: number = 0;
      mouseIntensity: number = 0;
      interactionStamina: number = 1.0;

      cubeRotation: { x: number, y: number, z: number };
      baseRotationSpeed: { x: number, y: number, z: number };
      currentRotationSpeed: { x: number, y: number, z: number };

      constructor(x: number, y: number, patternIndex: number) {
        this.basePos = { x, y, z: 0 };
        this.currentPos = { ...this.basePos };
        const sizeMultiplier = CONFIG.sizePattern[patternIndex % CONFIG.sizePattern.length];
        this.baseSize = CONFIG.baseCubeSize * sizeMultiplier;
        this.currentSize = this.baseSize;
        this.targetSize = this.baseSize;

        const h = canvas!.height || window.innerHeight;
        const normalizedY = Math.min(1, Math.max(0, (y + h / 2) / h));
        const gradientHue = CONFIG.hueTop + (CONFIG.hueBottom - CONFIG.hueTop) * normalizedY;
        const randomOffset = (Math.random() - 0.5) * CONFIG.hueRandomness * 2;
        
        this.baseHue = gradientHue + randomOffset;
        this.colorTimer = Math.random() * Math.PI * 2;
        
        this.cubeRotation = { x: Math.random() * Math.PI, y: Math.random() * Math.PI, z: Math.random() * Math.PI };
        this.baseRotationSpeed = {
          x: (Math.random() - 0.5) * 0.02,
          y: (Math.random() - 0.5) * 0.02,
          z: (Math.random() - 0.5) * 0.02
        };
        this.currentRotationSpeed = { ...this.baseRotationSpeed };
      }

      update(mouse: { x: number, y: number }, currentWavePhase: number) {
        this.colorTimer += CONFIG.colorAnimationSpeed;

        const projected = project(this.currentPos);
        const dx = projected.x - mouse.x;
        const dy = projected.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // ★ disableInteraction が true の場合もインタラクション処理をスキップ
        if (!isMobile && !disableInteraction && dist < CONFIG.mouseInteractionRadius) {
            let rawIntensity = 1.0 - (dist / CONFIG.mouseInteractionRadius);
            rawIntensity = Math.pow(rawIntensity, 3);

            this.mouseIntensity = rawIntensity * this.interactionStamina;
            this.interactionStamina = Math.max(0, this.interactionStamina - CONFIG.interactionDecay);

            const force = this.mouseIntensity;
            this.targetSize = this.baseSize * (1 + force * (CONFIG.interactionStrength - 1));
            this.currentPos.z += (200 * force - this.currentPos.z) * 0.1; 

            const boost = 0.25 * force;
            this.currentRotationSpeed.x = this.baseRotationSpeed.x + boost;
            this.currentRotationSpeed.y = this.baseRotationSpeed.y + boost;
        } else {
            this.mouseIntensity = 0;
            this.interactionStamina = Math.min(1.0, this.interactionStamina + CONFIG.interactionRecovery);

            this.targetSize = this.baseSize;
            this.currentPos.x += (this.basePos.x - this.currentPos.x) * CONFIG.ease;
            this.currentPos.y += (this.basePos.y - this.currentPos.y) * CONFIG.ease;
            this.currentPos.z += (this.basePos.z - this.currentPos.z) * CONFIG.ease;
            
            this.currentRotationSpeed.x += (this.baseRotationSpeed.x - this.currentRotationSpeed.x) * 0.05;
            this.currentRotationSpeed.y += (this.baseRotationSpeed.y - this.currentRotationSpeed.y) * 0.05;
        }
        this.currentSize += (this.targetSize - this.currentSize) * CONFIG.ease;
        
        this.cubeRotation.x += this.currentRotationSpeed.x;
        this.cubeRotation.y += this.currentRotationSpeed.y;
        this.cubeRotation.z += this.baseRotationSpeed.z;

        const posOnWaveAxis = this.currentPos.x * waveDirX + this.currentPos.y * waveDirY;
        const relativePos = mod(posOnWaveAxis - currentWavePhase, CONFIG.waveInterval);
        let distFromWave = relativePos;
        if (distFromWave > CONFIG.waveInterval / 2) {
            distFromWave = CONFIG.waveInterval - distFromWave;
        }

        if (distFromWave < CONFIG.waveWidth / 2) {
            this.waveIntensity = 1.0 - (distFromWave / (CONFIG.waveWidth / 2));
            this.waveIntensity = Math.pow(this.waveIntensity, 2); 
        } else {
            this.waveIntensity = 0;
        }
      }

      draw(scrollY: number) {
        if (!ctx) return;
        const projected = project(this.currentPos);

        const timeShift = Math.sin(this.colorTimer) * 15;
        const scrollShift = scrollY * CONFIG.scrollColorSpeed; 
        const currentHue = this.baseHue + timeShift + scrollShift;

        let targetSaturation = 80;
        let targetLightness = CONFIG.baseLightness;
        let lineWidth = CONFIG.wireframeWidth;
        let alpha = 0.7;

        const finalIntensity = Math.max(this.waveIntensity, this.mouseIntensity);

        if (finalIntensity > 0) {
            targetSaturation *= (1.0 - finalIntensity);
            targetLightness += (CONFIG.sparkleLightness - targetLightness) * finalIntensity;
            lineWidth += (CONFIG.wireframeWidth * 2.0) * finalIntensity; 
            alpha = 1.0;
        }

        const depthFactor = projected.scale;
        const strokeColor = `hsla(${currentHue}, ${targetSaturation}%, ${targetLightness}%, ${alpha * depthFactor})`;

        ctx.save();
        ctx.globalCompositeOperation = 'lighter';

        if (finalIntensity > 0.1) {
          ctx.shadowBlur = CONFIG.shadowBlurStrength * finalIntensity * depthFactor;
          ctx.shadowColor = strokeColor;
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = lineWidth * depthFactor;
        ctx.lineCap = 'round';

        const fillOpacity = finalIntensity > 0.3 ? (finalIntensity - 0.3) * 0.6 : 0;
        const fillColor = `hsla(${currentHue}, ${targetSaturation}%, ${targetLightness}%, ${fillOpacity})`;

        this.drawCube(projected.x, projected.y, this.currentSize * projected.scale, fillColor, fillOpacity > 0);
        ctx.restore();
      }

      drawCube(cx: number, cy: number, size: number, fillColor: string, doFill: boolean) {
        if(!ctx) return;
        const s = size / 2;
        const v: Point3D[] = [
          {x:-s, y:-s, z:-s}, {x: s, y:-s, z:-s}, {x: s, y: s, z:-s}, {x:-s, y: s, z:-s},
          {x:-s, y:-s, z: s}, {x: s, y:-s, z: s}, {x: s, y: s, z: s}, {x:-s, y: s, z: s}
        ];
        const rv = v.map(p => {
          let y = p.y * Math.cos(this.cubeRotation.x) - p.z * Math.sin(this.cubeRotation.x);
          let z = p.y * Math.sin(this.cubeRotation.x) + p.z * Math.cos(this.cubeRotation.x);
          p.y = y; p.z = z;
          let x = p.x * Math.cos(this.cubeRotation.y) - p.z * Math.sin(this.cubeRotation.y);
          z = p.x * Math.sin(this.cubeRotation.y) + p.z * Math.cos(this.cubeRotation.y);
          p.x = x; p.z = z;
          x = p.x * Math.cos(this.cubeRotation.z) - p.y * Math.sin(this.cubeRotation.z);
          y = p.x * Math.sin(this.cubeRotation.z) + p.y * Math.cos(this.cubeRotation.z);
          return { x: x + cx, y: y + cy };
        });

        if (doFill) {
            ctx.fillStyle = fillColor;
            ctx.beginPath();
            ctx.moveTo(rv[0].x, rv[0].y);
            [1, 2, 3, 0, 4, 5, 6, 7, 4].forEach(i => ctx.lineTo(rv[i].x, rv[i].y));
            ctx.fill();
        }

        const edges = [[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]];
        ctx.beginPath();
        edges.forEach(e => {
            ctx.moveTo(rv[e[0]].x, rv[e[0]].y);
            ctx.lineTo(rv[e[1]].x, rv[e[1]].y);
        });
        ctx.stroke();
      }
    }

    const particles: Particle[] = [];
    const createParticles = () => {
      if (!canvas) return;
      particles.length = 0;

      const diagonal = Math.sqrt(canvas.width * canvas.width + canvas.height * canvas.height);
      const cols = Math.ceil(diagonal / CONFIG.spacingX) + 4;
      const rows = Math.ceil(diagonal / CONFIG.spacingY) + 4;

      const slantRad = CONFIG.slantAngle * Math.PI / 180;
      const cos = Math.cos(slantRad);
      const sin = Math.sin(slantRad);
      
      const offsetX = (cols - 1) * CONFIG.spacingX / 2;
      const offsetY = (rows - 1) * CONFIG.spacingY / 2;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          let x = i * CONFIG.spacingX - offsetX;
          let y = j * CONFIG.spacingY - offsetY;
          let rotatedX = x * cos - y * sin;
          let rotatedY = x * sin + y * cos;
          const patternIndex = i + (rows - 1 - j);
          particles.push(new Particle(rotatedX, rotatedY, patternIndex));
        }
      }
    };

    const setCanvasSize = () => {
        if (!container || !canvas) return;
        const rect = container.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
        centerX = canvas.width / 2;
        centerY = canvas.height / 2;
        createParticles();
    };

    setCanvasSize();

    const resizeObserver = new ResizeObserver(() => {
        setCanvasSize();
    });
    resizeObserver.observe(container);

    let animationFrameId: number;
    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      wavePhase += CONFIG.waveSpeed;
      const scrollY = window.scrollY;
      const mouse = mouseRef.current;
      
      particles.forEach(p => {
        p.update(mouse, wavePhase);
        p.draw(scrollY);
      });
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    // ★ disableInteraction が true の場合はイベントリスナーを登録しない
    if (!isMobile && !disableInteraction) {
      const handleMouseMove = (event: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        mouseRef.current = { x: event.clientX - rect.left, y: event.clientY - rect.top };
      };
      const handleMouseLeave = () => {
        mouseRef.current = { x: -9999, y: -9999 };
      };
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseleave', handleMouseLeave);
      
      return () => {
        resizeObserver.disconnect();
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseleave', handleMouseLeave);
        cancelAnimationFrame(animationFrameId);
      };
    } else {
      return () => {
        resizeObserver.disconnect();
        cancelAnimationFrame(animationFrameId);
      };
    }

  }, [isMobile, disableInteraction]); // disableInteraction も依存配列に追加

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full overflow-hidden">
      <canvas 
        ref={canvasRef} 
        className="block w-full h-full"
        style={{ pointerEvents: 'none' }}
      />
    </div>
  );
};

export default ParticleBackground;