import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyControlListComponent } from './weekly-control-list.component';

describe('WeeklyControlListComponent', () => {
  let component: WeeklyControlListComponent;
  let fixture: ComponentFixture<WeeklyControlListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeeklyControlListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeeklyControlListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
