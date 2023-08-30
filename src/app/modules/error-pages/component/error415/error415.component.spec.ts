import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Error415Component } from './error415.component';

describe('Error415Component', () => {
  let component: Error415Component;
  let fixture: ComponentFixture<Error415Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Error415Component]
    });
    fixture = TestBed.createComponent(Error415Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
