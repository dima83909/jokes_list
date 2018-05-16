import { TestBed, inject } from '@angular/core/testing';

import { WamdragService } from './wamdrag.service';

describe('WamdragService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WamdragService]
    });
  });

  it('should be created', inject([WamdragService], (service: WamdragService) => {
    expect(service).toBeTruthy();
  }));
});
