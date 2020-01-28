import { FirebaseService } from './../../../service/firebase.service';
import { ActiveUser } from '../../../model/ActiveUser.model';
import { GlobalBackEndService } from '../../../service/backEnd.service';
import { User, type } from '../../../model/user.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'createUser',
  templateUrl: './createUser.component.html',
  styleUrls: ['./createUser.component.css']
})
export class CreateUser implements OnInit {

  activeUser: ActiveUser;
  constructor(private globalBackEndService: GlobalBackEndService, private router: Router) {
    this.activeUser = JSON.parse(localStorage.getItem('user'));
  }
  ngOnInit() {
    this.user = new User();
  }

  user: User;
  createNewUser() {
    this.globalBackEndService.createNewEntity(this.user, "users", String(this.activeUser.id)).subscribe((data: any) => {
      this.user = { ...data };
      this.router.navigate(['userProfile', this.user.id]);
    },(error:any)=>{
      alert(error.error.message);
    });
  }

  imageName:String=null;
  prepareImage(image) {
    var file: File = image.files[0];
    this.imageName=file.name;
    var myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.user.image = myReader.result;
    }
    myReader.readAsDataURL(file);
    
  }
}
