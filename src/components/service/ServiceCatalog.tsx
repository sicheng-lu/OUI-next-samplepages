import { useMemo } from 'react';
import { OuiIcon } from '../../oui/icon';
import type { ServiceEntry, ServiceStatus } from '../../data/sampleData';
import styles from './ServiceCatalog.module.css';

export interface ServiceCatalogProps {
  services: ServiceEntry[];
  activeLatencyTab: 'P99' | 'P90' | 'P50';
  onLatencyTabChange: (tab: 'P99' | 'P90' | 'P50') => void;
  sortColumn: string | null;
  sortDirection: 'asc' | 'desc';
  onSort: (column: string) => void;
}

const LATENCY_TABS: Array<'P99' | 'P90' | 'P50'> = ['P99', 'P90', 'P50'];

const STATUS_CLASS_MAP: Record<ServiceStatus, string> = {
  healthy: styles.statusHealthy,
  warning: styles.statusWarning,
  critical: styles.statusCritical,
};

const Sparkline = ({ data, color = '#94a3b8', width = 60, height = 20 }: {
  data: number[];
  color?: string;
  width?: number;
  height?: number;
}) => {
  if (!data.length) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - ((v - min) / range) * height;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <svg className={styles.sparkline} width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
};

const getLatencyValue = (service: ServiceEntry, tab: 'P99' | 'P90' | 'P50'): number => {
  if (tab === 'P90') return service.avgLatencyP90;
  if (tab === 'P50') return service.avgLatencyP50;
  return service.avgLatencyP99;
};


