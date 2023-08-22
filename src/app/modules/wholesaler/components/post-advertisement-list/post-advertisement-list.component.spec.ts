import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostAdvertisementListComponent } from './post-advertisement-list.component';

describe('PostAdvertisementListComponent', () => {
  let component: PostAdvertisementListComponent;
  let fixture: ComponentFixture<PostAdvertisementListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostAdvertisementListComponent]
    });
    fixture = TestBed.createComponent(PostAdvertisementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
