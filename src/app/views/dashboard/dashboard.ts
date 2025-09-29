import {Component} from '@angular/core';
import {ViewsStatistics} from '@/app/views/dashboard/components/views-statistics';

import {TodayIncome} from '@/app/views/dashboard/components/today-income';
import {OrdersAndSales} from '@/app/views/dashboard/components/orders-and-sales';
import {Transactions} from '@/app/views/dashboard/components/transactions';
import {EcommerceActivity} from '@/app/views/dashboard/components/ecommerce-activity';
import {WidgetCard1} from '@app/components/widgets/widget-card1';
import {WidgetCard2} from '@app/components/widgets/widget-card2';
import {WidgetCard3} from '@app/components/widgets/widget-card3';

@Component({
  selector: 'app-dashboard',
  imports: [
    ViewsStatistics,
    TodayIncome,
    OrdersAndSales,
    Transactions,
    EcommerceActivity,
    WidgetCard1,
    WidgetCard2,
    WidgetCard3
  ],
  templateUrl: './dashboard.html',
  styles: ``
})
export class Dashboard {

}
