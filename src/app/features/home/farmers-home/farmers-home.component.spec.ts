import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmersHomeComponent } from './farmers-home.component';

describe('FarmersHomeComponent', () => {
  let component: FarmersHomeComponent;
  let fixture: ComponentFixture<FarmersHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FarmersHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FarmersHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
