import { useEffect } from 'react';

const setImportant = (element: HTMLElement, styles: Record<string, string>) => {
  Object.entries(styles).forEach(([property, value]) => {
    element.style.setProperty(property, value, 'important');
  });
};

const resetProperties = (element: HTMLElement, properties: string[]) => {
  properties.forEach((property) => {
    element.style.removeProperty(property);
  });
};

const applyConsentWidgetAdjustments = () => {
  const isMobile = window.matchMedia('(max-width: 767px)').matches;
  const banner = document.querySelector<HTMLElement>('#iubenda-cs-banner');
  const container = document.querySelector<HTMLElement>('.iubenda-cs-container');
  const content = document.querySelector<HTMLElement>('.iubenda-cs-content');
  const button = document.querySelector<HTMLElement>('.iubenda-tp-btn.iubenda-cs-preferences-link');

  if (banner) {
    setImportant(banner, {
      top: 'auto',
      bottom: isMobile ? '5.5rem' : '1.5rem',
      left: isMobile ? '0.5rem' : '50%',
      right: isMobile ? '0.5rem' : 'auto',
      width: isMobile ? 'auto' : 'min(52rem, calc(100vw - 3rem))',
      'max-width': isMobile ? 'none' : '52rem',
      margin: '0',
      transform: isMobile ? 'none' : 'translateX(-50%)',
      'border-radius': isMobile ? '1.5rem' : '1.75rem',
      overflow: 'hidden',
      'box-shadow': '0 26px 80px -42px rgba(17, 24, 21, 0.42)',
    });
  }

  if (container) {
    setImportant(container, {
      width: '100%',
      'max-width': '100%',
    });
  }

  if (content) {
    setImportant(content, {
      'max-height': isMobile ? 'min(46svh, 25rem)' : 'min(44svh, 21rem)',
      overflow: 'auto',
      'border-radius': isMobile ? '1.5rem' : '1.75rem',
      'overscroll-behavior': 'contain',
    });
  }

  if (button) {
    if (isMobile) {
      setImportant(button, {
        bottom: '5.75rem',
        right: '0.75rem',
      });
    } else {
      resetProperties(button, ['bottom', 'right']);
    }
  }
};

export const ConsentWidgetBridge = () => {
  useEffect(() => {
    const observer = new MutationObserver(() => {
      applyConsentWidgetAdjustments();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: false,
    });

    const handleResize = () => applyConsentWidgetAdjustments();

    applyConsentWidgetAdjustments();
    window.requestAnimationFrame(applyConsentWidgetAdjustments);
    const timeoutId = window.setTimeout(applyConsentWidgetAdjustments, 600);
    window.addEventListener('resize', handleResize);

    return () => {
      observer.disconnect();
      window.clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return null;
};
