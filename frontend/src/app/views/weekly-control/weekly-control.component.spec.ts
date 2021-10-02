import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyControlComponent } from './weekly-control.component';

describe('WeeklyControlComponent', () => {
  let component: WeeklyControlComponent;
  let fixture: ComponentFixture<WeeklyControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeeklyControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeeklyControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
