import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganisationStatsComponent } from './organisation-stats.component';

describe('OrganisationStatsComponent', () => {
  let component: OrganisationStatsComponent;
  let fixture: ComponentFixture<OrganisationStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganisationStatsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrganisationStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
