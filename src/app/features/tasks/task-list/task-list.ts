import { Component, inject, signal } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PlanningStoreService } from '../../../core/services/planning-store.service';
import {
  PlanningTask,
  PriorityBand,
  TaskArea,
  TaskStatus,
} from '../../../core/models/planning-session.model';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-task-list',
  imports: [AsyncPipe, FormsModule],
  templateUrl: './task-list.html',
  styleUrl: './task-list.scss',
})
export class TaskList {
  private readonly planningStore = inject(PlanningStoreService);

  readonly tasks$ = this.planningStore.tasks$;

  readonly title = signal('');
  readonly area = signal<TaskArea>('Personal Projects');
  readonly priorityBand = signal<PriorityBand>('P2');
  readonly priorityRank = signal(1);
  readonly notes = signal('');

  readonly areas: TaskArea[] = [
    'Work / DVT',
    'UJ / RPL / Masters',
    'North Star',
    'Family / Kids',
    'Health',
    'Admin / Money',
    'Personal Projects',
  ];

  readonly priorityBands: PriorityBand[] = ['P1', 'P2', 'P3', 'P4'];

  updateStatus(taskId: string, status: TaskStatus): Promise<void> {
    return this.planningStore.updateTaskStatus(taskId, status);
  }

  async addTask(): Promise<void> {
    const title = this.title().trim();

    if (!title) {
      return;
    }

    const tasks = await firstValueFrom(this.tasks$);

    const openTasks = tasks.filter((task) => task.status === 'open');

    const nextRank =
      openTasks.length > 0 ? Math.max(...openTasks.map((task) => task.priorityRank)) + 1 : 1;

    await this.planningStore.createTask({
      title,
      priorityRank: nextRank,
      priorityBand: this.priorityBand(),
      status: 'open',
      area: this.area(),
      plannedDate: new Date().toISOString().slice(0, 10),
      dueDate: null,
      notes: this.notes().trim(),
    });

    this.title.set('');
    this.priorityBand.set('P2');
    this.priorityRank.set(nextRank + 1);
    this.area.set('Personal Projects');
    this.notes.set('');
  }

  moveUp(task: PlanningTask & { id: string }): Promise<void> {
    if (task.priorityRank <= 1) {
      return Promise.resolve();
    }

    return this.planningStore.updateTaskRank(task.id, task.priorityRank - 1);
  }

  moveDown(task: PlanningTask & { id: string }): Promise<void> {
    return this.planningStore.updateTaskRank(task.id, task.priorityRank + 1);
  }
}
