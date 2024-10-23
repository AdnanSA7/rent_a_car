import { Component, ElementRef, OnInit, viewChild } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { AuthService } from '../../auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './customer-dashboard.component.html',
  styleUrl: './customer-dashboard.component.css'
})
export class CustomerDashboardComponent implements OnInit {

  carList: any[] = [];
  modal = viewChild.required<ElementRef<HTMLDialogElement>>("my_modal_5");
  carId!: number;
  carBrand!: string;

  constructor(private customerService: CustomerService,private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.getCars();
    if(this.authService.loggedInUser?.role !== "Customer"){
      this.router.navigateByUrl('/');
    }
  }

  getCars(){
    this.customerService.getCars().subscribe((res: any) => {
      this.carList = res;
    })
  }

  addBooking(){
    this.customerService.bookCar(this.carId,this.authService.loggedInUser!.id!,this.carBrand).subscribe((res)=>{
      alert("Car Booked Successfully");
    })
  }


  onBookCar(id: number, brand: string) {
    this.carId = id;
    this.carBrand = brand;
    this.modal().nativeElement.showModal();
  }

}
