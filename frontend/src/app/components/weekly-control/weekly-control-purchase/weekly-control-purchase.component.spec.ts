import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyControlPurchaseComponent } from './weekly-control-purchase.component';

describe('WeeklyControlPurchaseComponent', () => {
  let component: WeeklyControlPurchaseComponent;
  let fixture: ComponentFixture<WeeklyControlPurchaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeeklyControlPurchaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeeklyControlPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
