import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FhgComponent } from './fhg.component';

describe('FhgComponent', () => {
  let component: FhgComponent;
  let fixture: ComponentFixture<FhgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FhgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FhgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
