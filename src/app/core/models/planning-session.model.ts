export type PlanningLevel = 'setup' | 'monthly' | 'weekly' | 'daily';

export type PriorityBand = 'P1' | 'P2' | 'P3' | 'P4';

export type TaskStatus = 'open' | 'done' | 'deferred' | 'waiting';

export type TaskArea =
  | 'Work / DVT'
  | 'UJ / RPL / Masters'
  | 'North Star'
  | 'Family / Kids'
  | 'Health'
  | 'Admin / Money'
  | 'Personal Projects';

export interface PlanningSessionOutput {
  planningSession: PlanningSessionRecord;
  plan?: PlanRecord;
  tasks?: PlanningTask[];
  calendarBlocks?: CalendarBlock[];
}

export interface PlanningSessionRecord {
  date: string;
  level: PlanningLevel;
  title: string;
  summary: string;
  mode?: string;
  decisions: string[];
  risks?: string[];
  nextActions: string[];
  createdAt?: unknown;
}

export interface PlanRecord {
  type: PlanningLevel;
  periodStart: string;
  periodEnd: string;
  mainPriority?: string;
  minimumWin?: string;
  stretchGoal?: string;
  shutdownTime?: string;
  notes?: string;
  createdAt?: unknown;
  updatedAt?: unknown;
}

export interface PlanningTask {
  title: string;
  priorityRank: number;
  priorityBand: PriorityBand;
  status: TaskStatus;
  area: TaskArea;
  plannedDate?: string | null;
  dueDate?: string | null;
  notes?: string;
  createdAt?: unknown;
  updatedAt?: unknown;
}

export interface CalendarBlock {
  title: string;
  start: string;
  end: string;
  type:
    | 'work'
    | 'family'
    | 'project'
    | 'admin'
    | 'health'
    | 'recovery'
    | 'football'
    | 'planning';
  notes?: string;
  createdAt?: unknown;
}