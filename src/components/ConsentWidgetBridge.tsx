import { useEffect } from 'react';

const applyConsentWidgetAdjustments = () => {
  const button = document.querySelector<HTMLElement>('.iubenda-tp-btn.iubenda-cs-preferences-link');

  if (!button) {
    return;
  }

  if (window.matchMedia('(max-width: 767px)').matches) {
    button.style.setProperty('bottom', '92px', 'important');
    button.style.setProperty('right', '12px', 'important');
  } else {
    button.style.removeProperty('bottom');
    button.style.removeProperty('right');
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
    window.addEventListener('resize', handleResize);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return null;
};
