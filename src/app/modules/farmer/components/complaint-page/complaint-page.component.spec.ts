import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintPageComponent } from './complaint-page.component';

describe('ComplaintPageComponent', () => {
  let component: ComplaintPageComponent;
  let fixture: ComponentFixture<ComplaintPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComplaintPageComponent]
    });
    fixture = TestBed.createComponent(ComplaintPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
