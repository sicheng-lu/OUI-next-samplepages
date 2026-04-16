import { NavLink } from 'react-router-dom';
import { OuiIcon } from '../oui/icon';
import styles from './LeftNavigation.module.css';

export interface LeftNavigationProps {
  isOpen: boolean;
  onToggle: () => void;
}

export interface NavItemConfig {
  label: string;
  path: string;
  icon: string;
}

export const NAV_ITEMS: NavItemConfig[] = [
  { label: 'Discover (wip)', path: '/discover', icon: 'discoverApp' },
  { label: 'Service', path: '/service', icon: 'monitoringApp' },
  { label: 'Thread (wip)', path: '/chat', icon: 'chatApp' },
];

const LeftNavigation = ({ isOpen, onToggle }: LeftNavigationProps) => {
  const sidebarClass = `${styles.sidebar}${!isOpen ? ` ${styles.sidebarCollapsed}` : ''}`;

  return (
    <nav className={sidebarClass} aria-label="Main navigation" data-testid="left-navigation">
      <div className={styles.topSection}>
        {/* Header area: logo + collapse toggle */}
        <div className={styles.headerSection}>
          <div className={styles.logoArea}>
            <div className={styles.logo}>
              <img
                className={styles.logoMark}
                src={`${import.meta.env.BASE_URL}opensearch_mark_on_light.svg`}
                alt="OpenSearch logo"
              />
            </div>
            <button
              className={styles.collapseToggle}
              onClick={onToggle}
              aria-label={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
              data-testid="collapse-toggle"
            >
              <OuiIcon type="menuLeft" className={styles.bottomIconSvg} />
            </button>
          </div>

          {/* Decorative search input */}
          <div className={styles.searchArea}>
            <div className={styles.searchInput} role="presentation" data-testid="nav-search-input">
              <OuiIcon type="search" className={styles.searchIcon} />
              <span>Search the menu</span>
            </div>
          </div>
        </div>

        {/* Horizontal rule */}
        <div className={styles.divider} />

        {/* Navigation items */}
        <div className={styles.navItemsContainer} data-testid="nav-items">
          {/* Common items section */}
          <div className={styles.navSection}>
            {NAV_ITEMS.map((item) => {
              const isDisabled = item.label.includes('(wip)');
              if (isDisabled) {
                return (
                  <span
                    key={item.path}
                    className={`${styles.navLink} ${styles.navLinkDisabled}`}
                    data-testid={`nav-item-${item.label.toLowerCase()}`}
                  >
                    <span>{item.label}</span>
                  </span>
                );
              }
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `${styles.navLink}${isActive ? ` ${styles.navLinkActive}` : ''}`
                  }
                  data-testid={`nav-item-${item.label.toLowerCase()}`}
                >
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom footer bar */}
      <div className={styles.bottomBar} data-testid="bottom-icon-bar">
        <div className={styles.bottomBarIcons}>
          <button className={styles.bottomIcon} aria-label="Home">
            <OuiIcon type="home" className={styles.bottomIconSvg} />
          </button>
          <button className={styles.bottomIcon} aria-label="Workspace selector">
            <OuiIcon type="apps" className={styles.bottomIconSvg} />
          </button>
          <button className={styles.bottomIcon} aria-label="Settings">
            <OuiIcon type="gear" className={styles.bottomIconSvg} />
          </button>
          <button className={styles.bottomIcon} aria-label="Console">
            <OuiIcon type="console" className={styles.bottomIconSvg} />
          </button>
          <button className={styles.bottomIcon} aria-label="Help">
            <OuiIcon type="questionInCircle" className={styles.bottomIconSvg} />
          </button>
          {/* Avatar */}
          <div className={styles.avatar} aria-label="User profile">OS</div>
        </div>
      </div>
    </nav>
  );
};

export default LeftNavigation;
