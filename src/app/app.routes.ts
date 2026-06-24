import { Routes } from '@angular/router';

import { Dashboard } from './features/dashboard/dashboard';
import { PlanningCapture } from './features/planning/planning-capture/planning-capture';
import { PlanningLogs } from './features/planning/planning-logs/planning-logs';
import { TaskList } from './features/tasks/task-list/task-list';
import { UserContext } from './features/context/user-context/user-context';

export const routes: Routes = [
  {
    path: '',
    component: Dashboard,
  },
  {
    path: 'planning/capture',
    component: PlanningCapture,
  },
  {
    path: 'planning/logs',
    component: PlanningLogs,
  },
  {
    path: 'tasks',
    component: TaskList,
  },
  {
    path: 'context',
    component: UserContext,
  },
];