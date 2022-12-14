import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {Memo} from 'src/app/Memo';
import { MemosService } from './memos.service';
import { UsersService } from './users.service';
import { User } from '../User';

@Injectable({
  providedIn: 'root'
})

export class UIService {
  // Subject: to keep track of the events with subject -  (show edit value)

  showCreateMemoSubject: Subject<boolean> = new Subject()
  
  memosSubject: Subject<Memo[]> = new Subject() // allows to observe changes to the memo[]
  private nextID: number = 0
  memos: Memo[] = []

  editSubject: Subject<number | undefined> = new Subject()
  userSubject: Subject<string | undefined> = new Subject()

  username: string | undefined = ''  // 6. make a user name to be used in dummyUserNameUpdate

  userID: number | undefined
  isLoggingIn: boolean = true
  isLoggingInSubject: Subject<boolean> = new Subject()

constructor(private usersService: UsersService, private memosService: MemosService) { }
// actions that happen to the app

dummyMemosUpdate() {
  this.memosSubject.next(this.memos)   //  to the current state
}

dummyUsernameUpdate(): void{   // 5. try tu update the userSubject
  this.userSubject.next(this.username)
}

// response - returns an observable
whenMemosListUpdated(): Observable<Memo[]> {
  return this.memosSubject.asObservable()
}


// actions that happen to the application
//starting the process of adding the memo
startAddMemo(): void{
  
  // notify the observable that this action happens 

  // keep track of the startaddmemo action with subject
  this.showCreateMemoSubject.next(true)  // 2.1 uiservices transitions the state to true 
  //for creating a memo = true  (add) to memos.ts 
  // whenever initiated this process (as soon as it is clicked) I want it to be true
}

// to listen to that, i want to return an observable 

whenAddMemoChanges(): Observable<boolean>{  // observable it is not a complete type, so it needs to have a type
  
  // I get that observable from my subject
  // parent needs to listen when added memo started ---- memos.ts
  return this.showCreateMemoSubject.asObservable()  // ----listening to state change
  // 4. for creating a memo - comes from memo.ts / 
}

cancelAddMemo(): void{     // actions to triggers (transition state in this case)
  // transition to showCreateMemo false state /  hiding the memo dialog
  this.showCreateMemoSubject.next(false)   //  2.2 for creating a memo = false  (cancel) to memos.ts
}

// actions (that can happen to the app)
// if this method is called, this event (applyCreateMemo Happened)
//notify the uiservice that his particular method happens

applyCreateMemoHappened(text: string): void{  // text needs to be provided
// notify the obsrvable that the event occurred
// modify the state, push the new memo into the list

const newMemo: Memo = {
  userID: this.userID,
  createdOn: new Date(),
  text
}

this.memosService.add(newMemo).subscribe(() => {
  this.refreshMemos()
  this.showCreateMemoSubject.next(false)
})
  // this.memos.push(newMemo)  // push into memos list
  // this.memosSubject.next(this.memos) // notify who needs to be notified
  // this.showCreateMemoSubject.next(false)

}

// events that can be triggered as a resulto of those actions

 // store the event
 // components will change
//whenApplyCreateMemo(): void{
// return an observable that can be subscribed to


// trigger
deleteMemoHappened(id: number): void {
  this.memos = this.memos.filter(memo => memo.id !== id)
  this.memosSubject.next(this.memos)
}


// trigger an edit
startEditing(id:number): void{
  this.editSubject.next(id)
}

// listen for an edit

whenEditingStarts(): Observable<number | undefined> {
  return this.editSubject.asObservable()
}


cancelEditing(): void{
  this.editSubject.next(undefined)
}

applyTheEdit(id: number, text: string) {
  const memoToEdit = this.memos.find(memo => memo.id === id)

  if (memoToEdit){
    memoToEdit.text = text
    this.memosSubject.next(this.memos)
    this.editSubject.next(undefined)
  }
  else
  console.log('id not found, cannot apply edit')

}

private refreshMemos(): void {
  if (this.userID !== undefined)
    this.memosService.getByUserID(this.userID)
      .subscribe(memos => {
        this.memos = memos
        this.memosSubject.next(memos)
      })
  else
    console.log('Backend returned a user w/o an id')
}


attemptLogin(credentials: {username: string, password: string}): void {  
  this.usersService.get(credentials.username, credentials.password)
  .subscribe(maybeAUser => {
    if (maybeAUser !== undefined) {
      this.username = credentials.username
      this.userID = maybeAUser.id
      this.userSubject.next(this.username)
      this.refreshMemos()
    } else 
 
    console.log('login failed')
  })
}

//4. registration: ui.service receives the info -----attempRegistration --- send the info to usersService --- postUserReg and subscribe to the observer username/password

attemptRegister(credentials: { username: string; password: string; }) {
  this.usersService.add(credentials).subscribe(() => {
    this.attemptLogin(credentials)
  })
}

// attemptRegistration(credentials: {username: string, password: string}) {  
//   this.usersService.postUserReg(credentials.username, credentials.password).subscribe(maybeAUser => {
//     if (maybeAUser !== undefined) {
//       this.username = credentials.username
//       this.userSubject.next(this.username)
//     } else
//     console.log('registration failed')
//   })




//   if (credentials.username === 'mad' && credentials.password === 'pass'){ // check if hardcoded values / authentication of credentials
//     this.username = credentials.username   // 7. need to get the username from the login
//     this.userSubject.next(credentials.username)} // 8. update userSubject and pushes the value (next -- method that takes the message and passing into the observable (in this case, credential.username))
//   else
//     console.log('login failed')
// }



logout(): void{
  this.userSubject.next(undefined)
}

whenUsernameChanges(): Observable<string | undefined>{
  //console.log('whenusername changes')
  return this.userSubject.asObservable()

}


whenIsLogginInChanges(): Observable<boolean> {
  return this.isLoggingInSubject.asObservable()
}

showRegisterPage(): void {
  this.isLoggingIn = false
  this.isLoggingInSubject.next(this.isLoggingIn)
}

showLoginPage(): void {
  this.isLoggingIn = true
  this.isLoggingInSubject.next(this.isLoggingIn)
}

}



