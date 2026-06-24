import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanningLogs } from './planning-logs';

describe('PlanningLogs', () => {
  let component: PlanningLogs;
  let fixture: ComponentFixture<PlanningLogs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanningLogs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanningLogs);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
