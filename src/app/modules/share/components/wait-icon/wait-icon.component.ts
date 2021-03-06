import { Component, OnInit, Input } from '@angular/core';
import { Observable, timer, fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { myInsertRemoveTrigger, slideInOut } from '../../services/animations';
@Component({
  selector: 'm-wait-icon',
  templateUrl: './wait-icon.component.html',
  styleUrls: ['./wait-icon.component.scss'],
  animations: [myInsertRemoveTrigger]
})
export class WaitIconComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}
  @Input() timeout = 30;
  @Input() delay = 0;
  @Input() wait;
  timeout$: Observable<boolean>;
  delay$: Observable<boolean>;
  ngOnInit() {
    this.timeout$ = timer(this.timeout * 1000).pipe(map(() => true));
    this.delay$ = timer(this.delay * 1000).pipe(map(() => true));
  }
  toggle() {
    this.wait = !this.wait;
  }
}
