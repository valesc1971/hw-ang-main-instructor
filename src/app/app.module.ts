import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import {MatToolbarModule} from '@angular/material/toolbar';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { MemoComponent } from './components/memo/memo.component';
import { EditMemoComponent } from './components/edit-memo/edit-memo.component';
import { MemosComponent } from './components/memos/memos.component';
import { HeaderComponent } from './components/header/header.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MemoComponent,
    EditMemoComponent,
    MemosComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule, 
    FlexLayoutModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    FormsModule,
    MatToolbarModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
