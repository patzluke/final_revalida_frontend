import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CropAdvertisementsComponent } from './crop-advertisements.component';

describe('CropAdvertisementsComponent', () => {
  let component: CropAdvertisementsComponent;
  let fixture: ComponentFixture<CropAdvertisementsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CropAdvertisementsComponent]
    });
    fixture = TestBed.createComponent(CropAdvertisementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
