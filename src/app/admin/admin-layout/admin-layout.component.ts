import {AfterContentInit, Component} from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent implements AfterContentInit {

  constructor(private authService: AuthService, private router: Router){}

  ngAfterContentInit(): void {
    let admin_id = localStorage.getItem("adminUser");
    // let customer_id = localStorage.getItem("customerUser");
    if(admin_id){
      this.authService.getAdminUser(admin_id).subscribe((res)=>{
        this.authService.loggedInUser = res;
      });
    }
    // else if(customer_id){
    //   this.authService.getAdminUser(customer_id).subscribe((res)=>{
    //     this.authService.loggedInUser = res;
    //   });
    // }

    else{
      this.authService.loggedInUser = undefined;
      localStorage.removeItem("adminUser");
      this.router.navigateByUrl('/');
    }

  }


  logOut(){
    this.authService.loggedInUser = undefined;
    localStorage.removeItem("adminUser");
    this.router.navigateByUrl('/');
  }

}
