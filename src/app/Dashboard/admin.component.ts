import { Component,HostBinding,HostListener,ViewEncapsulation } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Router } from '@angular/router';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  animations: [trigger(
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


export class AdminComponent{
    public year = new Date().getFullYear();
    public navState: string;

   constructor(private router: Router) {
    if ( window.innerWidth < 1200 ) {
        this.navState = 'collapsed';
    } else {
        this.navState = 'expanded';
    }
} 

@HostBinding('attr.id') protected get id(): string {
    return 'app';
}

@HostBinding('class') protected get appClass(): string {
    return 'app container-fluid';
}

@HostListener('window:resize', ['$event'])
onResize(event) {
    if ( event.target.innerWidth < 1200 ) {
        this.navState = 'collapsed';
    } else {
        this.navState = 'expanded';
    }
}
  

  

public toggleNav() {
    if ( this.navState === 'expanded' ) {
        this.navState = 'collapsed';
    } else {
        this.navState = 'expanded';
    }

  }
  public showNav() {
    return this.router.url !== '/profil';
}

}
