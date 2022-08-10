import { Component, OnInit } from '@angular/core';
import { UIService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-login', // how we reference this component in html
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string = ''
  password: string = ''
  pending: boolean = false

  constructor(private uiService:UIService) { }

  ngOnInit(): void {
  }

  onSubmit(event: {preventDefault: () => void}): void {
    event.preventDefault()
    console.log('submit!')
    this.uiService.attemptLogin({
      username: this.username,
      password: this.password
    })
  }

}

// class is blueprint for an object
// similar to an interface - shape of an object