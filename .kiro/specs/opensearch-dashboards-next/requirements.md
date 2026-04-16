# Requirements Document

## Introduction

OpenSearch Dashboards Next is a greenfield rebuild of the OpenSearch Dashboards frontend application. This version uses the OUI v9 design system (sourced from the `v9-rework` branch of `oui-next`) to deliver a modern, component-driven UI. The initial scope focuses on a minimal shell with left-side navigation linking to three sample pages: Discover, Service, and Chat. The Service page is a detailed APM Observability view with a filter panel, summary cards, and a service catalog table. These pages serve as proof-of-concept surfaces for validating the new design system integration and establishing the project's architectural patterns.

## Glossary

- **Application_Shell**: The top-level layout component that renders the left navigation sidebar and the routed page content area.
- **Left_Navigation**: A persistent sidebar rendered by the Application_Shell that displays links to the sample pages, following the OUI v9 navigation pattern.
- **Discover_Page**: A sample page representing the log/data exploration experience.
- **Service_Page**: A detailed APM Observability page displaying service monitoring data with a header bar, filter panel, summary cards, and a service catalog table.
- **Chat_Page**: A sample page representing a conversational AI assistant interface.
- **OUI_v9**: The OpenSearch UI design system version 9, consumed from the `v9-rework` branch of the `kamingleung/oui-next` repository.
- **Sample_Page**: Any of the three placeholder pages (Discover, Service, Chat) used to validate layout and navigation.
- **Router**: The client-side routing mechanism that maps URL paths to Sample_Pages.
- **Service_Header**: The top bar area of the Service_Page containing breadcrumbs, page title, search filter, time range selector, and action buttons.
- **Filter_Panel**: A collapsible sidebar within the Service_Page content area that provides filtering controls for environment, latency, throughput, failure ratio, and attributes.
- **Summary_Cards**: Two side-by-side cards at the top of the Service_Page main content showing top services and top dependency paths by fault rate.
- **Service_Catalog**: A full-width data table on the Service_Page listing services with latency, throughput, failure ratio, and environment columns.
- **Nav_Search_Input**: A decorative search input at the top of the Left_Navigation for visual consistency with the OUI v9 pattern.

## Requirements

### Requirement 1: Project Setup with OUI v9

**User Story:** As a developer, I want the project bootstrapped with the OUI v9 design system, so that all UI components use the latest OpenSearch design tokens and patterns.

#### Acceptance Criteria

1. THE Application_Shell SHALL render using components and styles provided by OUI_v9.
2. THE Application_Shell SHALL import OUI_v9 from the `v9-rework` branch of the `kamingleung/oui-next` GitHub repository.
3. WHEN the application is built, THE Application_Shell SHALL compile without errors against the OUI_v9 dependency.

### Requirement 2: Application Shell and Layout

**User Story:** As a user, I want a consistent application shell with a left navigation sidebar and a content area, so that I can navigate between pages in a familiar layout.

#### Acceptance Criteria

1. THE Application_Shell SHALL display the Left_Navigation on the left side of the viewport.
2. THE Application_Shell SHALL display the active Sample_Page content in the remaining area to the right of the Left_Navigation.
3. WHEN the viewport loads, THE Application_Shell SHALL render both the Left_Navigation and the default Sample_Page content simultaneously.

### Requirement 3: Left Navigation (OUI v9 Pattern)

**User Story:** As a user, I want a left navigation sidebar following the OUI v9 design pattern, so that I can switch between Discover, Service, and Chat in a modern, consistent interface.

#### Acceptance Criteria

1. THE Left_Navigation SHALL display the OpenSearch logo at the top of the sidebar.
2. THE Left_Navigation SHALL display a collapse/expand toggle icon adjacent to the logo that allows the user to collapse or expand the sidebar.
3. THE Left_Navigation SHALL display a Nav_Search_Input with placeholder text "Search menu or assets" below the logo area.
4. THE Nav_Search_Input SHALL be decorative and non-functional for the initial implementation.
5. THE Left_Navigation SHALL display exactly three navigation items: Discover, Service, and Chat.
6. THE Left_Navigation SHALL NOT display any navigation items beyond the three Sample_Pages.
7. WHEN a user selects a navigation item, THE Router SHALL navigate to the corresponding Sample_Page without a full page reload.
8. WHILE a Sample_Page is active, THE Left_Navigation SHALL visually indicate the currently active navigation item using a highlighted background style (blue background).
9. THE Left_Navigation SHALL display a bottom icon bar area below the navigation items for visual consistency with the OUI v9 pattern.

### Requirement 4: Client-Side Routing

**User Story:** As a user, I want each sample page to have its own URL, so that I can bookmark and directly navigate to a specific page.

#### Acceptance Criteria

1. THE Router SHALL map the `/discover` path to the Discover_Page.
2. THE Router SHALL map the `/service` path to the Service_Page.
3. THE Router SHALL map the `/chat` path to the Chat_Page.
4. WHEN the application loads without a specific path, THE Router SHALL redirect to the Discover_Page.
5. WHEN a user navigates to an undefined path, THE Router SHALL redirect to the Discover_Page.

### Requirement 5: Discover Page

**User Story:** As a user, I want a Discover page, so that I can see a representative data exploration layout built with OUI v9 components.

#### Acceptance Criteria

