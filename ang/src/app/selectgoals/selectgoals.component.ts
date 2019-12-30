import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Igoal } from 'src/Shared/Interfaces(Structure)/goal';
import { AdityaBirlaServices } from 'src/Shared/Services/calculatorgoal.services';

@Component({
  selector: 'app-selectgoals',
  templateUrl: './selectgoals.component.html',
  styleUrls: [/*'./selectgoals.component.css'*/]
})
export class SelectgoalsComponent implements OnInit {
  public selectedGoal: Igoal[] = [];
  public user_id: any;
  public isRetirementPresent: boolean = false;
  public isHolidayPresent: boolean = false;
  public isHoneymoonPresent: boolean = false;
  public isMarriagePresent: boolean = false;
  public isCarPresent: boolean = false;
  public isBikePresent: boolean = false;
  public isDreamHomePresent: boolean = false;
  public isStartingBusinessPresent: boolean = false;
  public isSelfDevelopmentPresent: boolean = false;
  public isChildsEducationPresent: boolean = false;
  public isChildsMarriagePresent: boolean = false;
  public isWorldTourPresent: boolean = false;
  public isWealthCreationPresent: boolean = false;
  public isFollowPassionPresent: boolean = false;
  public isPhilanthropyPresent: boolean = false;
  public isOtherGoalPresent: boolean = false;
  public errorMsg:string;


  //Images
  public goals: Igoal[] = [{ "id": 1, "type": "Self Development", "src": "assets/img/Self Development.png" },
  { "id": 2, "type": "Starting Business", "src": "assets/img/Starting Business.png" },
  { "id": 3, "type": "Marriage", "src": "assets/img/Marriage.png" },
  { "id": 4, "type": "Honeymoon", "src": "assets/img/Honeymoon.png" },
  { "id": 5, "type": "Wealth Creation", "src": "assets/img/Wealth Creation.png" },
  { "id": 6, "type": "Holiday", "src": "assets/img/Holiday.png" },
  { "id": 7, "type": "World Tour", "src": "assets/img/World Tour.png" },
  { "id": 8, "type": "Follow your Passion", "src": "assets/img/Follow Passion.png" },
  { "id": 9, "type": "Philantropy", "src": "assets/img/Philanthropy.png" },
  { "id": 10, "type": "Bike", "src": "assets/img/Bike.png" },
  { "id": 11, "type": "Car", "src": "assets/img/Car.png" },
  { "id": 12, "type": "Dream Home", "src": "assets/img/Dream Home.png" },
  { "id": 13, "type": "Childs Education", "src": "assets/img/Childs Education.png" },
  { "id": 14, "type": "Childs Marriage", "src": "assets/img/Childs Marriage.png" },
  { "id": 15, "type": "Retirement", "src": "assets/img/Retirement.png" }
  ]
  //  public retirementImg="assets/img/Retirement.png";
  //  public holidayImg="assets/img/Holiday.png";
  //  public honeyMoonImg="assets/img/Honeymoon.png";
  //  public marriageImg="assets/img/Marriage.png";
  //  public carImg="assets/img/Car.png";
  //  public bikeImg="assets/img/Bike.png";
  //  public DreamHomeImg="assets/img/Dream Home.png";
  //  public startingBusinessImg="assets/img/Starting Business.png";
  //  public selfDevelopmentImg="assets/img/Self Development.png";
  //  public childsEducationImg="assets/img/Childs Education.png";
  //  public childsMarriageImg="assets/img/Childs Marriage.png";
  //  public worldTourImg="assets/img/World Tour.png";
  //  public wealthCreationImg="assets/img/Wealth Creation.png";
  //  public followPassionImg="assets/img/Follow Passion.png";
  //  public philanthropyImg="assets/img/Philanthropy.png";
  public othergoalImg = "assets/img/AddOtherGoal.png";
  public uid: any;
  public flag: any;
  public otherGoalsCount = 0;
  showInput: boolean = false;
  public goalValue: string = null;

  constructor(private router: Router, private abs: AdityaBirlaServices) { }

  ngOnInit() { }

