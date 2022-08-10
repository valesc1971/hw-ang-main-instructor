import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Memo} from 'src/app/Memo'
import { UIService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-edit-memo',
  templateUrl: './edit-memo.component.html',
  styleUrls: ['./edit-memo.component.css']
})
export class EditMemoComponent implements OnInit {

  //@input does not load the value right away, so it must be initialized  or allow to be undefined
  @Input() memo: Memo = {createdOn: new Date, text: ''}
  
  @Output() apply: EventEmitter<Memo> = new EventEmitter()
  @Output() cancel: EventEmitter<undefined> = new EventEmitter()
  
  newText: string =''   // init to the same as input ''

  constructor(private uiService: UIService) { }

  // just before this is calles, this.memo has been loaded with the correct value
  // from the html when loaded
  ngOnInit(): void {
  
  this.newText = this.memo.text
  }

  onApply(): void{

    // These 2 are equivalent
    // const newMemo = {
    //   ...this.memo,
    //   text: this.newText // this one overrides the line above
    //   newKey: 'newVal' // this one is added b/c it did not exist in the memo
    // }
    // const newMemo = {
    //   id: this.memo.id,
    //   createdOn: this.memo.createdOn,
    //   text: this.memo.text
    //   text: this.newText // this one overrides the line above
    //   newKey: 'newVal' // this one is added b/c it did not exist in the memo
    // }


    this.apply.emit({...this.memo, text:this.newText})  // from edit-memo html
  }

  onCancel(): void{
    this.cancel.emit()


}

}



