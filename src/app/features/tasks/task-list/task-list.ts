import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';

import { PlanningStoreService } from '../../../core/services/planning-store.service';

@Component({
  selector: 'app-task-list',
  imports: [AsyncPipe],
  templateUrl: './task-list.html',
  styleUrl: './task-list.scss',
})
export class TaskList {
  private readonly planningStore = inject(PlanningStoreService);

  readonly tasks$ = this.planningStore.tasks$;
}