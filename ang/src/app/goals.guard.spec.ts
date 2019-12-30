import { TestBed, async, inject } from '@angular/core/testing';

import { GoalsGuard } from './goals.guard';

describe('GoalsGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GoalsGuard]
    });
  });

  it('should ...', inject([GoalsGuard], (guard: GoalsGuard) => {
    expect(guard).toBeTruthy();
  }));
});
