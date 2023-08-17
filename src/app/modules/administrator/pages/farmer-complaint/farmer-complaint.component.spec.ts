import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerComplaintComponent } from './farmer-complaint.component';

describe('FarmerComplaintComponent', () => {
  let component: FarmerComplaintComponent;
  let fixture: ComponentFixture<FarmerComplaintComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FarmerComplaintComponent]
    });
    fixture = TestBed.createComponent(FarmerComplaintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
