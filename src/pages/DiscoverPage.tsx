import styles from './DiscoverPage.module.css';

const SAMPLE_LOGS = [
  { time: '2024-01-15 09:23:14.332', level: 'info' as const, message: 'GET /api/v1/indices/_search 200 OK - 42ms' },
  { time: '2024-01-15 09:23:15.108', level: 'warn' as const, message: 'Slow query detected on index "logs-2024.01": took 1243ms, threshold 1000ms' },
  { time: '2024-01-15 09:23:15.441', level: 'info' as const, message: 'POST /api/v1/documents/_bulk 200 OK - 128ms (1500 docs indexed)' },
  { time: '2024-01-15 09:23:16.002', level: 'error' as const, message: 'Connection refused to node opensearch-node-3:9200 — retrying in 5s' },
  { time: '2024-01-15 09:23:16.887', level: 'info' as const, message: 'GET /api/v1/cluster/_health 200 OK - status: yellow, nodes: 5, shards: 142' },
  { time: '2024-01-15 09:23:17.203', level: 'info' as const, message: 'Index lifecycle policy "hot-warm-delete" applied to logs-2024.01.*' },
];

const levelClass: Record<string, string> = {
  info: styles.levelInfo,
  warn: styles.levelWarn,
  error: styles.levelError,
};

const DiscoverPage = () => {
  return (
    <div className={styles.page} data-testid="discover-page">
      <h1 className={styles.title}>Discover</h1>

      <div className={styles.searchBar}>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Search logs, events, and documents..."
          readOnly
        />
        <button className={styles.searchButton} type="button">Search</button>
      </div>

      <div className={styles.toolbar}>
        <div className={styles.toolbarLeft}>
          <span>6 hits</span>
          <span className={styles.chip}>index: logs-*</span>
          <span className={styles.chip}>Last 15 min</span>
        </div>
        <div className={styles.toolbarRight}>
          <button className={styles.iconButton} type="button" aria-label="Toggle table view">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <path d="M1 2h14v2H1V2zm0 4h14v2H1V6zm0 4h14v2H1v-2zm0 4h14v2H1v-2z" />
            </svg>
          </button>
          <button className={styles.iconButton} type="button" aria-label="Toggle JSON view">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <path d="M4 1L1 4v8l3 3h8l3-3V4l-3-3H4zm0 1.5h8L14.5 5v6L12 13.5H4L1.5 11V5L4 2.5z" />
            </svg>
          </button>
        </div>
      </div>

      <div className={styles.results} data-testid="discover-results">
        {SAMPLE_LOGS.map((log, i) => (
          <div className={styles.resultRow} key={i}>
            <span className={styles.timestamp}>{log.time}</span>
            <span className={`${styles.logLevel} ${levelClass[log.level]}`}>{log.level}</span>
            <span className={styles.logMessage}>{log.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiscoverPage;
