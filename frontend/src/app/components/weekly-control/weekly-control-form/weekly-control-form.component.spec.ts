import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyControlFormComponent } from './weekly-control-form.component';

describe('WeeklyControlFormComponent', () => {
  let component: WeeklyControlFormComponent;
  let fixture: ComponentFixture<WeeklyControlFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeeklyControlFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeeklyControlFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
