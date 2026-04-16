import type { FaultRateEntry, DependencyPathEntry } from '../../data/sampleData';
import styles from './SummaryCards.module.css';

export interface SummaryCardsProps {
  topServicesByFaultRate: FaultRateEntry[];
  topDependencyPaths: DependencyPathEntry[];
}

const FaultRateBar = ({ rate }: { rate: number }) => (
  <div className={styles.faultRateCell}>
    <div className={styles.faultBar}>
      <div
        className={styles.faultBarFill}
        style={{ width: `${Math.min(rate, 100)}%` }}
      />
    </div>
    <span className={styles.faultPercent}>{rate}%</span>
  </div>
);

const SummaryCards = ({ topServicesByFaultRate, topDependencyPaths }: SummaryCardsProps) => {
  return (
    <div className={styles.container} data-testid="summary-cards">
      {/* Top services by fault rate */}
      <div className={styles.card} data-testid="summary-card-services">
        <h3 className={styles.cardTitle}>Top services by fault rate</h3>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Service</th>
              <th>Fault rate</th>
            </tr>
          </thead>
          <tbody>
            {topServicesByFaultRate.map((entry) => (
              <tr key={entry.serviceName}>
                <td>
                  <a className={styles.serviceLink} href="#">
                    {entry.serviceName}
                  </a>
                </td>
                <td>
                  <FaultRateBar rate={entry.faultRate} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Top dependency paths by fault rate */}
      <div className={styles.card} data-testid="summary-card-dependencies">
        <h3 className={styles.cardTitle}>Top dependency paths by fault rate</h3>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Dependency service</th>
              <th>Service</th>
              <th>Fault rate</th>
            </tr>
          </thead>
          <tbody>
            {topDependencyPaths.map((entry, index) => (
              <tr key={`${entry.dependencyService}-${entry.service}-${index}`}>
                <td>
                  <a className={styles.serviceLink} href="#">
                    {entry.dependencyService}
                  </a>
                </td>
                <td>
                  <a className={styles.serviceLink} href="#">
                    {entry.service}
                  </a>
                </td>
                <td>
                  <FaultRateBar rate={entry.faultRate} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SummaryCards;
