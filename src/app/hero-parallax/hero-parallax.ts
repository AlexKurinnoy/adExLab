import {
  afterNextRender,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  viewChild,
} from '@angular/core';

interface Layer {
  name: string;
  x: number;
  y: number;
  w: number;
  z: number; // позиція в % від зображення
  d: number; // сила зсуву від курсора
  s: [number, number]; // розліт при скролі
  zd: number; // глибина 3D
  r: number; // поворот при скролі
}

@Component({
  selector: 'app-hero-parallax',
  templateUrl: './hero-parallax.html',
  styleUrl: './hero-parallax.css',
})
export class HeroParallax {
  readonly layers: Layer[] = [
    { name: 'blob_top', x: 53.972, y: 2.033, w: 17.334, z: 1, d: 14, s: [-30, -80], zd: -60, r: 0 },
    {
      name: 'blob_right',
      x: 80.236,
      y: 15.779,
      w: 19.764,
      z: 1,
      d: 20,
      s: [70, 10],
      zd: -80,
      r: 0,
    },
    { name: 'base', x: 0, y: 0, w: 100, z: 2, d: 6, s: [0, 0], zd: 0, r: 0 },
    { name: 'plant', x: 4.99, y: 15.102, w: 30.598, z: 3, d: 26, s: [-110, -30], zd: 50, r: -2 },
    { name: 'sphere', x: 66.12, y: 82.478, w: 8.339, z: 3, d: 36, s: [40, 110], zd: 90, r: 25 },
    { name: 'target', x: 5.187, y: 52.953, w: 10.177, z: 4, d: 32, s: [-90, 60], zd: 70, r: -4 },
    { name: 'chart', x: 67.433, y: 56.05, w: 22.127, z: 5, d: 42, s: [80, 90], zd: 110, r: 3 },
    { name: 'cart', x: 72.489, y: 8.519, w: 16.284, z: 5, d: 48, s: [90, -90], zd: 120, r: -3 },
  ];

  private readonly stage = viewChild.required<ElementRef<HTMLElement>>('stage');

  constructor() {
    const destroyRef = inject(DestroyRef);

    // Лише в браузері (SSR пропускається)
    afterNextRender(() => {
      const stage = this.stage().nativeElement;
      const imgs = Array.from(stage.querySelectorAll<HTMLElement>('img'));
      const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
      const ease = (t: number) => t * t * (3 - 2 * t);

      let tx = 0,
        ty = 0,
        mx = 0,
        my = 0,
        p = 0,
        tp = 0;
      let pointer = false,
        raf = 0,
        visible = true;

      const onMove = (e: PointerEvent) => {
        if (e.pointerType === 'touch') return;
        pointer = true;
        tx = (e.clientX / innerWidth) * 2 - 1;
        ty = (e.clientY / innerHeight) * 2 - 1;
      };
      const onLeave = () => (pointer = false);
      // 0 на початку сторінки, 1 коли hero прокручено
      const onScroll = () => {
        tp = Math.min(1, Math.max(0, scrollY / (innerHeight * 0.9)));
      };

      addEventListener('pointermove', onMove, { passive: true });
      document.addEventListener('pointerleave', onLeave);
      addEventListener('scroll', onScroll, { passive: true });
      onScroll();

      // Не рахуємо анімацію, коли блок поза екраном
      const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
      io.observe(stage);

      const frame = (t: number) => {
        raf = requestAnimationFrame(frame);
        if (!visible) return;

        if (reduce) {
          tx = ty = 0;
        } else if (!pointer) {
          tx = Math.sin(t * 0.0005) * 0.55;
          ty = Math.cos(t * 0.0007) * 0.4;
        }

        const k = reduce ? 1 : 0.08;
        mx += (tx - mx) * k;
        my += (ty - my) * k;
        p += (tp - p) * (reduce ? 1 : 0.1);

        const u = stage.clientWidth / 1523,
          e = ease(p);
        stage.style.transform = `rotateX(${-my * 4}deg) rotateY(${mx * 6}deg) scale(${1 + e * 0.05})`;

        this.layers.forEach((l, i) => {
          const x = mx * l.d * u + l.s[0] * u * e;
          const y = my * l.d * u + l.s[1] * u * e - (p - 0.5) * l.d * u * 1.2;
          imgs[i].style.transform =
            `translate3d(${x}px,${y}px,${l.zd * u}px) rotate(${l.r * e + mx * l.d * 0.05}deg)`;
        });
      };
      raf = requestAnimationFrame(frame);

      destroyRef.onDestroy(() => {
        cancelAnimationFrame(raf);
        io.disconnect();
        removeEventListener('pointermove', onMove);
        document.removeEventListener('pointerleave', onLeave);
        removeEventListener('scroll', onScroll);
      });
    });
  }
}
