import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostAdvertisementResponseListComponent } from './post-advertisement-response-list.component';

describe('PostAdvertisementResponseListComponent', () => {
  let component: PostAdvertisementResponseListComponent;
  let fixture: ComponentFixture<PostAdvertisementResponseListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostAdvertisementResponseListComponent]
    });
    fixture = TestBed.createComponent(PostAdvertisementResponseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
