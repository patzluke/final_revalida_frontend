import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmingTipComponent } from './farming-tip.component';

describe('FarmingTipComponent', () => {
  let component: FarmingTipComponent;
  let fixture: ComponentFixture<FarmingTipComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FarmingTipComponent]
    });
    fixture = TestBed.createComponent(FarmingTipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