  addgoal(type) {
    if (type == 'Self Development') {
      this.addSelfDevelopment()
    }
    else if (type == 'Starting Business') {
      this.addStartingBusiness()
    }
    else if (type == 'Marriage') {
      this.addMarriage()
    }
    else if (type == 'Honeymoon') {
      this.addHoneymoon()
    }
    else if (type == 'Wealth Creation') {
      this.addWealthCreation()
    }
    else if (type == 'Holiday') {
      this.addHoliday()
    }
    else if (type == 'World Tour') {
      this.addWorldTour()
    }
    else if (type == 'Follow your Passion') {
      this.addFollowPassion()
    }
    else if (type == 'Philantropy') {
      this.addPhilantropy()
    }
    else if (type == 'Bike') {
      this.addBike()
    }
    else if (type == 'Car') {
      this.addCar()
    }
    else if (type == 'Dream Home') {
      this.addDreamHome()
    }
    else if (type == 'Childs Education') {
      this.addChildsEducation()
    }
    else if (type == 'Childs Marriage') {
      this.addChildsMarriage()
    }
    else if (type == 'Retirement') {
      this.addRetirement()
    }
  }

  /////new goals added ////////// 
  addSelfDevelopment() {
    if (this.selectedGoal.length < 3 && this.isSelfDevelopmentPresent == false) {
      var SelfDevelopment = {
        id: 1,
        type: "Self Development",
        src: ''
      }
      this.selectedGoal.push(SelfDevelopment);
      this.isSelfDevelopmentPresent = true;
      console.log(this.selectedGoal)
      this.goals[0].src = "assets/img/Self Developmentcolor.png"
    }
    else if (this.selectedGoal.length <= 3 && this.isSelfDevelopmentPresent == true) {
      let data = "Self Development";
      this.isSelfDevelopmentPresent = false
      this.removeData(data);
      this.goals[0].src = "assets/img/Self Development.png"
    }
  }

  addStartingBusiness() {
    if (this.selectedGoal.length < 3 && this.isStartingBusinessPresent == false) {
      var StartingBusines = {
        id: 2,
        type: "Starting Business",
        src: ''
      }
      this.selectedGoal.push(StartingBusines);
      this.isStartingBusinessPresent = true;
      console.log(this.selectedGoal)
      this.goals[1].src = "assets/img/Starting Businesscolor.png"
    }
    else if (this.selectedGoal.length <= 3 && this.isStartingBusinessPresent == true) {
      let data = `Starting Business`;
      this.isStartingBusinessPresent = false
      this.removeData(data);
      this.goals[1].src = "assets/img/Starting Business.png"
    }

  }

  addMarriage() {
    if (this.selectedGoal.length < 3 && this.isMarriagePresent == false) {
      var Marriage = {
        id: 3,
        type: "Marriage",
        src: ''
      }
      this.selectedGoal.push(Marriage);
      this.isMarriagePresent = true;
      console.log(this.selectedGoal);
      this.goals[2].src = "assets/img/Marriagecolor.png";
    }
    else if (this.selectedGoal.length <= 3 && this.isMarriagePresent == true) {
      let data = "Marriage";
      this.isMarriagePresent = false
      this.goals[2].src = "assets/img/Marriage.png";
      this.removeData(data);
    }

  }

  addHoneymoon() {
    if (this.selectedGoal.length < 3 && this.isHoneymoonPresent == false) {
      var Honeymoon = {
        id: 4,
        type: "Honeymoon",
        src: ''
      }
      this.selectedGoal.push(Honeymoon);
      this.isHoneymoonPresent = true;
      console.log(this.selectedGoal)
      this.goals[3].src = "assets/img/Honeymooncolor.png";
    }
    else if (this.selectedGoal.length <= 3 && this.isHoneymoonPresent == true) {
      let data = "Honeymoon";
      this.isHoneymoonPresent = false
      this.removeData(data);
      this.goals[3].src = "assets/img/Honeymoon.png";
    }

  }

  addWealthCreation() {
    if (this.selectedGoal.length < 3 && this.isWealthCreationPresent == false) {
      var WealthCreation = {
        id: 5,
        type: "Wealth Creation",
        src: ''
      }
      this.selectedGoal.push(WealthCreation);
      this.isWealthCreationPresent = true;
      console.log(this.selectedGoal);
      this.goals[4].src = "assets/img/Wealth Creationcolor.png"
    }
    else if (this.selectedGoal.length <= 3 && this.isWealthCreationPresent == true) {
      let data = "Wealth Creation";
      this.isWealthCreationPresent = false
      this.removeData(data);
      this.goals[4].src = "assets/img/Wealth Creation.png"
    }

  }

