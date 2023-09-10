import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierComplaintComponent } from './supplier-complaint.component';

describe('SupplierComplaintComponent', () => {
  let component: SupplierComplaintComponent;
  let fixture: ComponentFixture<SupplierComplaintComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SupplierComplaintComponent]
    });
    fixture = TestBed.createComponent(SupplierComplaintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
