import { useEffect } from 'react';

// One delegated pointer listener drives the radial-fill origin for every `.btn`
// on the site (the magnetic/expanding button effect). The circle grows from the
// exact point the cursor enters, and retracts toward where it leaves.
// Ghost/line variants use a clip-path wipe instead and are excluded here.
const SELECTOR = '.btn:not(.line):not(.ghost)';

export const ButtonFX = () => {
  useEffect(() => {
    const setOrigin = (btn: HTMLElement, e: PointerEvent) => {
      const r = btn.getBoundingClientRect();
      btn.style.setProperty('--bx', `${e.clientX - r.left}px`);
      btn.style.setProperty('--by', `${e.clientY - r.top}px`);
      btn.style.setProperty('--br', `${Math.hypot(r.width, r.height) * 1.05}px`);
    };

    const onOver = (e: PointerEvent) => {
      const btn = (e.target as HTMLElement | null)?.closest(SELECTOR) as HTMLElement | null;
      if (!btn) return;
      const rel = e.relatedTarget as Node | null;
      if (rel && btn.contains(rel)) return; // ignore moves within the button
      setOrigin(btn, e);
    };

    const onOut = (e: PointerEvent) => {
      const btn = (e.target as HTMLElement | null)?.closest(SELECTOR) as HTMLElement | null;
      if (!btn) return;
      const rel = e.relatedTarget as Node | null;
      if (rel && btn.contains(rel)) return; // still inside → not a real exit
      setOrigin(btn, e); // retract toward the exit point
    };

    document.addEventListener('pointerover', onOver);
    document.addEventListener('pointerout', onOut);
    return () => {
      document.removeEventListener('pointerover', onOver);
      document.removeEventListener('pointerout', onOut);
    };
  }, []);

  return null;
};
