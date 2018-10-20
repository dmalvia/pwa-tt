import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MycardsComponent } from './mycards.component';

describe('MycardsComponent', () => {
  let component: MycardsComponent;
  let fixture: ComponentFixture<MycardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MycardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MycardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
