import { TestBed, inject } from '@angular/core/testing';

import { WamodalService } from './wamodal.service';

describe('WamodalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WamodalService]
    });
  });

  it('should be created', inject([WamodalService], (service: WamodalService) => {
    expect(service).toBeTruthy();
  }));
});
