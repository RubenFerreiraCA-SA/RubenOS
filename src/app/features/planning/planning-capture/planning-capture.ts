import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { PlanningStoreService } from '../../../core/services/planning-store.service';
import { PlanningSessionOutput } from '../../../core/models/planning-session.model';

@Component({
  selector: 'app-planning-capture',
  imports: [FormsModule],
  templateUrl: './planning-capture.html',
  styleUrl: './planning-capture.scss',
})
export class PlanningCapture {
  private readonly planningStore = inject(PlanningStoreService);

  readonly rawJson = signal('');
  readonly status = signal<string | null>(null);
  readonly error = signal<string | null>(null);

  async save(): Promise<void> {
    this.status.set(null);
    this.error.set(null);

    try {
      const parsed = JSON.parse(this.rawJson()) as PlanningSessionOutput;

      if (!parsed.planningSession) {
        throw new Error('Missing planningSession object.');
      }

      await this.planningStore.savePlanningSession(parsed);

      this.status.set('Planning session saved.');
      this.rawJson.set('');
    } catch (err) {
      this.error.set(
        err instanceof Error ? err.message : 'Could not save planning session.',
      );
    }
  }
}