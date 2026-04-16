import styles from './ServiceHeader.module.css';

export interface ServiceHeaderProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
}

const OuiIcon = ({ name, className }: { name: string; className?: string }) => (
  <img src={`/icons/${name}.svg`} alt="" aria-hidden="true" className={className} width="16" height="16" />
);

const ServiceHeader = ({ searchValue, onSearchChange }: ServiceHeaderProps) => {
  return (
    <div className={styles.header} data-testid="service-header">
      <div className={styles.topRow}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb" data-testid="breadcrumb">
          <OuiIcon name="gear" className={styles.breadcrumbIcon} />
          <span className={styles.breadcrumbLink}>APM Observability</span>
          <span> / </span>
        </nav>
        <button className={styles.settingsButton} data-testid="apm-settings-button">
          <OuiIcon name="gear" className={styles.settingsIcon} />
          APM Settings
        </button>
      </div>

      <div className={styles.titleRow}>
        <h1 className={styles.title}>Services</h1>
      </div>

      <div className={styles.controlsRow}>
        <div className={styles.searchWrapper}>
          <OuiIcon name="search" className={styles.searchInputIcon} />
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Filter by service name or environment"
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            data-testid="service-search-input"
          />
        </div>

        <div className={styles.datePickerRange} data-testid="time-range-selector">
          <OuiIcon name="calendar" className={styles.calendarIcon} />
          <span>Last 15 minutes</span>
          <a className={styles.showDatesLink} href="#" onClick={(e) => e.preventDefault()} data-testid="show-dates-link">
            Show dates
          </a>
        </div>

        <button className={styles.refreshButton} data-testid="refresh-button">
          <img src="/icons/refresh.svg" alt="" aria-hidden="true" className={styles.refreshIcon} width="14" height="14" style={{ filter: 'brightness(0) invert(1)' }} />
          Refresh
        </button>
      </div>
    </div>
  );
};

export default ServiceHeader;
