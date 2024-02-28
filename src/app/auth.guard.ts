import { Injectable, inject } from "@angular/core"
import { AuthService } from "./service/auth.service"
import { ToastrService } from "ngx-toastr"
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';



@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService, private service: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // if (route.url.length > 0) {
    //   let menu = route.url[0].path;
    //   if (menu == 'user' && this.authService.GetUserrole() != 'admin') {
    //     // Redirect or handle unauthorized access
    //     this.router.navigate(['/unauthorized']);
    //     return false;
    //   }
    // }
    if (this.authService.IsloggedIn()) {
      if (route.url.length > 0) {
        let menu = route.url[0].path;
        if (menu == 'user') {
          if (this.authService.GetUserrole() == 'admin') {
            return true;
          } else {
            return false;
          }
        } else {
          return true;
        }
      } else {
        return true;
      }
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;

    }
    // return true;
  }
}



// export const CanActivateFn = () => {
//   const authService = inject(AuthService);
//   const router = inject(Router);
//   const toastr = inject(ToastrService);


// const route = inject(ActivatedRouteSnapshot);

// if (authService.IsloggedIn()) {
// if (route.url.length > 0) {
//   let menu = route.url[0].path;
//   if (menu == 'user') {
//     if (authService.GetUserrole() == 'admin') {
//       return true;
//     } else {
//       return false;
//     }
//   } else {
//     return true;
//   }
// } else {
//   return true;
// }
//     return true;
//   } else {
//     router.navigate(['/login']);
//     return false;

//   }

// }
