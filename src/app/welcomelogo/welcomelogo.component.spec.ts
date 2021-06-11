import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomelogoComponent } from './welcomelogo.component';

describe('WelcomelogoComponent', () => {
  let component: WelcomelogoComponent;
  let fixture: ComponentFixture<WelcomelogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WelcomelogoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomelogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
