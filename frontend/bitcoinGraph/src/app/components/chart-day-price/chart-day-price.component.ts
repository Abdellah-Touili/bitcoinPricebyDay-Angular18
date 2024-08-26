import { Component, OnInit } from '@angular/core';
import { ChartDataset } from 'chart.js';
import { ChartType} from 'chart.js';
//import { Color, Label } from 'ng2-charts';
import { GetDayPriceBitcoinService } from 'src/app/services/get-day-price-bitcoin.service';

@Component({
  selector: 'app-chart-day-price',
  templateUrl: './chart-day-price.component.html',
  styleUrls: ['./chart-day-price.component.scss']
})

export class ChartDayPriceComponent implements OnInit{
  //Dates range
  startEndDates:any;
  //----------------------------- Parameters For the GRAPH/CHART -----------------------
  lineChartData: ChartDataset[] = [
    { data: [], label: 'Price-per-Day-Bitcoin' },
  ];

  lineChartLabels: String[] =[];
  priceChartData:ChartDataset[]=[{data:[], label: 'BitcoinPrices-per-Day'}];

  lineChartOptions = {
    responsive: true,
  };

  lineChartColors = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,255,0,0.28)',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line' as ChartType;

  constructor(private dayPriceBitcoinService: GetDayPriceBitcoinService) { }

  ngOnInit(): void { 
    // to have the dates range from the User (From the Form, main component)
    this.dayPriceBitcoinService.invokeEvent.subscribe((value) => {
    this.startEndDates= value;
    this.getDayPriceBitcoin(this.startEndDates);
    });

  }

  //Extract The days and their corresponding prices from the data received from the Backend-API.
   //And fill in the 'Labels' and 'Data' of the Graph
   extractDayPrice(JsonObj:any)
   {  
      //To have the correct 'Labels' and 'Data' of the Graph, The corresponding Arrays must be Empty for each
      //change of the Dates range
      this.lineChartLabels =[];
      this.priceChartData[0].data =[];

      for(let dayPrice of Object.keys(JsonObj))
      {
        var day   =  JsonObj[dayPrice]["day"];
        var price =  JsonObj[dayPrice]["price"];
        this.lineChartLabels.push(day);
        this.priceChartData[0].data?.push(price);       

      }
   }  

  //Get the data (days and prices) from the API, corresponding the dates range given by the User
  getDayPriceBitcoin(rangeDate:any)
  {
    this.dayPriceBitcoinService.postRangeDate(rangeDate).subscribe((
      data => {
        this.extractDayPrice(data);
      }
      ));
   }

  }

  

  

  

   




