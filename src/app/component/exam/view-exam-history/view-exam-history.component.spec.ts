import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewExamHistoryComponent } from './view-exam-history.component';

describe('ViewExamHistoryComponent', () => {
  let component: ViewExamHistoryComponent;
  let fixture: ComponentFixture<ViewExamHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewExamHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewExamHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
