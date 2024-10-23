import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {CarModel} from "../../../model/carModel";
import {AdminService} from "../services/admin.service";

@Component({
  selector: 'app-addcar',
  standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterLink
    ],
  templateUrl: './addcar.component.html',
  styleUrl: './addcar.component.css'
})
export class AddcarComponent implements OnInit {
  carForm!: FormGroup;

  constructor(private fb: FormBuilder, private adminService: AdminService) {
  }

  ngOnInit(): void {
        this.carForm = this.fb.group({
          brand: ['', Validators.required],
          model: ['', Validators.required],
          year: ['', Validators.required],
          color: ['', Validators.required],
          dailyRate: ['', Validators.required],
          carImage: ['', Validators.required]
        });
    }

  addCar(cars: CarModel) {
    this.adminService.createNewCar(cars).subscribe((res)=>{
      alert("Car Added Successfully");
      this.carForm.reset();
    })
  }

}
