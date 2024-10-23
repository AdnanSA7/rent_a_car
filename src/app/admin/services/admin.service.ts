import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CarModel} from "../../../model/carModel";
import {BookCar} from "../../../model/bookCar";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  apiUrl: string = "http://localhost:3000/carData";
  bookingUrl: string = "http://localhost:3000/booking";

  constructor(private http: HttpClient) {}

  getCars(): Observable<CarModel> {
    return this.http.get<CarModel>(`${this.apiUrl}`);
  }

  createNewCar(obj:CarModel): Observable<CarModel> {
    return this.http.post<CarModel>(this.apiUrl, obj);
  }

  updateCar(id: number,cars: CarModel): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, cars);
  }

  deleteCar(carId:number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${carId}`);
  }

  getBookingDetails(): Observable<BookCar> {
    return this.http.get<BookCar>(this.bookingUrl);
  }

  rejectBooking(bookingDetails: any): Observable<BookCar>{
    let bookingStatus= {
      "userId": bookingDetails.userId,
      "carId": bookingDetails.carId,
      "brand": bookingDetails.brand,
      "accepted": false,
    }
    return this.http.put<BookCar>(`${this.bookingUrl}/${bookingDetails.id}`,bookingStatus);
  }

  acceptBooking(bookingDetails: any): Observable<BookCar>{
    let bookingStatus= {
      "userId": bookingDetails.userId,
      "carId": bookingDetails.carId,
      "brand": bookingDetails.brand,
      "accepted": true,
    }
    return this.http.put<BookCar>(`${this.bookingUrl}/${bookingDetails.id}`,bookingStatus);
  }

  fetchData(id:number): Observable<CarModel> {
    return this.http.get<CarModel>(`${this.apiUrl}/${id}`);
  }
}
