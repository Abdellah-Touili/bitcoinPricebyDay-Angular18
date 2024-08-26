import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GetDayPriceBitcoinService {

  //The URL of the REST-API (Backend, Laravel 8) to get data (bitcoin Prices par Day)
  private dayPriceBitcoinUrl   = "http://localhost/backend/bitcoinPriceGraph/api/bitcoinPrice";

  //To share/communicate 'parameters/variables' between the components
  //We use it for sending 'Dates range' From the principal component (the Form) To the chart-day-price component
  // To display the graph
  public invokeEvent:BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private httpClient: HttpClient) { }

  ngOnInit() { 
  }

  //Send 'dates range' to the API to get Prices per Day
  postRangeDate(rangeDateJson: any) : Observable<any>{
    const headers = {'Accept':'application/json','content-type': 'application/json'}  
   return this.httpClient.post(this.dayPriceBitcoinUrl, rangeDateJson,{'headers':headers}); 
  }
 
}


