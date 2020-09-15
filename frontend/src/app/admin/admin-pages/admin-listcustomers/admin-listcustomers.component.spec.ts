import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminListcustomersComponent } from './admin-listcustomers.component';

describe('AdminListcustomersComponent', () => {
  let component: AdminListcustomersComponent;
  let fixture: ComponentFixture<AdminListcustomersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminListcustomersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminListcustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
