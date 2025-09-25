import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyersHomeComponent } from './buyers-home.component';

describe('BuyersHomeComponent', () => {
  let component: BuyersHomeComponent;
  let fixture: ComponentFixture<BuyersHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyersHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyersHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
