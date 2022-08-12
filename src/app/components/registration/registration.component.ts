import { Component, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { UIService } from 'src/app/services/ui.service';
import { User } from '../../User';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  username: string = ''
  password: string = ''

  newuser: User [] = []

  constructor(private uiService:UIService) { 

  }

  ngOnInit(): void {
  }

  onUserReg(){
    
    if (!this.username){
      alert('add name')
      return
    }
    const userReg={
      username: this.username,
      password: this.password
    }

    // clear the form
    // this.username = ''
    // this.password = ''
   
    console.log(userReg)

    this.uiService.attemptRegistration({username: this.username,
      password: this.password})

       // clear the form
    this.username = ''
    this.password = ''
  }

  }

  
  


