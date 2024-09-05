import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrafficOrganizationComponent } from './traffic-organization.component';

describe('TrafficOrganizationComponent', () => {
  let component: TrafficOrganizationComponent;
  let fixture: ComponentFixture<TrafficOrganizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrafficOrganizationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrafficOrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
