import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodaysLogComponent } from './todays-log.component';

describe('TodaysLogComponent', () => {
  let component: TodaysLogComponent;
  let fixture: ComponentFixture<TodaysLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodaysLogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TodaysLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
