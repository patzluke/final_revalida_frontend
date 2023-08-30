import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Error406Component } from './error406.component';

describe('Error406Component', () => {
  let component: Error406Component;
  let fixture: ComponentFixture<Error406Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Error406Component]
    });
    fixture = TestBed.createComponent(Error406Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
