import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMemoComponent } from './edit-memo.component';

describe('EditMemoComponent', () => {
  let component: EditMemoComponent;
  let fixture: ComponentFixture<EditMemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditMemoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditMemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
