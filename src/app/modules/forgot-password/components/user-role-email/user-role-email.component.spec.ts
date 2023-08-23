import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRoleEmailComponent } from './user-role-email.component';

describe('UserRoleEmailComponent', () => {
  let component: UserRoleEmailComponent;
  let fixture: ComponentFixture<UserRoleEmailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserRoleEmailComponent]
    });
    fixture = TestBed.createComponent(UserRoleEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