const ServiceCatalog = ({
  services,
  activeLatencyTab,
  onLatencyTabChange,
  sortColumn,
  sortDirection,
  onSort,
}: ServiceCatalogProps) => {
  const sortedServices = useMemo(() => {
    if (!sortColumn) return services;
    const sorted = [...services].sort((a, b) => {
      let aVal: string | number;
      let bVal: string | number;
      switch (sortColumn) {
        case 'service':
          aVal = a.name.toLowerCase();
          bVal = b.name.toLowerCase();
          break;
        case 'latency':
          aVal = getLatencyValue(a, activeLatencyTab);
          bVal = getLatencyValue(b, activeLatencyTab);
          break;
        case 'throughput':
          aVal = a.avgThroughput;
          bVal = b.avgThroughput;
          break;
        case 'failureRatio':
          aVal = a.avgFailureRatio;
          bVal = b.avgFailureRatio;
          break;
        case 'environment':
          aVal = a.environment.toLowerCase();
          bVal = b.environment.toLowerCase();
          break;
        default:
          return 0;
      }
      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [services, sortColumn, sortDirection, activeLatencyTab]);

  const renderSortIcon = (column: string) => {
    const isActive = sortColumn === column;
    if (isActive) {
      const iconType = sortDirection === 'asc' ? 'sortUp' : 'sortDown';
      return <OuiIcon type={iconType} className={`${styles.sortIcon} ${styles.sortIconActive}`} size="s" />;
    }
    return <OuiIcon type="sortable" className={styles.sortIcon} size="s" />;
  };


  return (
    <div className={styles.container} data-testid="service-catalog">
      {/* Header with title and latency tabs */}
      <div className={styles.headerRow}>
        <h3 className={styles.sectionTitle}>Service Catalog</h3>
        <div className={styles.latencyTabsWrapper}>
          <span className={styles.latencyLabel}>Latency</span>
          <div className={styles.latencyTabs} role="tablist" aria-label="Latency percentile">
            {LATENCY_TABS.map((tab) => (
              <button
                key={tab}
                role="tab"
                aria-selected={activeLatencyTab === tab}
                className={`${styles.latencyTab} ${activeLatencyTab === tab ? styles.latencyTabActive : ''}`}
                onClick={() => onLatencyTabChange(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <table className={styles.table} data-testid="service-catalog-table">
        <thead>
          <tr>
            <th
              className={styles.sortableHeader}
              onClick={() => onSort('service')}
              data-testid="sort-service"
            >
              Service {renderSortIcon('service')}
            </th>
            <th>Correlations</th>
            <th
              className={styles.sortableHeader}
              onClick={() => onSort('latency')}
              data-testid="sort-latency"
            >
              Avg. Latency ({activeLatencyTab}) <OuiIcon type="iInCircle" className={styles.infoIcon} /> {renderSortIcon('latency')}
            </th>
            <th
              className={styles.sortableHeader}
              onClick={() => onSort('throughput')}
              data-testid="sort-throughput"
            >
              Avg. throughput <OuiIcon type="iInCircle" className={styles.infoIcon} /> {renderSortIcon('throughput')}
            </th>
            <th
              className={styles.sortableHeader}
              onClick={() => onSort('failureRatio')}
              data-testid="sort-failure-ratio"
            >
              Avg. failure ratio <OuiIcon type="iInCircle" className={styles.infoIcon} /> {renderSortIcon('failureRatio')}
            </th>
            <th
              className={styles.sortableHeader}
              onClick={() => onSort('environment')}
              data-testid="sort-environment"
            >
              Environment {renderSortIcon('environment')}
            </th>
          </tr>
        </thead>

        <tbody>
          {sortedServices.map((service) => (
            <tr key={service.name} data-testid="service-row">
              <td>
                <div className={styles.serviceCell}>
                  <span
                    className={`${styles.statusDot} ${STATUS_CLASS_MAP[service.status]}`}
                    data-testid={`status-${service.status}`}
                  />
                  <a className={styles.serviceLink} href="#">
                    {service.name}
                  </a>
                </div>
              </td>
              <td>
                <div className={styles.correlationsCell}>
                  <button
                    className={`${styles.correlationIcon} ${!service.correlationsAvailable ? styles.correlationIconDisabled : ''}`}
                    title="Filter"
                    disabled={!service.correlationsAvailable}
                    aria-label={`Filter for ${service.name}`}
                  >
                    <OuiIcon type="filter" />
                  </button>
                  <button
                    className={`${styles.correlationIcon} ${!service.correlationsAvailable ? styles.correlationIconDisabled : ''}`}
                    title="Document"
                    disabled={!service.correlationsAvailable}
                    aria-label={`Document for ${service.name}`}
                  >
                    <OuiIcon type="document" />
                  </button>
                  <button
                    className={`${styles.correlationIcon} ${!service.correlationsAvailable ? styles.correlationIconDisabled : ''}`}
                    title="Download"
                    disabled={!service.correlationsAvailable}
                    aria-label={`Download for ${service.name}`}
                  >
                    <OuiIcon type="download" />
                  </button>
                  <button
                    className={`${styles.correlationIcon} ${!service.correlationsAvailable ? styles.correlationIconDisabled : ''}`}
                    title="Stats"
                    disabled={!service.correlationsAvailable}
                    aria-label={`Stats for ${service.name}`}
                  >
                    <OuiIcon type="stats" />
                  </button>
                </div>
              </td>
              <td>
                <div className={styles.metricCell}>
                  <span className={styles.metricValue}>
                    {getLatencyValue(service, activeLatencyTab)} ms
                  </span>
                  <Sparkline data={service.latencySparkline} color="#94a3b8" />
                </div>
              </td>
              <td>
                <div className={styles.metricCell}>
                  <span className={styles.metricValue}>
                    {service.avgThroughput} req/int
                  </span>
                  <Sparkline data={service.throughputSparkline} color="#94a3b8" />
                </div>
              </td>
              <td>
                <div className={styles.metricCell}>
                  <span className={styles.metricValue}>
                    {service.avgFailureRatio}%
                  </span>
                  <Sparkline
                    data={service.failureRatioSparkline}
                    color={service.avgFailureRatio > 5 ? '#ef4444' : service.avgFailureRatio >= 1 ? '#f59e0b' : '#3b82f6'}
                  />
                </div>
              </td>
              <td>{service.environment}</td>
            </tr>
          ))}
        </tbody>
      </table>


      {/* Pagination */}
      <div className={styles.pagination} data-testid="pagination">
        <div className={styles.rowsPerPage}>
          <span>Rows per page:</span>
          <select className={styles.rowsSelect} defaultValue="10" data-testid="rows-per-page">
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
        </div>
        <div className={styles.paginationControls}>
          <button className={styles.pageButton} aria-label="Previous page">&lt;</button>
          <button className={`${styles.pageButton} ${styles.pageButtonActive}`} aria-label="Page 1">1</button>
          <button className={styles.pageButton} aria-label="Next page">&gt;</button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCatalog;