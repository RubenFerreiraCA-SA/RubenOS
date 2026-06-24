import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanningCapture } from './planning-capture';

describe('PlanningCapture', () => {
  let component: PlanningCapture;
  let fixture: ComponentFixture<PlanningCapture>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanningCapture]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanningCapture);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
