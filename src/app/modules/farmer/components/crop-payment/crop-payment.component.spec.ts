import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CropPaymentComponent } from './crop-payment.component';

describe('CropPaymentComponent', () => {
  let component: CropPaymentComponent;
  let fixture: ComponentFixture<CropPaymentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CropPaymentComponent]
    });
    fixture = TestBed.createComponent(CropPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
