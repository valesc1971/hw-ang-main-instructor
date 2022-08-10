import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {Memo} from 'src/app/Memo'

@Injectable({
  providedIn: 'root'
})

export class UIService {
  // keep track of the events with subject -  (show edit value)

  showCreateMemoSubject: Subject<boolean> = new Subject()
  memosSubject: Subject<Memo[]> = new Subject()
  private nextID: number = 0
  memos: Memo[] = [
    {id: ++this.nextID, createdOn: new Date, text: 'same in service 1'},
    {id: ++this.nextID, createdOn: new Date, text: 'same in service 2'},
    {id: ++this.nextID, createdOn: new Date, text: 'same in service 3'},
    {id: ++this.nextID, createdOn: new Date, text: 'same in service 4'},
    {id: ++this.nextID, createdOn: new Date, text: 'same in service 5'},
  ]

  editSubject: Subject<number | undefined> = new Subject()
  userSubject: Subject<string | undefined> = new Subject()

constructor() { }
// actions that happen to the app

dummyMemosUpdate() {
  this.memosSubject.next(this.memos)
}

whenMemosListUpdated(): Observable<Memo[]> {
  return this.memosSubject.asObservable()
}

//starting the process of adding the memo
startAddMemo(): void{
  // notify the observable that this action happens 
  this.showCreateMemoSubject.next(true)  // 2.1 for creating a memo = true  (add) to memos.ts 
                          // as soon as it is clicked, I want it to be true
}

whenAddMemoChanges(): Observable<boolean>{  // observable it is not a complete type, so it needs to have a type
  return this.showCreateMemoSubject.asObservable()  // 4. for creating a memo - comes from memo.ts / 
}

cancelAddMemo(): void{
  // transition to showCreateMemo false state /  hiding the memo dialog
  this.showCreateMemoSubject.next(false)   //  2.2 for creating a memo = false  (cancel) to memos.ts
}

applyCreateMemoHappened(text: string): void{
// notify the obsrvable that the event occurred
const newMemo: Memo = {
  id: ++this.nextID,
  createdOn: new Date(),  
  text
}

  this.memos.push(newMemo)
  this.memosSubject.next(this.memos)
  this.showCreateMemoSubject.next(false)

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

attemptLogin(credentials: {username: string, password: string}): void {
  if (credentials.username === 'mad' && credentials.password === 'pass')
    this.userSubject.next(credentials.username)
  else
    console.log('login failed')
}



logout(): void{
  this.userSubject.next(undefined)
}

whenUsernameChanges(): Observable<string | undefined>{
  return this.userSubject.asObservable()

}
}



