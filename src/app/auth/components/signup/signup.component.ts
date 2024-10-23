import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import { AuthService } from '../../services/auth.service';
import {UserModel} from "../../../../model/userModel";


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    ReactiveFormsModule, FormsModule, RouterLink
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {

  userForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]],
      role: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      district: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      postalCode: ['', Validators.required]
    });
  }

  addUser(user:UserModel){
    if(this.userForm.value.role=="Admin"){
      this.authService.addAdmin(user).subscribe((data)=>{
        // console.log(data);
        this.router.navigateByUrl("/");
      })
    }
    else if(this.userForm.value.role=="Customer"){
      this.authService.addCustomer(user).subscribe((data)=>{
        this.router.navigateByUrl("/");
      })
    }
  }

}
