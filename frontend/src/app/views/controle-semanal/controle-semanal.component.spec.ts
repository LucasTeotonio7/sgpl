import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControleSemanalComponent } from './controle-semanal.component';

describe('ControleSemanalComponent', () => {
  let component: ControleSemanalComponent;
  let fixture: ComponentFixture<ControleSemanalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControleSemanalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControleSemanalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
