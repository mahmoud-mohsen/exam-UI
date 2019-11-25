import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSolverAnswersComponent } from './view-solver-answers.component';

describe('ViewSolverAnswersComponent', () => {
  let component: ViewSolverAnswersComponent;
  let fixture: ComponentFixture<ViewSolverAnswersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSolverAnswersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSolverAnswersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
