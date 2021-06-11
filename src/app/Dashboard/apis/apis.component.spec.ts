import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { APIsComponent } from './apis.component';

describe('APIsComponent', () => {
  let component: APIsComponent;
  let fixture: ComponentFixture<APIsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ APIsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(APIsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
