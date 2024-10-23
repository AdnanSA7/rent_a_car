import {Component, OnInit} from '@angular/core';
import { RouterLink } from '@angular/router';
import {NgForOf} from "@angular/common";
import {BookCar} from "../../../model/bookCar";
import {AdminService} from "../services/admin.service";

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [RouterLink, NgForOf],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent implements OnInit {

  bookingDetails: any[] = [];

  constructor(private adminService: AdminService) {
  }

  ngOnInit(): void {
    this.getBookingDetails();
  }

  getBookingDetails() {
    this.adminService.getBookingDetails().subscribe((res:any)=>{
      this.bookingDetails= res;
    })
  }

  rejectBooking(bookingDetails: BookCar) {
    this.adminService.rejectBooking(bookingDetails).subscribe((res)=>{
      this.getBookingDetails();
    });
  }

  acceptBooking(bookingDetails: BookCar) {
    this.adminService.acceptBooking(bookingDetails).subscribe((res:any)=>{
      this.getBookingDetails();
    })
  }
}
