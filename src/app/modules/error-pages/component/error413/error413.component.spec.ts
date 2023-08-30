import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Error413Component } from './error413.component';

describe('Error413Component', () => {
  let component: Error413Component;
  let fixture: ComponentFixture<Error413Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Error413Component]
    });
    fixture = TestBed.createComponent(Error413Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
