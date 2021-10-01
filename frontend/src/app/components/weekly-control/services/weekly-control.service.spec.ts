import { TestBed } from '@angular/core/testing';

import { WeeklyControlService } from './weekly-control.service';

describe('WeeklyControlService', () => {
  let service: WeeklyControlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeeklyControlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
