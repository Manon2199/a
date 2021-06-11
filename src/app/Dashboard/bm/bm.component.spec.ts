import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BMComponent } from './bm.component';

describe('BMComponent', () => {
  let component: BMComponent;
  let fixture: ComponentFixture<BMComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BMComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
