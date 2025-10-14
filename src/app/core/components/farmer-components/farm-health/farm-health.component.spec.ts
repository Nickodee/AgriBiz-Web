import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmHealthComponent } from './farm-health.component';

describe('FarmHealthComponent', () => {
  let component: FarmHealthComponent;
  let fixture: ComponentFixture<FarmHealthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FarmHealthComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FarmHealthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