1. WHEN the user navigates to `/discover`, THE Discover_Page SHALL render a page title of "Discover".
2. THE Discover_Page SHALL use OUI_v9 layout and typography components for its content.
3. THE Discover_Page SHALL display placeholder content representing a data exploration interface.

### Requirement 6: Service Page Header

**User Story:** As a user, I want a Service page header with breadcrumbs, search, and time controls, so that I can orient myself and control the data context.

#### Acceptance Criteria

1. WHEN the user navigates to `/service`, THE Service_Page SHALL render a breadcrumb navigation showing "APM Observability /".
2. THE Service_Header SHALL display the page title "Services" with a search/magnifier icon.
3. THE Service_Header SHALL display a search input with placeholder text "Filter by service name or environment".
4. THE Service_Header SHALL display a time range selector showing "Last 15 minutes" with a calendar icon and a "Show dates" link.
5. THE Service_Header SHALL display a "Refresh" button with an icon.
6. THE Service_Header SHALL display an "APM Settings" button positioned at the top right of the header area.

### Requirement 7: Service Page Filter Panel

**User Story:** As a user, I want a filter panel on the Service page, so that I can narrow down the displayed services by environment, latency, throughput, failure ratio, and attributes.

#### Acceptance Criteria

1. THE Filter_Panel SHALL be rendered as a sidebar within the Service_Page content area, to the left of the main content.
2. THE Filter_Panel SHALL display a "Filters" header with a collapse/settings icon.
3. THE Filter_Panel SHALL display an Environment section that is collapsible and contains checkboxes for the values: generic, EKS, ECS, EC2, and Lambda.
4. THE Filter_Panel SHALL display a Latency section that is collapsible and contains a dual-handle range slider with a range of 4ms to 443ms.
5. THE Filter_Panel SHALL display a Throughput section that is collapsible and contains a dual-handle range slider with a range of 8 to 310 req/int.
6. THE Filter_Panel SHALL display a Failure Ratio section that is collapsible and contains color-coded legend dots: blue for less than 1%, orange for 1-5%, and red for greater than 5%.
7. THE Filter_Panel SHALL display an Attributes section that is collapsible and labeled "telemetry.sdk.language" with checkboxes for the values: cpp, dotnet, go, nodejs, and python.
8. THE Filter_Panel SHALL display "Select all" and "Clear all" links within the Attributes section.
9. WHEN a user clicks a collapsible section header, THE Filter_Panel SHALL toggle the visibility of that section's content.

### Requirement 8: Service Page Summary Cards

**User Story:** As a user, I want summary cards showing top services and dependency paths by fault rate, so that I can quickly identify problem areas.

#### Acceptance Criteria

1. THE Service_Page SHALL display two Summary_Cards side by side above the Service_Catalog.
2. THE first Summary_Card SHALL have the title "Top services by fault rate" and display a table with columns: Service (as a link) and Fault rate (as a horizontal bar with percentage).
3. THE first Summary_Card SHALL display four rows of sample data.
4. THE second Summary_Card SHALL have the title "Top dependency paths by fault rate" and display a table with columns: Dependency service (as a link), Service (as a link), and Fault rate (as a horizontal bar with percentage).
5. THE second Summary_Card SHALL display four rows of sample data.

### Requirement 9: Service Page Service Catalog Table

**User Story:** As a user, I want a full-width service catalog table, so that I can view and compare all services with their latency, throughput, failure ratio, and environment.

#### Acceptance Criteria

1. THE Service_Catalog SHALL be rendered as a full-width table below the Summary_Cards.
2. THE Service_Catalog SHALL display a section title of "Service Catalog".
3. THE Service_Catalog SHALL display latency toggle tabs for P99, P90, and P50, with P99 selected as the default active tab.
4. THE Service_Catalog SHALL display columns: Service (sortable, with a colored status dot and link), Correlations (icon buttons), Avg. Latency P99 (value with sparkline), Avg. throughput (value with sparkline), Avg. failure ratio (percentage with sparkline), and Environment (text).
5. THE Service_Catalog SHALL display eight rows of sample service data.
6. THE Service_Catalog SHALL display a "Rows per page: 10" dropdown and pagination controls below the table.
7. WHEN a user clicks a sortable column header, THE Service_Catalog SHALL sort the table rows by that column.

### Requirement 10: Chat Page

**User Story:** As a user, I want a Chat page, so that I can see a representative conversational AI interface built with OUI v9 components.

#### Acceptance Criteria

1. WHEN the user navigates to `/chat`, THE Chat_Page SHALL render a page title of "Chat".
2. THE Chat_Page SHALL use OUI_v9 layout and typography components for its content.
3. THE Chat_Page SHALL display placeholder content representing a conversational interface with a message area and an input field.

### Requirement 11: Responsive Layout

**User Story:** As a user, I want the application to remain usable across different viewport sizes, so that I can work on various screen dimensions.

#### Acceptance Criteria

1. WHILE the viewport width is 768 pixels or greater, THE Application_Shell SHALL display the Left_Navigation as a visible sidebar.
2. WHILE the viewport width is less than 768 pixels, THE Application_Shell SHALL collapse or hide the Left_Navigation to maximize content area.
3. WHEN the Left_Navigation is collapsed, THE Application_Shell SHALL provide a mechanism to toggle the Left_Navigation visibility.
