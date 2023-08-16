import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCropComponent } from './edit-crop.component';

describe('EditCropComponent', () => {
  let component: EditCropComponent;
  let fixture: ComponentFixture<EditCropComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditCropComponent]
    });
    fixture = TestBed.createComponent(EditCropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
