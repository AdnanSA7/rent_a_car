import {AfterContentInit, Component} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {AuthService} from "../../auth/services/auth.service";

@Component({
  selector: 'app-customer-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './customer-layout.component.html',
  styleUrl: './customer-layout.component.css'
})
export class CustomerLayoutComponent implements AfterContentInit {

  customerUserID= Number(localStorage.getItem("customerUser"));

  constructor(private router: Router,private authService: AuthService) { }

    ngAfterContentInit(): void {
      let customer_id = localStorage.getItem("customerUser");
      if(customer_id){
        this.authService.getCustomerUser(customer_id).subscribe((res)=>{
          this.authService.loggedInUser = res;
        });
      }
      else{
        this.authService.loggedInUser = undefined;
        localStorage.removeItem("customerUser");
        this.router.navigateByUrl('/');
      }
    }

  logOut(){
    this.authService.loggedInUser = undefined;
    localStorage.removeItem("customerUser");
    this.router.navigateByUrl('/');
  }

}
