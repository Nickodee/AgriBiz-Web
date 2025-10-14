import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchuduleDeliveriesComponent } from './schudule-deliveries.component';

describe('SchuduleDeliveriesComponent', () => {
  let component: SchuduleDeliveriesComponent;
  let fixture: ComponentFixture<SchuduleDeliveriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchuduleDeliveriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchuduleDeliveriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
