import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { state, style, transition, trigger, animate } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  // This is where we can define animations for this component
  animations: [
    // It always starts with trigger, takes animationReference from template and
    // an array of states. Each state has a name and a style.
    trigger('pageContainer', [
      state('initial', style({
        'top': '15px',
        'opacity': '0'
      })),
      state('slided', style({
        'top': '0',
        'opacity': '1'
      })),
      // After defining states, we need to define how transition between states is done
      transition('initial => slided', animate(300))
    ])
  ]
})
export class AppComponent implements OnInit {

  public state = 'initial';

  constructor(private router: Router) {
    this.animatePageTransition();
  }

  ngOnInit() {
    // Router events observable fires many different events, we want to animate page
    // transition only on navigation end. For that we pipe the observable and filter
    // only for events that are instances of NavigationEnd
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => this.animatePageTransition());
  }

  /**
   * There's probably a lot better way to do this, I'm kind of 'hacking' it with
   * this approach by setting state to initial, waiting 50ms and setting state
   * to slided. If we do:
   * this.state = 'initial';
   * this.state = 'slided';
   * it will not work, there has to be some time between the states
   */
  animatePageTransition() {
    this.state = 'initial';
    setTimeout(() => this.state = 'slided', 50);
  }
}
