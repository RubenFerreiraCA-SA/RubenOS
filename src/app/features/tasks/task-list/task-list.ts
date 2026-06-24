import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';

import { PlanningStoreService } from '../../../core/services/planning-store.service';
import { TaskStatus } from '../../../core/models/planning-session.model';

@Component({
  selector: 'app-task-list',
  imports: [AsyncPipe],
  templateUrl: './task-list.html',
  styleUrl: './task-list.scss',
})
export class TaskList {
  private readonly planningStore = inject(PlanningStoreService);

  readonly tasks$ = this.planningStore.tasks$;

  updateStatus(taskId: string, status: TaskStatus): Promise<void> {
    return this.planningStore.updateTaskStatus(taskId, status);
  }
}