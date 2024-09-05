import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrafficSourceTypeComponent } from './traffic-source-type.component';

describe('TrafficSourceTypeComponent', () => {
  let component: TrafficSourceTypeComponent;
  let fixture: ComponentFixture<TrafficSourceTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrafficSourceTypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrafficSourceTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
