// --- Type Definitions ---

export type ServiceStatus = 'healthy' | 'warning' | 'critical';

export interface ServiceEntry {
  name: string;
  status: ServiceStatus;
  correlationsAvailable: boolean;
  avgLatencyP99: number;
  avgLatencyP90: number;
  avgLatencyP50: number;
  latencySparkline: number[];
  avgThroughput: number;
  throughputSparkline: number[];
  avgFailureRatio: number;
  failureRatioSparkline: number[];
  environment: string;
}

export interface FaultRateEntry {
  serviceName: string;
  faultRate: number;
}

export interface DependencyPathEntry {
  dependencyService: string;
  service: string;
  faultRate: number;
}

export interface FilterState {
  environments: Record<string, boolean>;
  latencyRange: [number, number];
  throughputRange: [number, number];
  attributes: Record<string, boolean>;
}

// --- Constants ---

export const DEFAULT_FILTER_STATE: FilterState = {
  environments: { generic: false, EKS: false, ECS: false, EC2: false, Lambda: false },
  latencyRange: [4, 443],
  throughputRange: [8, 310],
  attributes: { cpp: false, dotnet: false, go: false, nodejs: false, python: false },
};

export interface FailureRatioLegendItem {
  label: string;
  color: string;
  condition: string;
}

export const FAILURE_RATIO_LEGEND: FailureRatioLegendItem[] = [
  { label: '< 1%', color: 'blue', condition: 'ratio < 1' },
  { label: '1-5%', color: 'orange', condition: '1 <= ratio <= 5' },
  { label: '> 5%', color: 'red', condition: 'ratio > 5' },
];

// --- Sample Data: Service Entries (8 rows) ---

