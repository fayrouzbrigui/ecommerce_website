import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaymentMethod } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class PaymentMethodService {

  API_URL = 'http://127.0.0.1:8000/orders/payment-method/'

  constructor(private http : HttpClient) { }

  listPaymentMethod(){
    return this.http.get<PaymentMethod>(this.API_URL);
  }

  delPaymentMethod(id:any){
    return this.http.delete<PaymentMethod>(this.API_URL+id+'/');
  }

  AddPaymentMethod(data:any){
    return this.http.post<PaymentMethod>(this.API_URL, data);
  }

  getSinglePaymentMethod(id:any){
    return this.http.get<PaymentMethod>(this.API_URL+id+'/');
  }

  editPaymentMethod(id: number, data:any){
    return this.http.put<PaymentMethod>(this.API_URL+id+'/', data);
  }

}