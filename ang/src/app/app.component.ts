import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
 
  title = 'myapp';

  constructor(private location: Location, 
      private router : Router){

  }

  ngOnInit(): void {
    this.location.subscribe(x => {
      console.log("this is location",x);
      if(x.url === "/termgoals" && x.pop === true){
          console.log("@@@@@@@@@@@@@@@@@@@inside if");
          return this.router.navigate(["/calculatorgoal"]);
      } 
      });
  }
  
}
