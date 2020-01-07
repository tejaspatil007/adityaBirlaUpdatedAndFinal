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
  public shortGoalImages:string[] = [];
  public midGoalImages:string[] = [];
  public longGoalImages:string[] = [];

  constructor(private router: Router,private abs : AdityaBirlaServices) { }

  ngOnInit() {
    this.abs.getdata(localStorage.getItem('id')).subscribe(res => {
      console.log("response for username = >",res)
      this.username = res[0].name;
    });

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

      this.amount = this.commaSeparateNumber(this.finalGoal.totalAmount);
      
      this.setImages();



    });
  }

  commaSeparateNumber(val: any) {

    // return val;
    if (val === 0 || val === null || val === '0') {
      return '0';
    }
    // tslint:disable-next-line: prefer-const
    var input = val;
    var parts = input.toString().split('.');
    var x = parts[0];
    var decimals = parts[1];
    if (x > 7) {
      var crore = x.substring(0, x.length - 7);
      var lastThree = x.substring(x.length - 3);
      var thousandlakh = x.substring(x.length - 7, x.length - 3);
    } else if (x <= 7) {
      var lastThree = x.substring(x.length - 3);
      var thousandlakh = x.substring(0, x.length - 3);
      var crore: any = '';
    } else if (x <= 5) {
      var lastThree = x.substring(x.length - 3);
      var thousandlakh = x.substring(0, x.length - 3);
      var crore: any = '';
    } else {
      var lastThree: any = '';
      var thousandlakh: any = '';
      var crore: any = '';
    }
    if (thousandlakh != '') lastThree = ',' + lastThree;
    if (crore != '') thousandlakh = ',' + thousandlakh;
    var crorefinal = crore.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    var res =
      crore.replace(/\B(?=(\d{3})+(?!\d))/g, ',') +
      thousandlakh.replace(/\B(?=(\d{2})+(?!\d))/g, ',') +
      lastThree;
    if (res == 0) return '';
    if (decimals) res = res + '.' + decimals;
    return res;
  }

goalTypes = ["Self Development", "Starting Business", "Bike", "Marriage", "Honeymoon", "Wealth Creation", "Holiday",
  "Car", "Childs Education", "Childs Marriage", "Follow Passion", "World Tour", "Dream Home", "Retirement",
  "Philanthropy"];


setImages(){
  this.shortGoalImages = [];
  this.midGoalImages = [];
  this.longGoalImages = [];
  let shortGoalLength = this.shortGoal.length;
  let midGoalLength = this.midGoal.length;
  let longGoalLength = this.longGoal.length;
  
  for(let i = 0; i < shortGoalLength; i++){
    let currentGoalName = this.shortGoal[i].goals;
    if(this.goalTypes.includes(currentGoalName)){
      let imgUrl = `./assets/img/${currentGoalName}color.png`;
      this.shortGoalImages.push(imgUrl);
    }
    else{
      let customImgUrl = `./assets/img/AddOtherGoalcolor.png`;
      this.shortGoalImages.push(customImgUrl);
    }   
  }

  for(let i = 0; i < midGoalLength; i++){
    let currentGoalName = this.midGoal[i].goals;
    if(this.goalTypes.includes(currentGoalName)){
      let imgUrl = `./assets/img/${currentGoalName}color.png`;
      this.midGoalImages.push(imgUrl);
    }
    else{
      let customImgUrl = `./assets/img/AddOtherGoalcolor.png`;
      this.midGoalImages.push(customImgUrl);
    }   
  }

  for(let i = 0; i < longGoalLength; i++){
    let currentGoalName = this.longGoal[i].goals;
    if(this.goalTypes.includes(currentGoalName)){
      let imgUrl = `./assets/img/${currentGoalName}color.png`;
      this.longGoalImages.push(imgUrl);
    }
    else{
      let customImgUrl = `./assets/img/AddOtherGoalcolor.png`;
      this.longGoalImages.push(customImgUrl);
    }   
  }
}

  getGoalAmt(val) {
    console.log((val))
    return this.commaSeparateNumber(JSON.parse(val).sipWithLumpsum);
  }

  Replan(){
    localStorage.removeItem('id');
    this.router.navigateByUrl("/calculatorgoal");
  }

  download(){}

  share(){}

  email(){}

  printPage(){
    window.print();
  }

}
