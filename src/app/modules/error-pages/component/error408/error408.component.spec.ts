import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Error408Component } from './error408.component';

describe('Error408Component', () => {
  let component: Error408Component;
  let fixture: ComponentFixture<Error408Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Error408Component]
    });
    fixture = TestBed.createComponent(Error408Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
