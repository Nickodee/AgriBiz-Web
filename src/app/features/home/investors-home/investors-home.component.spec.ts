import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestorsHomeComponent } from './investors-home.component';

describe('InvestorsHomeComponent', () => {
  let component: InvestorsHomeComponent;
  let fixture: ComponentFixture<InvestorsHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvestorsHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvestorsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
