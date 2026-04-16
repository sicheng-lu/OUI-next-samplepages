import { appendIconComponentCache } from './oui/icon';

// Import all icon assets used across the app
import { icon as apps } from '@opensearch-project/oui/src/components/icon/assets/apps';
import { icon as calendar } from '@opensearch-project/oui/src/components/icon/assets/calendar';
import { icon as console } from '@opensearch-project/oui/src/components/icon/assets/console';
import { icon as controlsHorizontal } from '@opensearch-project/oui/src/components/icon/assets/controls_horizontal';
import { icon as document } from '@opensearch-project/oui/src/components/icon/assets/document';
import { icon as download } from '@opensearch-project/oui/src/components/icon/assets/download';
import { icon as filter } from '@opensearch-project/oui/src/components/icon/assets/filter';
import { icon as gear } from '@opensearch-project/oui/src/components/icon/assets/gear';
import { icon as home } from '@opensearch-project/oui/src/components/icon/assets/home';
import { icon as iInCircle } from '@opensearch-project/oui/src/components/icon/assets/iInCircle';
import { icon as menuLeft } from '@opensearch-project/oui/src/components/icon/assets/menuLeft';
import { icon as questionInCircle } from '@opensearch-project/oui/src/components/icon/assets/question_in_circle';
import { icon as refresh } from '@opensearch-project/oui/src/components/icon/assets/refresh';
import { icon as search } from '@opensearch-project/oui/src/components/icon/assets/search';
import { icon as sortable } from '@opensearch-project/oui/src/components/icon/assets/sortable';
import { icon as sortDown } from '@opensearch-project/oui/src/components/icon/assets/sort_down';
import { icon as sortUp } from '@opensearch-project/oui/src/components/icon/assets/sort_up';
import { icon as stats } from '@opensearch-project/oui/src/components/icon/assets/stats';

appendIconComponentCache({
  apps,
  calendar,
  console,
  controlsHorizontal,
  document,
  download,
  filter,
  gear,
  home,
  iInCircle,
  menuLeft,
  questionInCircle,
  refresh,
  search,
  sortable,
  sortDown,
  sortUp,
  stats,
});
