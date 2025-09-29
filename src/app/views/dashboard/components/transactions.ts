import {Component} from '@angular/core';
import {UiCard} from '@app/components/ui-card';
import {NgIcon} from '@ng-icons/core';
import {currency} from '@/app/constants';

export type TransactionType = {
  transNo: string;
  order: string;
  date: string;
  time: string;
  amount: number;
  status: 'Paid' | 'Failed' | 'Pending';
  cardImg: string;
  cardNumber: string;
}

@Component({
  selector: 'app-transactions',
  imports: [
    UiCard,
    NgIcon
  ],
  template: `
    <app-ui-card title="Transactions Worldwide" [isTogglable]="true" [isReloadable]="true" [isCloseable]="true">
      <ng-container card-body>
        <div class="table-responsive">
          <table class="table table-custom table-striped table-nowrap table-centered mb-0">
            <thead class="align-middle thead-sm">
            <tr class="text-uppercase fs-xxs">
              <th class="text-muted">Tran. No.</th>
              <th class="text-muted">Order</th>
              <th class="text-muted">Date</th>
              <th class="text-muted">Amount</th>
              <th class="text-muted">Status</th>
              <th class="text-muted">Payment Method</th>
            </tr>
            </thead>
            <tbody>
              @for (transaction of transactions; track $index) {
                <tr>
                  <td><a href="javascript:void(0)" class="link-reset fw-semibold">{{ transaction.transNo }}</a></td>
                  <td>{{ transaction.order }}</td>
                  <td>{{ transaction.date }} <small class="text-muted">{{ transaction.time }}</small></td>
                  <td class="fw-semibold">{{ currency }}{{ transaction.amount.toFixed(2) }}</td>
                  <td><span class="badge  fs-xxs"
                            [class]="transaction.status === 'Failed' ? 'badge-soft-danger' : transaction.status === 'Pending' ? 'badge-soft-warning' : 'badge-soft-success'"><ng-icon
                    name="tablerPointFill"/>
                    {{ transaction.status }}</span></td>
                  <td>
                    <img [src]="transaction.cardImg" alt="" class="me-2" height="28"> {{ transaction.cardNumber }}
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </ng-container>
      <div class="card-footer text-muted text-center" card-footer>
        <a href="javascript:void(0);" class="link-reset text-decoration-underline fw-semibold link-offset-3">
          View All Transactions
          <ng-icon name="tablerSend2"/>
        </a>
      </div>
    </app-ui-card>
  `,
  styles: ``
})
export class Transactions {
  transactions: TransactionType[] = [
    {
      transNo: '#TR-3468',
      order: '#ORD-1003 - Smart Watch',
      date: '27 Apr 2025',
      time: '02:15 PM',
      amount: 89.99,
      status: 'Paid',
      cardImg: 'assets/images/cards/mastercard.svg',
      cardNumber: 'xxxx 1123',
    },
    {
      transNo: '#TR-3469',
      order: '#ORD-1004 - Gaming Mouse',
      date: '26 Apr 2025',
      time: '09:42 AM',
      amount: 24.99,
      status: 'Failed',
      cardImg: 'assets/images/cards/visa.svg',
      cardNumber: 'xxxx 3490',
    },
    {
      transNo: '#TR-3470',
      order: '#ORD-1005 - Fitness Tracker Band',
      date: '25 Apr 2025',
      time: '11:10 AM',
      amount: 34.95,
      status: 'Paid',
      cardImg: 'assets/images/cards/american-express.svg',
      cardNumber: 'xxxx 8765',
    },
    {
      transNo: '#TR-3471',
      order: '#ORD-1006 - Wireless Keyboard',
      date: '24 Apr 2025',
      time: '08:58 PM',
      amount: 59.00,
      status: 'Pending',
      cardImg: 'assets/images/cards/mastercard.svg',
      cardNumber: 'xxxx 5566',
    },
    {
      transNo: '#TR-3472',
      order: '#ORD-1007 - Portable Charger',
      date: '23 Apr 2025',
      time: '05:37 PM',
      amount: 45.80,
      status: 'Paid',
      cardImg: 'assets/images/cards/visa.svg',
      cardNumber: 'xxxx 9012',
    },
  ];
  protected readonly currency = currency;
}
