import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  doc,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from '@angular/fire/firestore';
import { Observable, map } from 'rxjs';

import {
  CalendarBlock,
  PlanningSessionOutput,
  PlanningSessionRecord,
  PlanningTask,
  PlanRecord,
} from '../models/planning-session.model';

@Injectable({
  providedIn: 'root',
})
export class PlanningStoreService {
  private readonly firestore = inject(Firestore);

  readonly planningLogs$ = collectionData(
    query(collection(this.firestore, 'planningLogs'), orderBy('createdAt', 'desc')),
    { idField: 'id' },
  ) as Observable<(PlanningSessionRecord & { id: string })[]>;

readonly tasks$ = collectionData(
  query(
    collection(this.firestore, 'tasks'),
    orderBy('priorityRank', 'asc'),
  ),
  { idField: 'id' },
).pipe(
  map((tasks) =>
    (tasks as (PlanningTask & { id: string })[]).sort((a, b) => {
      const statusWeight = (status: string): number => {
        if (status === 'open') return 1;
        if (status === 'waiting') return 2;
        if (status === 'deferred') return 3;
        if (status === 'done') return 4;
        return 5;
      };

      return (
        statusWeight(a.status) - statusWeight(b.status) ||
        a.priorityRank - b.priorityRank
      );
    }),
  ),
) as Observable<(PlanningTask & { id: string })[]>;
  async savePlanningSession(output: PlanningSessionOutput): Promise<void> {
    const now = serverTimestamp();

    await addDoc(collection(this.firestore, 'planningLogs'), {
      ...output.planningSession,
      createdAt: now,
    });

    if (output.plan) {
      await this.savePlan(output.plan, now);
    }

    if (output.tasks?.length) {
      await Promise.all(output.tasks.map((task) => this.saveTask(task, now)));
    }

    if (output.calendarBlocks?.length) {
      await Promise.all(output.calendarBlocks.map((block) => this.saveCalendarBlock(block, now)));
    }
  }

  async updateTaskStatus(
    taskId: string,
    status: 'open' | 'done' | 'deferred' | 'waiting',
  ): Promise<void> {
    const taskRef = doc(this.firestore, `tasks/${taskId}`);

    await updateDoc(taskRef, {
      status,
      updatedAt: serverTimestamp(),
    });
  }

  async createTask(task: Omit<PlanningTask, 'createdAt' | 'updatedAt'>): Promise<void> {
    const now = serverTimestamp();

    await addDoc(collection(this.firestore, 'tasks'), {
      ...task,
      createdAt: now,
      updatedAt: now,
    });
  }

  private savePlan(plan: PlanRecord, now: unknown): Promise<unknown> {
    return addDoc(collection(this.firestore, 'plans'), {
      ...plan,
      createdAt: now,
      updatedAt: now,
    });
  }

  private saveTask(task: PlanningTask, now: unknown): Promise<unknown> {
    return addDoc(collection(this.firestore, 'tasks'), {
      ...task,
      createdAt: now,
      updatedAt: now,
    });
  }

  private saveCalendarBlock(block: CalendarBlock, now: unknown): Promise<unknown> {
    return addDoc(collection(this.firestore, 'calendarBlocks'), {
      ...block,
      createdAt: now,
    });
  }
}
