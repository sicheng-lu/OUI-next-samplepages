import { useState, useCallback } from 'react';
import ServiceHeader from '../components/service/ServiceHeader';
import FilterPanel from '../components/service/FilterPanel';
import SummaryCards from '../components/service/SummaryCards';
import ServiceCatalog from '../components/service/ServiceCatalog';
import {
  SAMPLE_SERVICES,
  TOP_SERVICES_BY_FAULT_RATE,
  TOP_DEPENDENCY_PATHS,
  DEFAULT_FILTER_STATE,
} from '../data/sampleData';
import type { FilterState } from '../data/sampleData';
import styles from './ServicePage.module.css';

interface ServicePageState {
  filters: FilterState;
  latencyTab: 'P99' | 'P90' | 'P50';
  sortColumn: string | null;
  sortDirection: 'asc' | 'desc';
  searchValue: string;
}

const INITIAL_STATE: ServicePageState = {
  filters: DEFAULT_FILTER_STATE,
  latencyTab: 'P99',
  sortColumn: null,
  sortDirection: 'asc',
  searchValue: '',
};

const ServicePage = () => {
  const [state, setState] = useState<ServicePageState>(INITIAL_STATE);

  const handleSearchChange = useCallback((value: string) => {
    setState((prev) => ({ ...prev, searchValue: value }));
  }, []);

  const handleFilterChange = useCallback((filters: FilterState) => {
    setState((prev) => ({ ...prev, filters }));
  }, []);

  const handleLatencyTabChange = useCallback((tab: 'P99' | 'P90' | 'P50') => {
    setState((prev) => ({ ...prev, latencyTab: tab }));
  }, []);

  const handleSort = useCallback((column: string) => {
    setState((prev) => ({
      ...prev,
      sortColumn: column,
      sortDirection:
        prev.sortColumn === column && prev.sortDirection === 'asc' ? 'desc' : 'asc',
    }));
  }, []);

  return (
    <div className={styles.page} data-testid="service-page">
      <ServiceHeader
        searchValue={state.searchValue}
        onSearchChange={handleSearchChange}
      />
      <div className={styles.body}>
        <FilterPanel
          filters={state.filters}
          onFilterChange={handleFilterChange}
        />
        <div className={styles.mainContent}>
          <SummaryCards
            topServicesByFaultRate={TOP_SERVICES_BY_FAULT_RATE}
            topDependencyPaths={TOP_DEPENDENCY_PATHS}
          />
          <ServiceCatalog
            services={SAMPLE_SERVICES}
            activeLatencyTab={state.latencyTab}
            onLatencyTabChange={handleLatencyTabChange}
            sortColumn={state.sortColumn}
            sortDirection={state.sortDirection}
            onSort={handleSort}
          />
        </div>
      </div>
    </div>
  );
};

export default ServicePage;
