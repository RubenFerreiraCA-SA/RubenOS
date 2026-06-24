import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';

import { PlanningStoreService } from '../../core/services/planning-store.service';

@Component({
  selector: 'app-dashboard',
  imports: [AsyncPipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  private readonly planningStore = inject(PlanningStoreService);

  readonly logs$ = this.planningStore.planningLogs$;
  readonly tasks$ = this.planningStore.tasks$;
}