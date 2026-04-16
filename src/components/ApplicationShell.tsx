import { useState, useEffect, useCallback } from 'react';
import { Outlet } from 'react-router-dom';
import LeftNavigation from './LeftNavigation';
import ErrorBoundary from './ErrorBoundary';
import styles from './ApplicationShell.module.css';

const MOBILE_BREAKPOINT = '(min-width: 768px)';

const ApplicationShell = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    return window.matchMedia(MOBILE_BREAKPOINT).matches;
  });
  const [isDesktop, setIsDesktop] = useState(() => {
    return window.matchMedia(MOBILE_BREAKPOINT).matches;
  });

  useEffect(() => {
    const mql = window.matchMedia(MOBILE_BREAKPOINT);

    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      const matches = e.matches;
      setIsDesktop(matches);
      setIsSidebarOpen(matches);
    };

    // Listen for viewport changes
    mql.addEventListener('change', handleChange as (e: MediaQueryListEvent) => void);

    return () => {
      mql.removeEventListener('change', handleChange as (e: MediaQueryListEvent) => void);
    };
  }, []);

  const handleToggle = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  const handleBackdropClick = useCallback(() => {
    if (!isDesktop) {
      setIsSidebarOpen(false);
    }
  }, [isDesktop]);

  const showToggleButton = !isDesktop && !isSidebarOpen;
  const showBackdrop = !isDesktop && isSidebarOpen;

  return (
    <div className={styles.shell} data-testid="application-shell">
      {/* Backdrop overlay for mobile sidebar */}
      {showBackdrop && (
        <div
          className={styles.backdrop}
          onClick={handleBackdropClick}
          data-testid="sidebar-backdrop"
          aria-hidden="true"
        />
      )}

      <div className={!isDesktop && isSidebarOpen ? styles.sidebarOverlay : undefined}>
        <LeftNavigation isOpen={isSidebarOpen} onToggle={handleToggle} />
      </div>

      <main className={styles.content} data-testid="content-area">
        {showToggleButton && (
          <button
            className={styles.menuToggle}
            onClick={handleToggle}
            aria-label="Open navigation"
            data-testid="sidebar-toggle"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path d="M2 4.5h16v1.5H2V4.5zm0 5h16v1.5H2v-1.5zm0 5h16v1.5H2v-1.5z" />
            </svg>
          </button>
        )}
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </main>
    </div>
  );
};

export default ApplicationShell;
