import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login', // how we reference this component in html
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string = ''
  password: string = ''
  pending: boolean = false

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(event: {preventDefault: () => void}): void {
    event.preventDefault()
    console.log('submit!!')
  }

}

// class is blueprint for an object
// similar to an interface - shape of an object