import { Component, inject } from '@angular/core';
import { AsyncPipe, DatePipe } from '@angular/common';

import { PlanningStoreService } from '../../../core/services/planning-store.service';

@Component({
  selector: 'app-planning-logs',
  imports: [AsyncPipe, DatePipe],
  templateUrl: './planning-logs.html',
  styleUrl: './planning-logs.scss',
})
export class PlanningLogs {
  private readonly planningStore = inject(PlanningStoreService);

  readonly logs$ = this.planningStore.planningLogs$;
}