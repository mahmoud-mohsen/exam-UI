import { EnrollCourse } from './../../../model/enrollCourse.model';
import { GlobalBackEndService } from './../../../service/backEnd.service';
import { ActiveUser } from './../../../model/ActiveUser.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-enroll-requests',
  templateUrl: './view-enroll-requests.component.html',
  styleUrls: ['./view-enroll-requests.component.css']
})
export class ViewEnrollRequestsComponent implements OnInit {

  activeUser: ActiveUser;
  enrollCourse: EnrollCourse[];
  enrollStatus;
  constructor(private globalBackEndService: GlobalBackEndService) {
    this.activeUser = JSON.parse(localStorage.getItem('user'));
    this.enrollCourse = [];
    this.enrollStatus="PENDING";
  }

  ngOnInit() {
    this.viewEnrollRequests();
  }

  viewEnrollRequests() {
    let url = 'enrollRequest';
    this.globalBackEndService.ViewEntities(url, String(this.activeUser.id), { status: this.enrollStatus }).subscribe((response: any) => {
      this.enrollCourse = response;
      this.enrollCourse = this.enrollCourse.sort((obj1, obj2) => {
        if (obj1.creationTime < obj2.creationTime) {
          return 1;
        }

        if (obj1.creationTime > obj2.creationTime) {
          return -1;
        }

        return 0;
      });

    }, (error) => {
      alert(error.error.message);

    });
  }

  approveEnrollRequest(enrollRequest) {
    this.updateEnrollCourseRequesStatus(enrollRequest, "APPROVE");
  }

  rejectEnrollRequest(enrollRequest) {
    this.updateEnrollCourseRequesStatus(enrollRequest, "REJECT");
  }

  updateEnrollCourseRequesStatus(enrollRequest, status) {
    let entity = {
      enrollCourseRequestId: enrollRequest.id,
      action: status
    }
    let url = "course/enroll/status/update";
    this.globalBackEndService.createNewEntity(entity, url, String(this.activeUser.id)).subscribe((response: any) => {
      const index: number = this.enrollCourse.indexOf(enrollRequest);
      if (index !== -1) {
        this.enrollCourse.splice(index, 1);        
      }
    }, (error => {
      alert(error.error.message);
    }));
  }

  changeStatus(){
    this.viewEnrollRequests();
  }
}
