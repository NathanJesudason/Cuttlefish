import {
  animate,
  group,
  style,
  transition,
  trigger
} from '@angular/animations';

/**
 * Basic fade animation for use with ngIf and ngFor
 */
export const BasicFadeAmination = trigger('basicFadeAnimation', [
  transition(':enter', [
    style({ height: 0, opacity: 0 }),
    group([
      animate('300ms 0ms ease-out', style({ opacity: 1 })),
      animate('300ms 0ms ease-out', style({ height: '*' })),
    ]),
  ]),
  transition(':leave', [
    group([
      animate('300ms 0ms ease-in', style({ opacity: 0 })),
      animate('300ms 0ms ease-in', style({ height: 0 })),
    ]),
  ]),
]);

/**
 * Basic fade animation for use with ngIf and ngFor, without height animation
 */
export const BasicFadeAminationNoHeight = trigger('basicFadeAnimationNoHeight', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('300ms 0ms ease-out', style({ opacity: 1 })),
  ]),
  transition(':leave', [
    animate('300ms 0ms ease-in', style({ opacity: 0 })),
  ]),
]);
