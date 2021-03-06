import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef, NgZone, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { Observable, of, iif, timer } from 'rxjs';
import { map, catchError, switchMap, share, find, takeWhile, pairwise } from 'rxjs/operators';
import { debounce } from 'lodash';

import * as QRCode from 'qrcode';

import { Payment, PayReq, PayCheck } from '../../services/donate.model';
import { DonateService } from '../../services/donate.service';
import { AuthService } from 'app/services/auth.service';
import { DstoreObject } from 'app/modules/client/utils/dstore-objects';
import { DonorsComponent } from '../donors/donors.component';
import { environment } from 'environments/environment';
import { OrderService, OrderStatus } from '../../../../services/order.service';

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.scss'],
})
export class DonateComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private donateService: DonateService,
    private sanitizer: DomSanitizer,
    private orderService: OrderService,
  ) {}
  @ViewChild(DonorsComponent, { static: true })
  donors: DonorsComponent;
  @Input()
  appName: string;
  amount = 9.9;
  Payment = Payment;
  payment: Payment = Payment.AliPay;
  randAmount = [2.0, 5.2, 8.88, 6.66, 9.9, 18.0, 12.0, 66.0, 25.5, 9.99, 15.2];
  loading: boolean;
  qrImg: SafeResourceUrl;
  waitPay$: Observable<PayCheck>;
  done: boolean;

  ngOnInit() {}

  close() {
    this.amount = 9.9;
    this.waitPay$ = null;
    this.payment = Payment.AliPay;
    this.loading = false;
    this.qrImg = null;
  }

  rand() {
    let r = this.amount;
    while (r === this.amount) {
      r = this.randAmount[Math.floor(Math.random() * this.randAmount.length)];
    }
    this.amount = r;
  }

  async pay() {
    this.loading = true;
    const result = await this.orderService.post({});
    DstoreObject.openURL(result.pay_url);
    this.waitPay$ = timer(0, 3000).pipe(
      switchMap(async () => {
        const order = await this.orderService.get(result.order_number as any);
        return {
          isExist: order.status === OrderStatus.OrderStatusSuccess,
          isPaying: order.status === OrderStatus.OrderStatusWaiting,
        } as PayCheck;
      }),
      share(),
    );
  }

  inputChange(e: Event) {
    const el = e.target as HTMLInputElement;
    if (!el.value.match(/^\d{0,6}(\.\d{0,2})?$/)) {
      el.value = this.amount.toString();
    }
    if (el.value) {
      this.amount = parseFloat(el.value);
    } else {
      this.amount = null;
    }
  }
}
