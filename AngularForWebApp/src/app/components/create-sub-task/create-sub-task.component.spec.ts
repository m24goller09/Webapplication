import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSubTaskComponent } from './create-sub-task.component';

describe('CreateSubTaskComponent', () => {
  let component: CreateSubTaskComponent;
  let fixture: ComponentFixture<CreateSubTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSubTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSubTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
