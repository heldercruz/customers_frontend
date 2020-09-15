import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNewcustomerComponent } from './admin-newcustomer.component';

describe('AdminNewcustomerComponent', () => {
  let component: AdminNewcustomerComponent;
  let fixture: ComponentFixture<AdminNewcustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminNewcustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminNewcustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
