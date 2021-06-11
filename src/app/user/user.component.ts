import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, HostBinding, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, provideRoutes } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],animations: [trigger(
    'toggleNav',
    [
        state( 'collapsed, void', style({transform: 'translateX(-100%)'}) ),
        state( 'expanded', style({transform: 'translateX(0)'}) ),
        transition( 'collapsed <=> expanded',
            [
                animate( 200 ),
                animate( 200 )
            ]
        )
    ]
)],
encapsulation: ViewEncapsulation.None
})


export class UserComponent{
    public year = new Date().getFullYear();
    public navState: string;
    public router: Router;

    constructor(router: Router) {
        this.router = router;
    }

   
} 


  




