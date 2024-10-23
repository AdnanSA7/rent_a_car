import {Component, ElementRef, OnInit, viewChild} from '@angular/core';
import {AdminService} from "../services/admin.service";
import { AuthService } from '../../auth/services/auth.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import {CarModel} from "../../../model/carModel";
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [RouterLink, RouterOutlet, ReactiveFormsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {

  carList: any[] = [];
  modal = viewChild.required<ElementRef<HTMLDialogElement>>("my_modal_4");
  carId!: number;
  updateCarForm!: FormGroup;

  constructor(private adminService: AdminService,private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.getCars();
    if(this.authService.loggedInUser?.role !== "Admin"){
      this.router.navigateByUrl('/');
    }
  }

  getCars(){
    this.adminService.getCars().subscribe((res: any) => {
      this.carList = res;
    });
  }

  onEdit(id: number){
    this.carId = id;
    this.modal().nativeElement.showModal();
  }

  onDelete(carId: number){
    console.log(carId);
    this.adminService.deleteCar(carId).subscribe((res)=>{
      console.log(res);
      this.getCars();
    })
  }

  updateCar(carInfo:CarModel){}

}
