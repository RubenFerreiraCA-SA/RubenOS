import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserContext } from './user-context';

describe('UserContext', () => {
  let component: UserContext;
  let fixture: ComponentFixture<UserContext>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserContext]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserContext);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
