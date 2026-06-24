import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  orderBy,
  query,
  serverTimestamp,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

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
    query(
      collection(this.firestore, 'planningLogs'),
      orderBy('createdAt', 'desc'),
    ),
    { idField: 'id' },
  ) as Observable<(PlanningSessionRecord & { id: string })[]>;

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
      await Promise.all(
        output.calendarBlocks.map((block) => this.saveCalendarBlock(block, now)),
      );
    }
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

  private saveCalendarBlock(
    block: CalendarBlock,
    now: unknown,
  ): Promise<unknown> {
    return addDoc(collection(this.firestore, 'calendarBlocks'), {
      ...block,
      createdAt: now,
    });
  }
}