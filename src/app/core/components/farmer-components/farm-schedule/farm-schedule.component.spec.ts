import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmScheduleComponent } from './farm-schedule.component';

describe('FarmScheduleComponent', () => {
  let component: FarmScheduleComponent;
  let fixture: ComponentFixture<FarmScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FarmScheduleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FarmScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
