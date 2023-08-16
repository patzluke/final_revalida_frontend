import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CropOrdersComponent } from './crop-orders.component';

describe('CropOrdersComponent', () => {
  let component: CropOrdersComponent;
  let fixture: ComponentFixture<CropOrdersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CropOrdersComponent]
    });
    fixture = TestBed.createComponent(CropOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
