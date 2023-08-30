import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Error402Component } from './error402.component';

describe('Error402Component', () => {
  let component: Error402Component;
  let fixture: ComponentFixture<Error402Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Error402Component]
    });
    fixture = TestBed.createComponent(Error402Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
