import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDeleteConfirmationdialogComponent } from './employee-delete-confirmationdialog.component';

describe('EmployeeDeleteConfirmationdialogComponent', () => {
  let component: EmployeeDeleteConfirmationdialogComponent;
  let fixture: ComponentFixture<EmployeeDeleteConfirmationdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeDeleteConfirmationdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeDeleteConfirmationdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
