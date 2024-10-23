import { Component } from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


  loginForm!: FormGroup;


  constructor(private  router: Router, private authService: AuthService) {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  // onLogin() {
  //   const loginObj = this.loginForm.value;
  //   if (loginObj.username == "admin" && loginObj.password == "1234") {
  //     this.router.navigate(['login/admin']);
  //   }
  //   else if (loginObj.username == "customer" && loginObj.password == "1234") {
  //     this.router.navigateByUrl("login/customer");
  //   }
  //   else {
  //     alert("Invalid login credentials");
  //   }
  // }

  onLogin(){
    this.authService.findUserByEmailAdmin(this.loginForm.value.username).subscribe((res)=>{
      console.log(res);
      if(res.length > 0){
        if(this.loginForm.value.password === res[0].password){
          this.authService.loggedInUser = res[0];
          localStorage.setItem("adminUser",res[0].id.toString());
          this.router.navigate(['login/admin/admin-dashboard']);
        }
        else {
          alert("Invalid Password");
        }
      }
      else{
        this.authService.findUserByEmailCustomer(this.loginForm.value.username).subscribe((res1)=>{
          if(res1.length > 0){
            if(this.loginForm.value.password === res1[0].password){
              this.authService.loggedInUser = res1[0];
              localStorage.setItem("customerUser",res1[0].id.toString());
              this.router.navigateByUrl('login/customer/customer-dashboard');
            }
            else {
              alert("Invalid Password");
            }
          }
          else{
            alert("Invalid Credentials!");
          }
        })
      }
    })
  }

  logOut(){
    this.authService.loggedInUser = undefined;
    this.router.navigateByUrl('/');
  }
}

export class LoginUser {
  username: string;
  password: string;

  constructor() {
    this.username = "";
    this.password = "";
  }
}
