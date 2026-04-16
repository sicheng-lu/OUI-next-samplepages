import { OuiIcon } from '../../oui/icon';
import styles from './ServiceHeader.module.css';

export interface ServiceHeaderProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
}

const ServiceHeader = ({ searchValue, onSearchChange }: ServiceHeaderProps) => {
  return (
    <div className={styles.header} data-testid="service-header">
      <div className={styles.topRow}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb" data-testid="breadcrumb">
          <OuiIcon type="gear" className={styles.breadcrumbIcon} />
          <span className={styles.breadcrumbLink}>APM Observability</span>
          <span> / </span>
        </nav>
        <button className={styles.settingsButton} data-testid="apm-settings-button">
          <OuiIcon type="gear" className={styles.settingsIcon} />
          APM Settings
        </button>
      </div>

      <div className={styles.titleRow}>
        <h1 className={styles.title}>Services</h1>
      </div>

      <div className={styles.controlsRow}>
        <div className={styles.searchWrapper}>
          <OuiIcon type="search" className={styles.searchInputIcon} />
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
          <OuiIcon type="calendar" className={styles.calendarIcon} />
          <span>Last 15 minutes</span>
          <a className={styles.showDatesLink} href="#" onClick={(e) => e.preventDefault()} data-testid="show-dates-link">
            Show dates
          </a>
        </div>

        <button className={styles.refreshButton} data-testid="refresh-button">
          <OuiIcon type="refresh" className={styles.refreshIcon} />
          Refresh
        </button>
      </div>
    </div>
  );
};

export default ServiceHeader;
