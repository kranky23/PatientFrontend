import { TestBed } from '@angular/core/testing';

import { ProgressAndSectionsService } from './progress-and-sections.service';

describe('ProgressAndSectionsService', () => {
  let service: ProgressAndSectionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgressAndSectionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
