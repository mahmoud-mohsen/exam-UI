import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUser } from './createUser.component';

describe('UserComponent', () => {
  let component: CreateUser;
  let fixture: ComponentFixture<CreateUser>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateUser ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUser);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
