import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewExamSolversComponent } from './view-exam-solvers.component';

describe('ViewExamSolversComponent', () => {
  let component: ViewExamSolversComponent;
  let fixture: ComponentFixture<ViewExamSolversComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewExamSolversComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewExamSolversComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
