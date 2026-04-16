# Implementation Plan: OpenSearch Dashboards Next

## Overview

Incrementally build the OpenSearch Dashboards Next application shell using React 18+, TypeScript, Vite, React Router v6, and OUI v9. Each task builds on the previous, starting with project scaffolding, then the shell and navigation, followed by the detailed Service page components (ServiceHeader, FilterPanel, SummaryCards, ServiceCatalog), and ending with responsive behavior and integration wiring.

## Tasks

- [x] 1. Scaffold project and install dependencies
  - [x] 1.1 Initialize Vite project with React + TypeScript template
    - Run `npm create vite@latest` with the `react-ts` template
    - Configure `tsconfig.json` for strict mode
    - _Requirements: 1.1, 1.3_

  - [x] 1.2 Install OUI v9 and core dependencies
    - Install OUI v9 from the `v9-rework` branch of `kamingleung/oui-next`
    - Install `react-router-dom` v6
    - Install `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `jsdom`, and `fast-check` as dev dependencies
    - _Requirements: 1.2, 1.3_

  - [x] 1.3 Configure Vitest and test setup
    - Create `vitest.config.ts` with jsdom environment and globals enabled
    - Create `src/test/setup.ts` with `@testing-library/jest-dom` imports
    - _Requirements: 1.3_

- [x] 2. Implement App root and routing configuration
  - [x] 2.1 Create `App.tsx` with OUI Provider and BrowserRouter
    - Wrap application in `OuiProvider` for OUI v9 theme context
    - Wrap in `BrowserRouter` for client-side routing
    - _Requirements: 1.1, 2.3_

  - [x] 2.2 Define route configuration and `Navigate` redirects
    - Map `/discover` to `DiscoverPage`, `/service` to `ServicePage`, `/chat` to `ChatPage`
    - Add `<Navigate to="/discover" replace />` for `/` and `*` catch-all
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

  - [ ]* 2.3 Write property test: Undefined paths redirect to Discover (Property 4)
    - **Property 4: Undefined paths redirect to Discover**
    - Generate arbitrary path strings not in `/discover`, `/service`, `/chat`; assert redirect to `/discover` and DiscoverPage renders
    - **Validates: Requirements 4.5**

- [x] 3. Implement LeftNavigation component (OUI v9 pattern)
  - [x] 3.1 Create `LeftNavigation` component with OUI v9 nav pattern
    - Render the OpenSearch logo at the top of the sidebar
    - Render a collapse/expand toggle icon adjacent to the logo
    - Render a decorative `NavSearchInput` with placeholder "Search menu or assets" below the logo area
    - Define `NAV_ITEMS` config array with Discover, Service, Chat entries
    - Render exactly three `NavLink` items using OUI v9 side nav components
    - Highlight the active route with a blue background using React Router's `NavLink` active state
    - Render a bottom icon bar area below the navigation items
    - Accept `isOpen` and `onToggle` props for responsive behavior
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.8, 3.9_

  - [ ]* 3.2 Write property test: Navigation items are exactly Discover, Service, Chat (Property 1)
    - **Property 1: Navigation items are exactly Discover, Service, Chat**
    - Render LeftNavigation in various states (open/closed); assert exactly 3 nav items with labels "Discover", "Service", "Chat" are always present
    - **Validates: Requirements 3.5, 3.6**

  - [ ]* 3.3 Write property test: Navigation click routes correctly (Property 2)
    - **Property 2: Navigation click routes correctly**
    - Generate a random nav item; simulate click; assert route matches item path and correct page renders without full reload
    - **Validates: Requirements 3.7**

  - [ ]* 3.4 Write property test: Active route highlights the correct nav item (Property 3)
    - **Property 3: Active route highlights the correct nav item**
    - Generate a random defined route; navigate to it; assert exactly one nav item is marked active and its path matches the current route
    - **Validates: Requirements 3.8**

- [x] 4. Implement ApplicationShell with layout
  - [x] 4.1 Create `ApplicationShell` component
    - Render `LeftNavigation` on the left and routed content area on the right
    - Use OUI v9 layout primitives for the two-column layout
    - Manage `isSidebarOpen` state
    - Wrap content area in a React Error Boundary with fallback UI linking back to `/discover`
    - _Requirements: 2.1, 2.2, 2.3_

  - [x] 4.2 Wire `ApplicationShell` into `App.tsx` route tree
    - Nest page routes inside `ApplicationShell` layout route
    - Ensure `main.tsx` renders `App` into the DOM root
    - Verify full component tree: `App` → `OuiProvider` → `BrowserRouter` → `ApplicationShell` → `LeftNavigation` + `Routes`
    - _Requirements: 1.1, 2.1, 2.2, 2.3_

- [x] 5. Implement Discover and Chat pages
  - [x] 5.1 Create `DiscoverPage` component
    - Render page title "Discover" using OUI v9 typography
    - Display placeholder data exploration content using OUI v9 layout components
    - _Requirements: 5.1, 5.2, 5.3_

  - [x] 5.2 Create `ChatPage` component
    - Render page title "Chat" using OUI v9 typography
    - Display placeholder conversational interface with a message area and an input field
    - _Requirements: 10.1, 10.2, 10.3_

- [x] 6. Checkpoint - Core shell and navigation
  - Ensure all tests pass, ask the user if questions arise.

- [x] 7. Create sample data module
  - [x] 7.1 Create `src/data/sampleData.ts`
    - Define TypeScript interfaces: `ServiceEntry`, `FaultRateEntry`, `DependencyPathEntry`
    - Define `FilterState` interface and `DEFAULT_FILTER_STATE` constant
    - Define `FAILURE_RATIO_LEGEND` constant
    - Populate 8 `ServiceEntry` rows with realistic APM data (name, status, latency P99/P90/P50, sparklines, throughput, failure ratio, environment)
    - Populate 4 `FaultRateEntry` rows for top services by fault rate
    - Populate 4 `DependencyPathEntry` rows for top dependency paths by fault rate
    - _Requirements: 8.3, 8.5, 9.5_

- [x] 8. Implement ServiceHeader component
  - [x] 8.1 Create `ServiceHeader` component
    - Render breadcrumb navigation showing "APM Observability /"
    - Render page title "Services" with a search/magnifier icon
    - Render search input with placeholder "Filter by service name or environment"
    - Render time range selector showing "Last 15 minutes" with calendar icon and "Show dates" link
    - Render a "Refresh" button with an icon
    - Render an "APM Settings" button at the top right
    - Accept `searchValue` and `onSearchChange` props
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6_

- [x] 9. Implement FilterPanel component
  - [x] 9.1 Create `FilterPanel` component with collapsible sections
    - Render as a sidebar with "Filters" header and collapse/settings icon
    - Implement Environment section with checkboxes: generic, EKS, ECS, EC2, Lambda
    - Implement Latency section with dual-handle range slider (4ms–443ms)
    - Implement Throughput section with dual-handle range slider (8–310 req/int)
    - Implement Failure Ratio section with color-coded legend dots (blue < 1%, orange 1-5%, red > 5%)
    - Implement Attributes section labeled "telemetry.sdk.language" with checkboxes: cpp, dotnet, go, nodejs, python
    - Implement "Select all" and "Clear all" links in the Attributes section
    - Each section header toggles section content visibility on click
    - Accept `filters` and `onFilterChange` props
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 7.7, 7.8, 7.9_

  - [ ]* 9.2 Write property test: Filter panel sections toggle on click (Property 5)
    - **Property 5: Filter panel sections toggle on click**
    - Generate a random sequence of section identifiers and toggle actions; for each, click the section header and assert visibility has toggled from its previous state
    - **Validates: Requirements 7.9**

- [x] 10. Implement SummaryCards component
  - [x] 10.1 Create `SummaryCards` component
    - Render two side-by-side cards above the ServiceCatalog
    - First card: title "Top services by fault rate", table with columns Service (link) and Fault rate (horizontal bar with percentage), 4 rows from sample data
    - Second card: title "Top dependency paths by fault rate", table with columns Dependency service (link), Service (link), and Fault rate (horizontal bar with percentage), 4 rows from sample data
    - Accept `topServicesByFaultRate` and `topDependencyPaths` props
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_

- [x] 11. Implement ServiceCatalog component
  - [x] 11.1 Create `ServiceCatalog` component
    - Render section title "Service Catalog"
    - Render latency toggle tabs for P99, P90, P50 with P99 as default active tab
    - Render full-width table with columns: Service (sortable, colored status dot + link), Correlations (icon buttons), Avg. Latency P99 (value + sparkline), Avg. throughput (value + sparkline), Avg. failure ratio (percentage + sparkline), Environment (text)
    - Display 8 rows of sample service data
    - Render "Rows per page: 10" dropdown and pagination controls below the table
    - Implement column sorting on click of sortable column headers
    - Accept `services`, `activeLatencyTab`, `onLatencyTabChange`, `sortColumn`, `sortDirection`, `onSort` props
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6, 9.7_

  - [ ]* 11.2 Write property test: Sortable columns sort the service catalog (Property 6)
    - **Property 6: Sortable columns sort the service catalog**
    - Generate a random sortable column and random service data; click column header; assert row order matches expected sort; click again and assert reversed order
    - **Validates: Requirements 9.7**

- [x] 12. Assemble ServicePage and wire components
  - [x] 12.1 Create `ServicePage` component orchestrating all sub-components
    - Render `ServiceHeader` at the top
    - Render a flex row with `FilterPanel` on the left and main content on the right
    - Render `SummaryCards` and `ServiceCatalog` in the main content area
    - Manage `ServicePageState`: filters, latencyTab, sortColumn, sortDirection
    - Import sample data from `sampleData.ts` and pass to child components
    - _Requirements: 6.1, 7.1, 8.1, 9.1_

- [x] 13. Checkpoint - Service page complete
  - Ensure all tests pass, ask the user if questions arise.

- [x] 14. Implement responsive layout behavior
  - [x] 14.1 Add responsive sidebar logic to ApplicationShell
    - Use `matchMedia` listener for the 768px breakpoint
    - Show sidebar when viewport >= 768px; collapse/hide when < 768px
    - Render a toggle button when sidebar is collapsed to allow re-opening as overlay
    - _Requirements: 11.1, 11.2, 11.3_

  - [ ]* 14.2 Write property test: Sidebar visibility follows viewport width threshold (Property 7)
    - **Property 7: Sidebar visibility follows viewport width threshold**
    - Generate random viewport widths (320–1920); for each width, assert sidebar visibility equals `(width >= 768)`
    - **Validates: Requirements 11.1, 11.2**

- [x] 15. Final integration and unit tests
  - [ ]* 15.1 Write unit tests for LeftNavigation and routing
    - Test LeftNavigation renders OpenSearch logo, collapse toggle, decorative search input, and bottom icon bar (Req 3.1, 3.2, 3.3, 3.9)
    - Test nav search input is decorative / non-functional (Req 3.4)
    - Test LeftNavigation renders exactly 3 items with labels "Discover", "Service", "Chat" (Req 3.5, 3.6)
    - Test each route renders the correct page component (Req 4.1, 4.2, 4.3)
    - Test root path `/` redirects to `/discover` (Req 4.4)
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 4.1, 4.2, 4.3, 4.4_

  - [ ]* 15.2 Write unit tests for Service page components
    - Test ServiceHeader renders breadcrumbs, search input, time range selector, Refresh button, APM Settings button (Req 6.1–6.6)
    - Test FilterPanel renders all five sections with correct controls (Req 7.1–7.8)
    - Test FilterPanel Attributes section has "Select all" and "Clear all" links (Req 7.8)
    - Test SummaryCards renders two cards with correct titles and 4 rows each (Req 8.1–8.5)
    - Test ServiceCatalog renders with P99 tab active by default (Req 9.3)
    - Test ServiceCatalog displays all required columns (Req 9.4)
    - Test ServiceCatalog displays 8 rows of sample data (Req 9.5)
    - Test ServiceCatalog displays pagination controls with "Rows per page: 10" (Req 9.6)
    - _Requirements: 6.1–6.6, 7.1–7.8, 8.1–8.5, 9.3, 9.4, 9.5, 9.6_

  - [ ]* 15.3 Write unit tests for Chat page and responsive behavior
    - Test ChatPage renders message area and input field (Req 10.3)
    - Test sidebar toggle button appears when viewport < 768px (Req 11.3)
    - _Requirements: 10.3, 11.3_

- [x] 16. Final checkpoint
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Property tests use `fast-check` with `fc.assert(fc.property(...))` and a minimum of 100 iterations
- OUI v9 components are sourced from the `v9-rework` branch of `kamingleung/oui-next`
- Checkpoints ensure incremental validation between major implementation phases
- The Service page is decomposed into 4 components: ServiceHeader, FilterPanel, SummaryCards, ServiceCatalog
- Sample data is centralized in `src/data/sampleData.ts` with 8 ServiceEntry, 4 FaultRateEntry, and 4 DependencyPathEntry rows
