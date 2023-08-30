import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Error414Component } from './error414.component';

describe('Error414Component', () => {
  let component: Error414Component;
  let fixture: ComponentFixture<Error414Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Error414Component]
    });
    fixture = TestBed.createComponent(Error414Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
