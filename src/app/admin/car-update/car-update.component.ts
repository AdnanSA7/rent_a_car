import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { CarModel } from '../../../model/carModel';
import { AdminService } from '../services/admin.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-car-update',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './car-update.component.html',
  styleUrl: './car-update.component.css',
})
export class CarUpdateComponent implements OnInit {
  carId!: number;
  cars!: CarModel;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param: Params) => {
      this.carId = param['get']('id');
      // console.log(this.dataId);
    });
    this.fetchData();
  }

  fetchData() {
    this.adminService.fetchData(this.carId).subscribe((data: CarModel) => {
      this.cars = data;
    });
  }

  updateCar() {
    this.adminService
      .updateCar(this.carId, this.cars)
      .subscribe((res: CarModel) => {
        alert("Info Updated Successfully");
        this.router.navigate(['login/admin/admin-dashboard']);
      });
  }
}
