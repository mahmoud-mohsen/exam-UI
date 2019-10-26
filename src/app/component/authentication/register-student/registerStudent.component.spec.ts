import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterStudent } from './registerStudent.component';

describe('UserComponent', () => {
  let component: RegisterStudent;
  let fixture: ComponentFixture<RegisterStudent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterStudent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterStudent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
