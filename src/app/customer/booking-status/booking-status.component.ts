import {Component, OnInit} from '@angular/core';
import {CustomerService} from "../services/customer.service";
import {CustomerLayoutComponent} from "../customer-layout/customer-layout.component";
import {BookCar} from "../../../model/bookCar";

@Component({
  selector: 'app-booking-status',
  standalone: true,
  imports: [],
  templateUrl: './booking-status.component.html',
  styleUrl: './booking-status.component.css'
})
export class BookingStatusComponent implements OnInit {
  bookingDetails: any[] = [];

  constructor(private customerService: CustomerService,private customerLayout: CustomerLayoutComponent) {
  }

  ngOnInit(): void {
    this.getBookingDetails();
  }

  getBookingDetails() {
    this.customerService.bookingStatus(this.customerLayout.customerUserID).subscribe((res:any)=>{
      console.log(res);
      this.bookingDetails= res;
    })
  }

}
