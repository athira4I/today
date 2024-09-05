import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrafficRecognizedComponent } from './traffic-recognized.component';

describe('TrafficRecognizedComponent', () => {
  let component: TrafficRecognizedComponent;
  let fixture: ComponentFixture<TrafficRecognizedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrafficRecognizedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrafficRecognizedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
