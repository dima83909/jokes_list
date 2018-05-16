import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WamodalComponent } from './wamodal.component';

describe('WamodalComponent', () => {
  let component: WamodalComponent;
  let fixture: ComponentFixture<WamodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WamodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WamodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
