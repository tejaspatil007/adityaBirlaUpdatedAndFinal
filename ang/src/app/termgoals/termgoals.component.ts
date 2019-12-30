import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import { AdityaBirlaServices } from 'src/Shared/Services/calculatorgoal.services';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-termgoals',
  templateUrl: './termgoals.component.html',
  styleUrls: [/*'./termgoals.component.css'*/]
})
export class TermgoalsComponent implements OnInit {
  public finalGoal:any;
  public getGoal = [];
  public selectgoal:any;
  public username:any;
  public shortGoal=[];
  public longGoal=[];
  public midGoal=[];
  public amount : any;

  constructor(private router: Router,private abs : AdityaBirlaServices) { }

  ngOnInit() {
    this.abs.getAnswer(localStorage.getItem('id')).subscribe(res => {
      console.log(res);
      // console.log("res=>",res);
      this.finalGoal = res['result'];
      console.log("rsult",this.finalGoal);

      this.shortGoal = this.finalGoal.shortGoals;
      console.log("shortgoal",this.shortGoal);

      this.midGoal = this.finalGoal.midGoal;
      console.log("midgoal",this.midGoal);

      this.longGoal = this.finalGoal.longGoals;
      console.log("longoal",this.longGoal);

      this.amount = this.finalGoal.totalAmount;
      



    });
  }


  getGoalAmt(val) {
    console.log((val))
    return JSON.parse(val).amt
  }

  Replan(){
    localStorage.removeItem('id');
    this.router.navigateByUrl("");
  }

  download(){}

  share(){}

  email(){}

  printPage(){
    window.print();
  }

}
