import { Component, inject, signal } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PlanningStoreService } from '../../../core/services/planning-store.service';
import {
  PriorityBand,
  TaskArea,
  TaskStatus,
} from '../../../core/models/planning-session.model';

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

    await this.planningStore.createTask({
      title,
      priorityRank: this.priorityRank(),
      priorityBand: this.priorityBand(),
      status: 'open',
      area: this.area(),
      plannedDate: new Date().toISOString().slice(0, 10),
      dueDate: null,
      notes: this.notes().trim(),
    });

    this.title.set('');
    this.priorityBand.set('P2');
    this.priorityRank.set(1);
    this.area.set('Personal Projects');
    this.notes.set('');
  }
}