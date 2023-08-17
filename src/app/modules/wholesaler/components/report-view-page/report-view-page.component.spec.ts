import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportViewPageComponent } from './report-view-page.component';

describe('ReportViewPageComponent', () => {
  let component: ReportViewPageComponent;
  let fixture: ComponentFixture<ReportViewPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportViewPageComponent]
    });
    fixture = TestBed.createComponent(ReportViewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
