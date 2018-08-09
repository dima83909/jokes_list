import { TestBed, inject } from '@angular/core/testing';

import { WacomService } from './wacom.service';

describe('WacomService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WacomService]
    });
  });

  it('should be created', inject([WacomService], (service: WacomService) => {
    expect(service).toBeTruthy();
  }));
});
