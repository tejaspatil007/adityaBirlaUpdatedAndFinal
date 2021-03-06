import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { AdityaBirlaServices } from "../Shared/Services/calculatorgoal.services";
​
​
@Injectable({
  providedIn: 'root'
})
export class GoalsGuard implements CanActivate {
  constructor(private abs : AdityaBirlaServices ,  private router: Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let userId = localStorage.getItem('id');
      if(userId){
        return true;
      }else {
        this.router.navigate(['']);
        return false;
      }
      // this.abs.getdata(localStorage.getItem('id')).subscribe(res => {
      //   console.log("guard",res[0].user_id);
      //   if(localStorage.getItem('id')){
      //     // return true
      //     // this.router.navigate(['/goals']);
      //   }else {
      //     this.router.navigate(['']);
      //   }
      // })
      // return true;          
    }
  }