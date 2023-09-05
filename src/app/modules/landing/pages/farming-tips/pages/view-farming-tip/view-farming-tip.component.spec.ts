import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFarmingTipComponent } from './view-farming-tip.component';

describe('ViewFarmingTipComponent', () => {
  let component: ViewFarmingTipComponent;
  let fixture: ComponentFixture<ViewFarmingTipComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewFarmingTipComponent]
    });
    fixture = TestBed.createComponent(ViewFarmingTipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
