import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsAuthorizeComponent } from './transactions-authorize.component';

describe('TransactionsAuthorizeComponent', () => {
  let component: TransactionsAuthorizeComponent;
  let fixture: ComponentFixture<TransactionsAuthorizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionsAuthorizeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionsAuthorizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