  addHoliday() {
    if (this.selectedGoal.length < 3 && this.isHolidayPresent == false) {
      var Holiday = {
        id: 6,
        type: "Holiday",
        src: ''
      }
      this.selectedGoal.push(Holiday);
      this.isHolidayPresent = true;
      console.log(this.selectedGoal);
      console.log(this.isHolidayPresent);
      this.goals[5].src = "assets/img/Holidaycolor.png";
    }
    else if (this.selectedGoal.length <= 3 && this.isHolidayPresent == true) {
      let data = "Holiday";
      this.isHolidayPresent = false
      this.removeData(data);
      this.goals[5].src = "assets/img/Holiday.png";
    }
  }

  addWorldTour() {
    if (this.selectedGoal.length < 3 && this.isWorldTourPresent == false) {
      var WorldTour = {
        id: 7,
        type: "World Tour",
        src: ''
      }
      this.selectedGoal.push(WorldTour);
      this.isWorldTourPresent = true;
      console.log(this.selectedGoal)
      this.goals[6].src = "assets/img/World Tourcolor.png"
    }
    else if (this.selectedGoal.length <= 3 && this.isWorldTourPresent == true) {
      let data = "World Tour";
      this.isWorldTourPresent = false
      this.removeData(data);
      this.goals[6].src = "assets/img/World Tour.png"
    }

  }

  addFollowPassion() {
    if (this.selectedGoal.length < 3 && this.isFollowPassionPresent == false) {
      var FollowPassion = {
        id: 8,
        type: "Follow Passion",
        src: ''
      }
      this.selectedGoal.push(FollowPassion);
      this.isFollowPassionPresent = true;
      console.log(this.selectedGoal)
      this.goals[7].src = "assets/img/Follow Passioncolor.png"
    }
    else if (this.selectedGoal.length <= 3 && this.isFollowPassionPresent == true) {
      let data = "Follow Passion";
      this.isFollowPassionPresent = false
      this.removeData(data);
      this.goals[7].src = "assets/img/Follow Passion.png"
    }
  }

  addPhilantropy() {
    if (this.selectedGoal.length < 3 && this.isPhilanthropyPresent == false) {
      var Philanthropy = {
        id: 9,
        type: "Philanthropy",
        src: ''
      }
      this.selectedGoal.push(Philanthropy);
      this.isPhilanthropyPresent = true;
      console.log(this.selectedGoal)
      this.goals[8].src = "assets/img/Philanthrophycolor.png"
    }
    else if (this.selectedGoal.length <= 3 && this.isPhilanthropyPresent == true) {
      let data = "Philanthropy";
      this.isPhilanthropyPresent = false
      this.removeData(data);
      this.goals[8].src = "assets/img/Philanthropy.png"
    }
  }

  addBike() {
    if (this.selectedGoal.length < 3 && this.isBikePresent == false) {
      var Bike = {
        id: 10,
        type: "Bike",
        src: ''
      }
      this.selectedGoal.push(Bike);
      this.isBikePresent = true;
      console.log(this.selectedGoal);
      this.goals[9].src = "assets/img/Bikecolor.png"
    }
    else if (this.selectedGoal.length <= 3 && this.isBikePresent == true) {
      let data = "Bike";
      this.isBikePresent = false
      this.removeData(data);
      this.goals[9].src = "assets/img/Bike.png"
    }

  }

  addCar() {
    if (this.selectedGoal.length < 3 && this.isCarPresent == false) {
      var Car = {
        id: 11,
        type: "Car",
        src: ''
      }
      this.selectedGoal.push(Car);
      this.isCarPresent = true;
      console.log(this.selectedGoal);
      this.goals[10].src = "assets/img/Carcolor.png"
    }
    else if (this.selectedGoal.length <= 3 && this.isCarPresent == true) {
      let data = "Car";
      this.isCarPresent = false
      this.removeData(data);
      this.goals[10].src = "assets/img/Car.png"
    }

  }

  addDreamHome() {
    if (this.selectedGoal.length < 3 && this.isDreamHomePresent == false) {
      var DreamHome = {
        id: 12,
        type: "Dream Home",
        src: ''
      }
      this.selectedGoal.push(DreamHome);
      this.isDreamHomePresent = true;
      console.log(this.selectedGoal);
      this.goals[11].src = "assets/img/Dream Homecolor.png"
    }
    else if (this.selectedGoal.length <= 3 && this.isDreamHomePresent == true) {
      let data = "Dream Home";
      this.isDreamHomePresent = false
      this.removeData(data);
      this.goals[11].src = "assets/img/Dream Home.png"
    }
  }

