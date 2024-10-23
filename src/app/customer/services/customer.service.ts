import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BookCar } from '../../../model/bookCar';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  apiUrl: string = "http://localhost:3000/carData";
  bookingUrl: string = "http://localhost:3000/booking";

  constructor(private http: HttpClient) {}

  getCars(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  bookCar(carId:number,userId:number,carBrand: string): Observable<BookCar>{
    let booking= {
      "userId": userId,
      "carId": carId,
      "brand": carBrand,
      "accepted": null
    }
    return this.http.post<BookCar>(this.bookingUrl,booking);
  }

  bookingStatus(userId:number): Observable<BookCar>{
    return this.http.get<BookCar>(`${this.bookingUrl}?userId=${userId}`);
  }
}
