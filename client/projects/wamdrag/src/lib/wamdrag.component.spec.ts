import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WamdragComponent } from './wamdrag.component';

describe('WamdragComponent', () => {
  let component: WamdragComponent;
  let fixture: ComponentFixture<WamdragComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WamdragComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WamdragComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