  addChildsEducation() {
    if (this.selectedGoal.length < 3 && this.isChildsEducationPresent == false) {
      var ChildsEducation = {
        id: 13,
        type: "Childs Education",
        src: ''
      }
      this.selectedGoal.push(ChildsEducation);
      this.isChildsEducationPresent = true;
      console.log(this.selectedGoal)
      this.goals[12].src = "assets/img/Childs Educationcolor.png"
    }
    else if (this.selectedGoal.length <= 3 && this.isChildsEducationPresent == true) {
      let data = "Childs Education";
      this.isChildsEducationPresent = false
      this.removeData(data);
      this.goals[12].src = "assets/img/Childs Education.png"
    }
  }

  addChildsMarriage() {
    if (this.selectedGoal.length < 3 && this.isChildsMarriagePresent == false) {
      var ChildsMarriage = {
        id: 14,
        type: "Childs Marriage",
        src: ''
      }
      this.selectedGoal.push(ChildsMarriage);
      this.isChildsMarriagePresent = true;
      console.log(this.selectedGoal)
      this.goals[13].src = "assets/img/Childs Marriagecolor.png"
    }
    else if (this.selectedGoal.length <= 3 && this.isChildsMarriagePresent == true) {
      let data = "Childs Marriage";
      this.isChildsMarriagePresent = false
      this.removeData(data);
      this.goals[13].src = "assets/img/Childs Marriage.png"
    }
  }

  addRetirement() {
    if (this.selectedGoal.length < 3 && this.isRetirementPresent == false) {
      var Retirement = {
        id: 15,
        type: "Retirement",
        src: ''
      }
      this.selectedGoal.push(Retirement);
      this.isRetirementPresent = true;
      console.log(this.selectedGoal);
      console.log(this.isRetirementPresent);
      this.goals[14].src = "assets/img/Retirementcolor.png";
    }
    else if (this.selectedGoal.length <= 3 && this.isRetirementPresent == true) {
      let data = "Retirement";
      this.isRetirementPresent = false
      this.removeData(data);
      this.goals[14].src = "assets/img/Retirement.png";
    }
  }

  addothergoal(newgoal) {
    console.log(newgoal);
    if (!this.showInput) {
      this.showInput = true
    } else {
      if (this.selectedGoal.length < 3 && this.isOtherGoalPresent == false && this.otherGoalsCount < 3) {
        var othergoal = { "id": this.selectedGoal.length, "type": newgoal, "src": "assets/img/AddOtherGoalcolor.png" } as Igoal;
        this.goals.push(othergoal);
        console.log("othergoal", othergoal);
        this.selectedGoal.push(othergoal);
        this.othergoalImg = "assets/img/AddOtherGoalcolor.png"

        this.otherGoalsCount += 1;
        this.othergoalImg = "assets/img/AddOtherGoal.png"

        this.isOtherGoalPresent = true;
        this.showInput = false;
        this.goalValue = null
        console.log(this.selectedGoal)
      }
      else if (this.selectedGoal.length <= 3 && this.isOtherGoalPresent == true && this.otherGoalsCount <= 3) {
        let data = newgoal;
        this.isOtherGoalPresent = false
        this.removeData(data);
        this.othergoalImg = "assets/img/AddOtherGoal.png"
      }
    }
  }
  /////new goals added ////////// 

  //Removing Goals  
  removeData(value) {
    console.log("data removed");
    for (let i = 0; i < this.selectedGoal.length; i++) {
      console.log(i)
      if (this.selectedGoal[i].type == value) {
        console.log("if statement excecuted successfully")
        this.selectedGoal.splice(i, 1);
        console.log(this.selectedGoal);
      }
      console.log(this.selectedGoal);
    }
  }

  data() {
    let userGoals = {
      user_id: localStorage.getItem('id'),
      selectedgoals: this.selectedGoal
    }
    console.log("usergoal", userGoals);


    if(this.selectedGoal.length > 0){

      this.abs.postGoalData("usergoals", userGoals).subscribe(data => {
        console.log(data);
        this.uid = data['user_id'];
        console.log("uid", this.uid);
        this.router.navigate(['/goals']);
      }, err => {
        console.log(err)
      });
    }

    else(this.errorMsg='Please select goals')
  }
}