export const SAMPLE_SERVICES: ServiceEntry[] = [
  {
    name: 'cart',
    status: 'healthy',
    correlationsAvailable: true,
    avgLatencyP99: 120,
    avgLatencyP90: 85,
    avgLatencyP50: 42,
    latencySparkline: [40, 45, 42, 50, 48, 55, 52, 60, 58, 55],
    avgThroughput: 210,
    throughputSparkline: [200, 210, 205, 215, 220, 210, 215, 208, 212, 210],
    avgFailureRatio: 0.5,
    failureRatioSparkline: [0.4, 0.5, 0.6, 0.5, 0.4, 0.5, 0.6, 0.5, 0.4, 0.5],
    environment: 'generic',
  },
  {
    name: 'checkout',
    status: 'critical',
    correlationsAvailable: true,
    avgLatencyP99: 443,
    avgLatencyP90: 320,
    avgLatencyP50: 180,
    latencySparkline: [170, 190, 200, 250, 300, 350, 400, 420, 440, 443],
    avgThroughput: 85,
    throughputSparkline: [90, 88, 85, 82, 80, 78, 82, 85, 88, 85],
    avgFailureRatio: 58.45,
    failureRatioSparkline: [50, 52, 55, 58, 60, 58, 56, 58, 59, 58.45],
    environment: 'EKS',
  },
  {
    name: 'flagd',
    status: 'warning',
    correlationsAvailable: false,
    avgLatencyP99: 35,
    avgLatencyP90: 22,
    avgLatencyP50: 10,
    latencySparkline: [8, 10, 12, 15, 18, 20, 22, 25, 30, 35],
    avgThroughput: 310,
    throughputSparkline: [300, 305, 310, 308, 312, 310, 305, 308, 310, 310],
    avgFailureRatio: 24.49,
    failureRatioSparkline: [20, 22, 24, 25, 24, 23, 24, 25, 24, 24.49],
    environment: 'ECS',
  },
  {
    name: 'frontend',
    status: 'critical',
    correlationsAvailable: true,
    avgLatencyP99: 380,
    avgLatencyP90: 260,
    avgLatencyP50: 140,
    latencySparkline: [130, 150, 180, 220, 260, 300, 340, 360, 370, 380],
    avgThroughput: 150,
    throughputSparkline: [160, 155, 150, 148, 145, 150, 152, 150, 148, 150],
    avgFailureRatio: 55.03,
    failureRatioSparkline: [48, 50, 52, 54, 55, 56, 55, 54, 55, 55.03],
    environment: 'generic',
  },
  {
    name: 'frontend-proxy',
    status: 'critical',
    correlationsAvailable: true,
    avgLatencyP99: 410,
    avgLatencyP90: 290,
    avgLatencyP50: 160,
    latencySparkline: [150, 170, 200, 240, 280, 320, 360, 390, 400, 410],
    avgThroughput: 120,
    throughputSparkline: [130, 125, 120, 118, 115, 120, 122, 120, 118, 120],
    avgFailureRatio: 58.62,
    failureRatioSparkline: [52, 54, 56, 58, 59, 58, 57, 58, 59, 58.62],
    environment: 'EC2',
  },
  {
    name: 'image-provider',
    status: 'healthy',
    correlationsAvailable: false,
    avgLatencyP99: 65,
    avgLatencyP90: 45,
    avgLatencyP50: 20,
    latencySparkline: [18, 20, 22, 25, 28, 30, 35, 40, 45, 65],
    avgThroughput: 95,
    throughputSparkline: [90, 92, 95, 98, 95, 93, 95, 96, 95, 95],
    avgFailureRatio: 0.8,
    failureRatioSparkline: [0.6, 0.7, 0.8, 0.9, 0.8, 0.7, 0.8, 0.9, 0.8, 0.8],
    environment: 'Lambda',
  },
  {
    name: 'product-reviews',
    status: 'warning',
    correlationsAvailable: true,
    avgLatencyP99: 200,
    avgLatencyP90: 150,
    avgLatencyP50: 75,
    latencySparkline: [70, 80, 90, 110, 130, 150, 170, 185, 195, 200],
    avgThroughput: 60,
    throughputSparkline: [65, 62, 60, 58, 55, 58, 60, 62, 60, 60],
    avgFailureRatio: 3.2,
    failureRatioSparkline: [2.8, 3.0, 3.2, 3.4, 3.2, 3.0, 3.2, 3.4, 3.2, 3.2],
    environment: 'EKS',
  },
  {
    name: 'recommendation',
    status: 'healthy',
    correlationsAvailable: true,
    avgLatencyP99: 90,
    avgLatencyP90: 60,
    avgLatencyP50: 30,
    latencySparkline: [28, 30, 32, 35, 38, 40, 45, 50, 60, 90],
    avgThroughput: 180,
    throughputSparkline: [175, 178, 180, 182, 185, 180, 178, 180, 182, 180],
    avgFailureRatio: 0.3,
    failureRatioSparkline: [0.2, 0.3, 0.4, 0.3, 0.2, 0.3, 0.4, 0.3, 0.2, 0.3],
    environment: 'generic',
  },
];

// --- Sample Data: Top Services by Fault Rate (4 rows) ---

export const TOP_SERVICES_BY_FAULT_RATE: FaultRateEntry[] = [
  { serviceName: 'frontend-proxy', faultRate: 58.62 },
  { serviceName: 'checkout', faultRate: 58.45 },
  { serviceName: 'frontend', faultRate: 55.03 },
  { serviceName: 'flagd', faultRate: 24.49 },
];

// --- Sample Data: Top Dependency Paths by Fault Rate (4 rows) ---

export const TOP_DEPENDENCY_PATHS: DependencyPathEntry[] = [
  { dependencyService: 'checkout', service: 'frontend', faultRate: 100 },
  { dependencyService: 'recommendation', service: 'frontend', faultRate: 100 },
  { dependencyService: 'frontend', service: 'frontend-proxy', faultRate: 57.53 },
  { dependencyService: 'product-reviews', service: 'frontend', faultRate: 47.06 },
];
