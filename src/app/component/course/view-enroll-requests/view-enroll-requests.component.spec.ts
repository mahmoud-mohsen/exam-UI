import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEnrollRequestsComponent } from './view-enroll-requests.component';

describe('ViewEnrollRequestsComponent', () => {
  let component: ViewEnrollRequestsComponent;
  let fixture: ComponentFixture<ViewEnrollRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewEnrollRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEnrollRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
