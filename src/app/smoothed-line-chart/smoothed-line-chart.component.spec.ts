import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmoothedLineChartComponent } from './smoothed-line-chart.component';

describe('SmoothedLineChartComponent', () => {
  let component: SmoothedLineChartComponent;
  let fixture: ComponentFixture<SmoothedLineChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmoothedLineChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SmoothedLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
