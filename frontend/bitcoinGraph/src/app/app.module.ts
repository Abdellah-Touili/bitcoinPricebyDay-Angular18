import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http'; 
import { NgChartsModule } from 'ng2-charts';
import { ChartDayPriceComponent } from './components/chart-day-price/chart-day-price.component';
import { HttpInterceptorService } from './services/http-interceptor.service';


@NgModule({ declarations: [
        AppComponent,
        ChartDayPriceComponent,
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        ReactiveFormsModule,
        FormsModule,
        NgChartsModule,
        NgbModule], providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpInterceptorService,
            multi: true
        },
        provideHttpClient(withInterceptorsFromDi()),
    ] })
export class AppModule { }
