import { useState } from 'react';
import { OuiIcon } from '../../oui/icon';
import type { FilterState } from '../../data/sampleData';
import { FAILURE_RATIO_LEGEND } from '../../data/sampleData';
import styles from './FilterPanel.module.css';

export interface FilterPanelProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

interface SectionState {
  environment: boolean;
  latency: boolean;
  throughput: boolean;
  failureRatio: boolean;
  attributes: boolean;
}

const ChevronIcon = ({ expanded }: { expanded: boolean }) => (
  <svg
    className={`${styles.chevron} ${expanded ? styles.chevronExpanded : ''}`}
    viewBox="0 0 16 16"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M4.427 5.427a.75.75 0 011.06-.073L8 7.585l2.513-2.231a.75.75 0 11.997 1.122l-3 2.662a.75.75 0 01-.997 0l-3-2.662a.75.75 0 01-.086-1.049z" />
  </svg>
);

const LEGEND_DOT_STYLES: Record<string, string> = {
  blue: styles.legendDotBlue,
  orange: styles.legendDotOrange,
  red: styles.legendDotRed,
};


const FilterPanel = ({ filters, onFilterChange }: FilterPanelProps) => {
  const [sections, setSections] = useState<SectionState>({
    environment: true,
    latency: true,
    throughput: true,
    failureRatio: true,
    attributes: true,
  });
  const [attributeSearch, setAttributeSearch] = useState('');

  const toggleSection = (section: keyof SectionState) => {
    setSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleEnvironmentChange = (env: string, checked: boolean) => {
    onFilterChange({
      ...filters,
      environments: { ...filters.environments, [env]: checked },
    });
  };

  const handleLatencyChange = (index: 0 | 1, value: number) => {
    const clamped = Math.max(4, Math.min(443, value));
    const newRange: [number, number] = [...filters.latencyRange] as [number, number];
    newRange[index] = clamped;
    if (newRange[0] > newRange[1]) {
      newRange[index === 0 ? 1 : 0] = clamped;
    }
    onFilterChange({ ...filters, latencyRange: newRange });
  };

  const handleThroughputChange = (index: 0 | 1, value: number) => {
    const clamped = Math.max(8, Math.min(310, value));
    const newRange: [number, number] = [...filters.throughputRange] as [number, number];
    newRange[index] = clamped;
    if (newRange[0] > newRange[1]) {
      newRange[index === 0 ? 1 : 0] = clamped;
    }
    onFilterChange({ ...filters, throughputRange: newRange });
  };

  const handleAttributeChange = (attr: string, checked: boolean) => {
    onFilterChange({
      ...filters,
      attributes: { ...filters.attributes, [attr]: checked },
    });
  };

  const handleSelectAll = () => {
    const allTrue = Object.fromEntries(
      Object.keys(filters.attributes).map((k) => [k, true])
    );
    onFilterChange({ ...filters, attributes: allTrue });
  };

  const handleClearAll = () => {
    const allFalse = Object.fromEntries(
      Object.keys(filters.attributes).map((k) => [k, false])
    );
    onFilterChange({ ...filters, attributes: allFalse });
  };

  const latencyFillLeft = ((filters.latencyRange[0] - 4) / (443 - 4)) * 100;
  const latencyFillWidth = ((filters.latencyRange[1] - filters.latencyRange[0]) / (443 - 4)) * 100;
  const throughputFillLeft = ((filters.throughputRange[0] - 8) / (310 - 8)) * 100;
  const throughputFillWidth = ((filters.throughputRange[1] - filters.throughputRange[0]) / (310 - 8)) * 100;

  const filteredAttributes = Object.entries(filters.attributes).filter(([attr]) =>
    attr.toLowerCase().includes(attributeSearch.toLowerCase())
  );


  return (
    <aside className={styles.panel} data-testid="filter-panel">
      {/* Panel header */}
      <div className={styles.panelHeader}>
        <h2 className={styles.panelTitle}>Filters</h2>
        <OuiIcon
          type="controlsHorizontal"
          className={styles.collapseIcon}
        />
      </div>

      {/* Environment section */}
      <div className={styles.section} data-testid="filter-section-environment">
        <div
          className={styles.sectionHeader}
          onClick={() => toggleSection('environment')}
          role="button"
          aria-expanded={sections.environment}
          data-testid="filter-section-header-environment"
        >
          <span className={styles.sectionLabel}>Environment</span>
          <ChevronIcon expanded={sections.environment} />
        </div>
        {sections.environment && (
          <div className={styles.sectionContent} data-testid="filter-section-content-environment">
            {Object.entries(filters.environments).map(([env, checked]) => (
              <label key={env} className={styles.checkboxItem}>
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={(e) => handleEnvironmentChange(env, e.target.checked)}
                />
                <span className={styles.checkboxLabel}>{env}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Latency section */}
      <div className={styles.section} data-testid="filter-section-latency">
        <div
          className={styles.sectionHeader}
          onClick={() => toggleSection('latency')}
          role="button"
          aria-expanded={sections.latency}
          data-testid="filter-section-header-latency"
        >
          <span className={styles.sectionLabel}>Latency</span>
          <ChevronIcon expanded={sections.latency} />
        </div>
        {sections.latency && (
          <div className={styles.sectionContent} data-testid="filter-section-content-latency">
            <div className={styles.rangeGroup}>
              <div className={styles.rangeTrack}>
                <div
                  className={styles.rangeFill}
                  style={{ left: `${latencyFillLeft}%`, width: `${latencyFillWidth}%` }}
                />
                <div className={styles.rangeHandle} style={{ left: `${latencyFillLeft}%` }} />
                <div className={styles.rangeHandle} style={{ left: `${latencyFillLeft + latencyFillWidth}%` }} />
              </div>
              <div className={styles.rangeInputs}>
                <input
                  type="number"
                  className={styles.rangeInput}
                  min={4}
                  max={443}
                  value={filters.latencyRange[0]}
                  onChange={(e) => handleLatencyChange(0, Number(e.target.value))}
                  aria-label="Latency minimum"
                />
                <span className={styles.rangeSeparator}>to</span>
                <input
                  type="number"
                  className={styles.rangeInput}
                  min={4}
                  max={443}
                  value={filters.latencyRange[1]}
                  onChange={(e) => handleLatencyChange(1, Number(e.target.value))}
                  aria-label="Latency maximum"
                />
              </div>
              <div className={styles.rangeText}>
                {filters.latencyRange[0].toFixed(2)}ms - {filters.latencyRange[1].toFixed(2)}ms
              </div>
            </div>
          </div>
        )}
      </div>


      {/* Throughput section */}
      <div className={styles.section} data-testid="filter-section-throughput">
        <div
          className={styles.sectionHeader}
          onClick={() => toggleSection('throughput')}
          role="button"
          aria-expanded={sections.throughput}
          data-testid="filter-section-header-throughput"
        >
          <span className={styles.sectionLabel}>Throughput</span>
          <ChevronIcon expanded={sections.throughput} />
        </div>
        {sections.throughput && (
          <div className={styles.sectionContent} data-testid="filter-section-content-throughput">
            <div className={styles.rangeGroup}>
              <div className={styles.rangeTrack}>
                <div
                  className={styles.rangeFill}
                  style={{ left: `${throughputFillLeft}%`, width: `${throughputFillWidth}%` }}
                />
                <div className={styles.rangeHandle} style={{ left: `${throughputFillLeft}%` }} />
                <div className={styles.rangeHandle} style={{ left: `${throughputFillLeft + throughputFillWidth}%` }} />
              </div>
              <div className={styles.rangeInputs}>
                <input
                  type="number"
                  className={styles.rangeInput}
                  min={8}
                  max={310}
                  value={filters.throughputRange[0]}
                  onChange={(e) => handleThroughputChange(0, Number(e.target.value))}
                  aria-label="Throughput minimum"
                />
                <span className={styles.rangeSeparator}>to</span>
                <input
                  type="number"
                  className={styles.rangeInput}
                  min={8}
                  max={310}
                  value={filters.throughputRange[1]}
                  onChange={(e) => handleThroughputChange(1, Number(e.target.value))}
                  aria-label="Throughput maximum"
                />
              </div>
              <div className={styles.rangeText}>
                {filters.throughputRange[0]} req/int - {filters.throughputRange[1]} req/int
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Failure Ratio section */}
      <div className={styles.section} data-testid="filter-section-failureRatio">
        <div
          className={styles.sectionHeader}
          onClick={() => toggleSection('failureRatio')}
          role="button"
          aria-expanded={sections.failureRatio}
          data-testid="filter-section-header-failureRatio"
        >
          <span className={styles.sectionLabel}>Failure Ratio</span>
          <ChevronIcon expanded={sections.failureRatio} />
        </div>
        {sections.failureRatio && (
          <div className={styles.sectionContent} data-testid="filter-section-content-failureRatio">
            <div className={styles.legendList}>
              {FAILURE_RATIO_LEGEND.map((item) => (
                <label key={item.label} className={styles.legendItem}>
                  <input type="checkbox" className={styles.legendCheckbox} defaultChecked={false} />
                  <span className={`${styles.legendDot} ${LEGEND_DOT_STYLES[item.color] || ''}`} />
                  <span>{item.label}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>


      {/* Attributes section */}
      <div className={styles.section} data-testid="filter-section-attributes">
        <div
          className={styles.sectionHeader}
          onClick={() => toggleSection('attributes')}
          role="button"
          aria-expanded={sections.attributes}
          data-testid="filter-section-header-attributes"
        >
          <span className={styles.sectionLabel}>Attributes</span>
          <ChevronIcon expanded={sections.attributes} />
        </div>
        {sections.attributes && (
          <div className={styles.sectionContent} data-testid="filter-section-content-attributes">
            <div className={styles.attributesSubsection}>
              <svg
                className={`${styles.attributesSubsectionChevron} ${styles.attributesSubsectionChevronExpanded}`}
                viewBox="0 0 16 16"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M5.427 4.427a.75.75 0 011.049.086L8.707 8l-2.231 3.487a.75.75 0 11-1.122-.997L7.585 8 5.354 5.487a.75.75 0 01.073-1.06z" />
              </svg>
              telemetry.sdk.language
            </div>
            <input
              type="text"
              className={styles.attributeSearch}
              placeholder="Search"
              value={attributeSearch}
              onChange={(e) => setAttributeSearch(e.target.value)}
            />
            <div className={styles.attributeActions}>
              <button
                className={styles.actionLink}
                onClick={handleSelectAll}
                data-testid="attributes-select-all"
              >
                Select all
              </button>
              <button
                className={styles.actionLink}
                onClick={handleClearAll}
                data-testid="attributes-clear-all"
              >
                Clear all
              </button>
            </div>
            {filteredAttributes.map(([attr, checked]) => (
              <label key={attr} className={styles.checkboxItem}>
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={(e) => handleAttributeChange(attr, e.target.checked)}
                />
                <span className={styles.checkboxLabel}>{attr}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
};

export default FilterPanel;