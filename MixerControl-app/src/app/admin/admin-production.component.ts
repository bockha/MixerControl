/**
 * Created by goergch on 01.03.17.
 */

import {Component, OnInit, OnDestroy} from '@angular/core';
import {AdminService} from "../services/admin.service";
import {Subscription, Observable} from "rxjs";
import {Order} from "../models/models"

import {DataSource} from '@angular/cdk/collections';
import {ProductionSocketService} from "../services/production-socket.service";
@Component({
    moduleId: module.id,
    selector: 'my-admin-production',
    templateUrl: 'admin-production.template.html',
    providers: [ProductionSocketService, AdminService]
})

export class AdminProductionComponent implements OnInit, OnDestroy {
    queueConnection: Subscription;
    // stateConnection: Subscription;
    state = "";
    queue = new Array<Order>();

    orders = new Array<Order>();


    displayedColumns = ['OrderNr', 'DrinkId', 'DrinkName'];
  dataSource: ProductionDataSource | null;

    constructor(private productionSocketService: ProductionSocketService, private adminService: AdminService) {

    }


    ngOnInit(): void {
      this.dataSource = new ProductionDataSource(this.productionSocketService);
      this.productionSocketService.joinRoom('state');
      this.queueConnection = this.productionSocketService.getUpdates('state')
            .subscribe(state =>
                this.state = state);



    }

    ngOnDestroy(): void {
        this.queueConnection.unsubscribe();
        // this.stateConnection.unsubscribe();
    }

    ResumeProduction(): void {
        this.adminService.resumeProduction();
    }

    PauseProduction(): void {
        this.adminService.pauseProduction();
    }

    StartProcessing(): void {
        this.adminService.startProcessing();
    }


}



export class ProductionLine {
  OrderNr: string;
  DrinkId: string;
  DrinkName: string;
}

export class ProductionDataSource extends DataSource<any> {
  queueObservable: Observable<any>;


  constructor(private productionSocketService: ProductionSocketService) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<ProductionLine[]> {
    this.productionSocketService.joinRoom('queue')
    this.queueObservable = this.productionSocketService.getUpdates('queue');
    return this.queueObservable.map(queue =>{
      var array = new Array<ProductionLine>();
      console.log(queue);
      for (let o of queue) {
        var order = o as Order;
        var productionLine = new ProductionLine();
        productionLine.DrinkId = order.drinkId;
        productionLine.DrinkName = order.orderName;
        productionLine.OrderNr = String(order.orderNumber);
        array.push(productionLine);
      }
      return array;
    })

  }

  disconnect() {
  }
}
