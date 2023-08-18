import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostAdvertisementResponsesComponent } from './post-advertisement-responses.component';

describe('PostAdvertisementResponsesComponent', () => {
  let component: PostAdvertisementResponsesComponent;
  let fixture: ComponentFixture<PostAdvertisementResponsesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostAdvertisementResponsesComponent]
    });
    fixture = TestBed.createComponent(PostAdvertisementResponsesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
