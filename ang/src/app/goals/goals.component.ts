import { Component, OnInit, TestabilityRegistry } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { AdityaBirlaServices } from "../../Shared/Services/calculatorgoal.services"
import { SelectgoalsComponent } from "../selectgoals/selectgoals.component"

import { Igoal } from './../../Shared/Interfaces(Structure)/goal';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from "@angular/forms";

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: [/*'./goals.component.css'*/],
})
export class GoalsComponent implements OnInit {

  // public Img:any;
  public images = [];
  public response;
  public goalsInputValue: Object = [];

  public goals: Igoal;
  public goalData: Array<string> = [];
  public Data;
  public data: any;
  public img: any;
  public img1: any;
  public img2: any;
  public userName: any;
  public selectGoal: any;
  public questions: any;
  public questionType: string;
  public singleSelectedGoal: string;
  public description: string;
  public goalQuestion = [];
  public goalInputValueJson;
  public index: number;
  public userAge: any;
  public dynamicGoal: any;
  public customGoal: any;
  public amountInNumber: string;

  public uid: any;

  public ival: any;

  public abc = [];
  public number = [];
  public percent = []
  public percent5 = [];
  public five = [];
  public age = [];
  public nextGoals = [];

  showDesc: boolean = false;
  showButton: boolean = false;

  //Variables used for Calculations

  public futureValueOfSelfDevelopmentGoal: number
  public futureValueOfStartingBusiness: number;
  public futureValueOfGettingMarried: number;
  public futureValueOfVisitingHoneymoonDestination: number;
  public futureValueOfVisitingHolidayDestination: number;
  public futureValueOfGoingOnWorldTour: number;
  public futureValueOfPassion: number;
  public futureValueOfPhilantrophy: number;
  public futureValueOfBike: number;
  public futureValueOfCar: number;
  public futureValueOfDreamHome: number;
  public futureValueOfChildEducation: number;
  public futureValueOfChildMarriage: number;
  public futureValueOfExpensesInRetirementAge: number;
  public futureValueOfGoal: number;



  public sipNoLumpsum: number = 0;
  public sipWithLumpsum: number = 0;
  public vehicleLoanAmount: number;
  public dreamHomeLoanAmount: number;
  public downPayment: number;
  public downPaymentAmount: number;
  public corpusAmount: number;
  public lifeInsurance: number;

  // public show:boolean;

  constructor(private router: Router, private route: ActivatedRoute, private abs: AdityaBirlaServices, public fb: FormBuilder) { }
  dynamicGoalForm: FormGroup

  ngOnInit() {
    this.getSelectedGoals();
  }

  SubmitGoalsData() {
    this.showButton = !this.showButton;

    ///////   change for next ///////////////////////
    for (let i = 0; i < this.nextGoals.length; i++) {
      let currentObj = this.nextGoals[i];
      let isCalculatevalue = currentObj.isCalculated;
      if (isCalculatevalue == false) {
        this.onGoalClick(currentObj.goalName, currentObj.index, currentObj.goalId);
        return;
      }
    }
    ///////   change for next ///////////////////////

    let goalsData = [];

    if (this.globalCal.goal1.goal_id != 0) {
      goalsData.push(this.globalCal.goal1);
    }
    if (this.globalCal.goal2.goal_id != 0) {
      goalsData.push(this.globalCal.goal2);
    }
    if (this.globalCal.goal3.goal_id != 0) {
      goalsData.push(this.globalCal.goal3);
    }

    let finalResponse = {
      user_id: localStorage.getItem('id'),
      goal_details: goalsData
    }

    console.log("Final Response is ----->>> ", finalResponse);

    this.abs.postInputValuesAndResultOfGoals(finalResponse).subscribe(res => {
      if (res['success'] == true) {
        this.router.navigate(['/termgoals']);
        console.log(res);
      } else {
        //  Show error msg
      }

    });
  }

  getSelectedGoals() {
    this.abs.getdata(localStorage.getItem('id')).subscribe(res => {

      console.log("result ->", res);
      this.selectGoal = res;
      console.log(this.selectGoal);
      this.userName = this.selectGoal[0].name;
      this.userAge = this.selectGoal[0].age
      console.log(this.userAge);
      console.log(this.userName);
      this.img = this.selectGoal;
      console.log("goals", this.img[0].goals);

      console.log('dyanmic goal', this.dynamicGoal);

      ///////   change for next ///////////////////////
      for (let i = 0; i < this.selectGoal.length; i++) {
        let goalObject = {
          "goalName": this.selectGoal[i].goals,
          "goalId": this.selectGoal[i].goal_id,
          "index": i,
          "isCalculated": false
        }
        this.nextGoals.push(goalObject);
      }


      this.goalQuestion = [
        {
          "type": "Self Development",
          "questions": [
            {
              "questionId": "1",
              "name": "What amount is required for your self development goal today?",
              "variableName": "enterAmount",
              'value': null,
              'controlType': 'text',
              'patternError': 'value must be in multiple of 1000',
              'validation': [],
              'placeholder': 'Enter amount',
              'flag': 'display',
              'hasOtherInput': true,
              'hasRequired': true
            },
            {
              "questionId": "1",
              "name": "What amount is required for your self development goal today?",
              "variableName": "enterAmountWithValidation",
              'value': null,
              'controlType': 'text',
              'patternError': 'value must be in multiple of 1000',
              'validation': [{ key: 'required', value: 'value is required', }, { key: 'pattern', value: 'value must be in multiple of 1000', 'pattern': '^[1-9][0-9]*000$' }],
              'placeholder': 'Enter amount',
              'flag': 'noDisplay',
              'hasOtherInput': false
            },
            {
              "questionId": "2",
              "name": "After how many years do you plan to take up your self development goal?",
              "variableName": "enterNumberOfYears",
              'value': null,
              "options": this.number,
              'controlType': 'dropdown',
              'validation': [{ key: 'required', value: 'value is required', }],
              'placeholder': "Enter number of years",
              'flag': 'display',
              'hasOtherInput': false
            },
            {
              "questionId": "3",
              "name": "Expected inflation (% p.a.)",
              "options": this.percent,
              "variableName": "expectedInflation",
              'value': 5,
              'controlType': 'dropdown',
              'validation': [{ key: 'required', value: 'value is required', }],
              'placeholder': 'Enter expected inflation rate',
              'flag': 'display',
              'hasOtherInput': false
            },
            {
              "questionId": "4",
              "name": "Expected returns on investment (% p.a.)",
              "options": this.percent5,
              "variableName": "expectedReturnsOnInvestment",
              'value': 12,
              'controlType': 'dropdown',
              'validation': [{ key: 'required', value: 'value is required', }],
              'placeholder': 'Enter expected return on investment',
              'flag': 'display',
              'hasOtherInput': false
            },
            {
              "questionId": "5",
              "name": "What amount you can invest today as Lumspum?",
              "variableName": "enterLumpsumInvestmentAmount",
              'value': 0,
              'controlType': 'text',
              'patternError': 'value must be 0 or in multiple of 1000',
              'validation': [],
              'placeholder': "Enter lumpsum investment amount",
              'flag': 'display',
              'hasOtherInput': true,
              'hasRequired': false
            },
            {
              "questionId": "5",
              "name": "What amount you can invest today as Lumspum?",
              "variableName": "enterLumpsumInvestmentAmountWithValidation",
              'value': 0,
              'controlType': 'text',
              'patternError': 'value must be 0 or in multiple of 1000',
              'validation': [{ key: 'pattern', value: 'value must be 0 or in multiple of 1000', 'pattern': '^0|[1-9][0-9]*000$' }],
              'placeholder': "Enter lumpsum investment amount",
              'flag': 'noDisplay',
              'hasOtherInput': false,

            }
          ],
        },
        {
          "type": "Starting Business",
          "questions": [
            {
              "questionId": "1",
              "name": "Amount required to start your Business today",
              "variableName": "enterAmount",
              'value': null,
              'controlType': 'text',
              'patternError': 'value must be in multiple of 1000',
              'validation': [],
              'placeholder': 'Enter amount',
              'flag': 'display',
              'hasOtherInput': true,
              'hasRequired': true
            },
            {
              "questionId": "1",
              "name": "Amount required to start your Business today",
              "variableName": "enterAmountWithValidation",
              'value': null,
              'controlType': 'text',
              'patternError': 'value must be in multiple of 1000',
              'validation': [{ key: 'required', value: 'value is required', 'required': false }, { key: 'pattern', value: 'value must be in multiple of 1000', 'pattern': '^[1-9][0-9]*000$' }],
              'placeholder': 'Enter amount',
              'flag': 'noDisplay',
              'hasOtherInput': false
            },
            {
              "questionId": "2",
              "name": "After how many years do you plan to start your Business?",
              "options": this.number,
              "variableName": "enterNumberOfYears",
              'value': null,
              'controlType': 'dropdown',
              'validation': [{ key: 'required', value: 'value is required', 'required': true }],
              'placeholder': "Enter number of years",
              'flag': 'display',
              'hasOtherInput': false
            },
            {
              "questionId": "3",
              "name": "Expected inflation (% per annum)",
              "options": this.percent,
              "variableName": "expectedInflation",
              'value': 5,
              'controlType': 'dropdown',
              'validation': [{ key: 'required', value: 'value is required', 'required': true }],
              'placeholder': 'Enter expected inflation rate',
              'flag': 'display',
              'hasOtherInput': false
            },
            {
              "questionId": "4",
              "name": "Expected returns on investment (% per annum)",
              "options": this.percent5,
              "variableName": "expectedReturnsOnInvestment",
              'value': 12,
              'controlType': 'dropdown',
              'validation': [{ key: 'required', value: 'value is required', 'required': true }],
              'placeholder': 'Enter expected return on investment',
              'flag': 'display',
              'hasOtherInput': false
            },
            {
              "questionId": "5",
              "name": "What amount you can invest today as Lumspum?",
              "variableName": "enterLumpsumInvestmentAmount",
              'controlType': 'text',
              'value': 0,
              'patternError': 'value must be 0 or in multiple of 1000',
              'validation': [],
              'placeholder': "Enter lumpsum investment amount",
              'flag': 'display',
              'hasOtherInput': true
            },
            {
              "questionId": "5",
              "name": "What amount you can invest today as Lumspum?",
              "variableName": "enterLumpsumInvestmentAmountWithValidation",
              'controlType': 'text',
              'value': 0,
              'patternError': 'value must be 0 or in multiple of 1000',
              'validation': [{ key: 'required', value: 'value is required', 'required': false }, { key: 'pattern', value: 'value must be 0 or in multiple of 1000', 'pattern': '^0|[1-9][0-9]*000$' }],
              'placeholder': "Enter lumpsum investment amount",
              'flag': 'noDisplay',
              'hasOtherInput': false
            }
          ],
        },
        {
          "type": "Marriage",
          "questions": [
            {
              "questionId": "1",
              "name": "What amount you would require to get married today?",
              "variableName": "enterAmount",
              'value': null,
              'controlType': 'text',
              'patternError': 'value must be in multiple of 1000',
              'validation': [],
              'placeholder': 'Enter amount',
              'flag': 'display',
              'hasOtherInput': true,
              'hasRequired': true
            },
            {
              "questionId": "1",
              "name": "What amount you would require to get married today?",
              "variableName": "enterAmountWithValidation",
              'value': null,
              'controlType': 'text',
              'patternError': 'value must be in multiple of 1000',
              'validation': [{ key: 'required', value: 'value is required', 'required': false }, { key: 'pattern', value: 'value must be in multiple of 1000', 'pattern': '^[1-9][0-9]*000$' }],
              'placeholder': 'Enter amount',
              'flag': 'noDisplay',
              'hasOtherInput': false
            },
            {
              "questionId": "2",
              "name": "After how many years do you plan to get married?",
              "options": this.number, "fname": "Enter number of years",
              "variableName": "enterNumberOfYears",
              'value': null,
              'controlType': 'dropdown',
              'validation': [{ key: 'required', value: 'value is required', 'required': true }],
              'placeholder': "Enter number of years",
              'flag': 'display',
              'hasOtherInput': false
            },
            {
              "questionId": "3",
              "name": "Expected inflation (% per annum)",
              "options": this.percent,
              "variableName": "expectedInflation",
              'value': 5,
              'controlType': 'dropdown',
              'validation': [{ key: 'required', value: 'value is required', 'required': true }],
              'placeholder': 'Enter expected inflation rate',
              'flag': 'display',
              'hasOtherInput': false
            },
            {
              "questionId": "4",
              "name": "Expected returns on investment (% per annum)",
              "options": this.percent5,
              "variableName": "expectedReturnsOnInvestment",
              'value': 12,
              'controlType': 'dropdown',
              'validation': [{ key: 'required', value: 'value is required', 'required': true }],
              'placeholder': 'Enter expected return on investment',
              'flag': 'display',
              'hasOtherInput': false
            },
            {
              "questionId": "5",
              "name": "What amount you can invest today as Lumspum?",
              "variableName": "enterLumpsumInvestmentAmount",
              'value': 0,
              'controlType': 'text',
              'patternError': 'value must be 0 or in multiple of 1000',
              'validation': [],
              'placeholder': "Enter lumpsum investment amount",
              'flag': 'display',
              'hasOtherInput': true
            },
            {
              "questionId": "5",
              "name": "What amount you can invest today as Lumspum?",
              "variableName": "enterLumpsumInvestmentAmountWithValidation",
              'value': 0,
              'controlType': 'text',
              'patternError': 'value must be 0 or in multiple of 1000',
              'validation': [{ key: 'required', value: 'value is required', 'required': false }, { key: 'pattern', value: 'value must be 0 or in multiple of 1000', 'pattern': '^0|[1-9][0-9]*000$' }],
              'placeholder': "Enter lumpsum investment amount",
              'flag': 'noDisplay',
              'hasOtherInput': false
            },
          ],
        }, {
          "type": "Honeymoon",
          "questions": [
            {
              "questionId": "1",
              "name": "What amount is required to visit your honeymoon destination today?",
              "variableName": "enterAmount",
              'value': null,
              'controlType': 'text',
              'patternError': 'value must be in multiple of 1000',
              'validation': [],
              'placeholder': 'Enter amount',
              'flag': 'display',
              'hasOtherInput': true,
              'hasRequired': true
            },
            {
              "questionId": "1",
              "name": "What amount is required to visit your honeymoon destination today?",
              "variableName": "enterAmountWithValidation",
              'value': null,
              'controlType': 'text',
              'patternError': 'value must be in multiple of 1000',
              'validation': [{ key: 'required', value: 'value is required', 'required': false }, { key: 'pattern', value: 'value must be in multiple of 1000', 'pattern': '^[1-9][0-9]*000$' }],
              'placeholder': 'Enter amount',
              'flag': 'noDisplay',
              'hasOtherInput': false
            },
            {
              "questionId": "2",
              "name": "After how many years do you plan to visit your honeymoon destination?",
              "options": this.number,
              "variableName": "enterNumberOfYears",
              'value': null,
              'controlType': 'dropdown',
              'validation': [{ key: 'required', value: 'value is required', 'required': true }],
              'placeholder': "Enter number of years",
              'flag': 'display',
              'hasOtherInput': false
            },
            {
              "questionId": "3",
              "name": "Expected inflation (% p.a.)",
              "options": this.percent,
              "variableName": "expectedInflation",
              'value': 5,
              'controlType': 'dropdown',
              'validation': [{ key: 'required', value: 'value is required', 'required': true }],
              'placeholder': 'Enter expected inflation rate',
              'flag': 'display',
              'hasOtherInput': false
            },
            {
              "questionId": "4",
              "name": "Expected returns on investment (% p.a.)",
              "options": this.percent5,
              "variableName": "expectedReturnsOnInvestment",
              'value': 12,
              'controlType': 'dropdown',
              'validation': [{ key: 'required', value: 'value is required', 'required': true }],
              'placeholder': 'Enter expected return on investment',
              'flag': 'display',
              'hasOtherInput': false
            },
            {
              "questionId": "5",
              "name": "What amount you can invest today as Lumspum?",
              "variableName": "enterLumpsumInvestmentAmount",
              'value': 0,
              'controlType': 'text',
              'patternError': 'value must be 0 or in multiple of 1000',
              'validation': [],
              'placeholder': "Enter lumpsum investment amount",
              'flag': 'display',
              'hasOtherInput': true
            },
            {
              "questionId": "5",
              "name": "hat amount you can invest today as Lumspum?",
              "variableName": "enterLumpsumInvestmentAmountWithValidation",
              'value': 0,
              'controlType': 'text',
              'patternError': 'value must be 0 or in multiple of 1000',
              'validation': [{ key: 'required', value: 'value is required', 'required': false }, { key: 'pattern', value: 'value must be 0 or in multiple of 1000', 'pattern': '^0|[1-9][0-9]*000$' }],
              'placeholder': "Enter lumpsum investment amount",
              'flag': 'noDisplay',
              'hasOtherInput': false
            }
          ],
        },
        {
          "type": "Wealth Creation",
          "questions": [
            {
              "questionId": "1",
              "name": "How much wealth do you wish you accumulate?",
              "variableName": "enterAmount",
              'value': null,
              'controlType': 'text',
              'patternError': 'value must be in multiple of 1000',
              'validation': [],
              'placeholder': 'Enter amount',
              'flag': 'display',
              'hasOtherInput': true,
              'hasRequired': true
            },
            {
              "questionId": "1",
              "name": "How much wealth do you wish you accumulate?",
              "variableName": "enterAmountWithValidation",
              'value': null,
              'controlType': 'text',
              'patternError': 'value must be in multiple of 1000',
              'validation': [{ key: 'required', value: 'value is required', 'required': false }, { key: 'pattern', value: 'value must be in multiple of 1000', 'pattern': '^[1-9][0-9]*000$' }],
              'placeholder': 'Enter amount',
              'flag': 'noDisplay',
              'hasOtherInput': false
            },
            {
              "questionId": "2",
              "name": "After how many years do you plan to own this wealth?",
              "options": this.number,
              "variableName": "enterNumberOfYears",
              'value': null,
              'controlType': 'dropdown',
              'validation': [{ key: 'required', value: 'value is required', 'required': true }],
              'placeholder': "Enter number of years",
              'flag': 'display',
              'hasOtherInput': false
            },
            {
              "questionId": "3",
              "name": "Expected returns on investment (% p.a.)",
              "options": this.percent5,
              "variableName": "expectedReturnsOnInvestment",
              'value': 12,
              'controlType': 'dropdown',
              'validation': [{ key: 'required', value: 'value is required', 'required': true }],
              'placeholder': 'Enter expected return on investment',
              'flag': 'display',
              'hasOtherInput': false
            },
            {
              "questionId": "4",
              "name": "Enter the savings you wish to invest for wealth creation?",
              "variableName": "enterLumpsumInvestmentAmount",
              'value': 0,
              'controlType': 'text',
              'patternError': 'value must be 0 or in multiple of 1000',
              'validation': [],
              'placeholder': "Enter lumpsum investment amount",
              'flag': 'display',
              'hasOtherInput': true
            },
            {
              "questionId": "4",
              "name": "Enter the savings you wish to invest for wealth creation?",
              "variableName": "enterLumpsumInvestmentAmountWithValidation",
              'value': 0,
              'controlType': 'text',
              'patternError': 'value must be 0 or in multiple of 1000',
              'validation': [{ key: 'required', value: 'value is required', 'required': false }, { key: 'pattern', value: 'value must be 0 or in multiple of 1000', 'pattern': '^0|[1-9][0-9]*000$' }],
              'placeholder': "Enter lumpsum investment amount",
              'flag': 'noDisplay',
              'hasOtherInput': false
            }
          ],
        }, {
          "type": "Holiday",
          "questions": [
            {
              "questionId": "1",
              "name": "Enter the amount required to visit your holiday destination today?",
              "variableName": "enterAmount",
              'value': null,
              'controlType': 'text',
              'patternError': 'value must be in multiple of 1000',
              'validation': [],
              'placeholder': 'Enter amount',
              'flag': 'display',
              'hasOtherInput': true,
              'hasRequired': true
            },
            {
              "questionId": "1",
              "name": "Enter the amount required to visit your holiday destination today?",
              "variableName": "enterAmountWithValidation",
              'value': null,
              'controlType': 'text',
              'patternError': 'value must be in multiple of 1000',
              'validation': [{ key: 'required', value: 'value is required', 'required': false }, { key: 'pattern', value: 'value must be in multiple of 1000', 'pattern': '^[1-9][0-9]*000$' }],
              'placeholder': 'Enter amount',
              'flag': 'noDisplay',
              'hasOtherInput': false
            },
            {
              "questionId": "2",
              "name": "After how many years do you plan to visit your holiday destination?",
              "options": this.number,
              "variableName": "enterNumberOfYears",
              'value': null,
              'controlType': 'dropdown',
              'validation': [{ key: 'required', value: 'value is required', 'required': true }],
              'placeholder': "Enter number of years",
              'flag': 'display',
              'hasOtherInput': false
            },
            {
              "questionId": "3",
              "name": "Expected inflation (% p.a.)",
              "options": this.percent,
              "variableName": "expectedInflation",
              'value': 5,
              'controlType': 'dropdown',
              'validation': [{ key: 'required', value: 'value is required', 'required': true }],
              'placeholder': 'Enter expected inflation rate',
              'flag': 'display',
              'hasOtherInput': false
            },
            {
              "questionId": "4",
              "name": "Expected returns on investment (% p.a.)",
              "options": this.percent5,
              "variableName": "expectedReturnsOnInvestment",
              'value': 12,
              'controlType': 'dropdown',
              'validation': [{ key: 'required', value: 'value is required', 'required': true }],
              'placeholder': 'Enter expected return on investment',
              'flag': 'display',
              'hasOtherInput': false
            },
            {
              "questionId": "5",
              "name": "What amount you can invest today as Lumspum?",
              "variableName": "enterLumpsumInvestmentAmount",
              'value': 0,
              'controlType': 'text',
              'patternError': 'value must be 0 or in multiple of 1000',
              'validation': [],
              'placeholder': "Enter lumpsum investment amount",
              'flag': 'display',
              'hasOtherInput': true
            },
            {
              "questionId": "5",
              "name": "What amount you can invest today as Lumspum?",
              "variableName": "enterLumpsumInvestmentAmountWithValidation",
              'value': 0,
              'controlType': 'text',
              'patternError': 'value must be 0 or in multiple of 1000',
              'validation': [{ key: 'required', value: 'value is required', 'required': false }, { key: 'pattern', value: 'value must be 0 or in multiple of 1000', 'pattern': '^0|[1-9][0-9]*000$' }],
              'placeholder': "Enter lumpsum investment amount",
              'flag': 'noDisplay',
              'hasOtherInput': false
            }
          ],
        },
        {
          "type": "World Tour",
          "questions": [
            {
              "questionId": "1",
              "name": "What's the current cost of going on a World Tour?",
              "variableName": "enterAmount",
              'value': null,
              'controlType': 'text',
              'patternError': 'value must be in multiple of 1000',
              'validation': [],
              'placeholder': 'Enter amount',
              'flag': 'display',
              'hasOtherInput': true,
              'hasRequired': true
            },
            {
              "questionId": "1",
              "name": "What's the current cost of going on a World Tour?",
              "variableName": "enterAmountWithValidation",
              'value': null,
              'controlType': 'text',
              'patternError': 'value must be in multiple of 1000',
              'validation': [{ key: 'required', value: 'value is required', 'required': false }, { key: 'pattern', value: 'value must be in multiple of 1000', 'pattern': '^[1-9][0-9]*000$' }],
              'placeholder': 'Enter amount',
              'flag': 'noDisplay',
              'hasOtherInput': false

            },
            {
              "questionId": "2",
              "name": "After how many years do you plan to go for a World Tour?",
              "options": this.number,
              "variableName": "enterNumberOfYears",
              'value': null,
              'controlType': 'dropdown',
              'validation': [{ key: 'required', value: 'value is required', 'required': true }],
              'placeholder': "Enter number of years",
              'flag': 'display',
              'hasOtherInput': false
            },
            {
              "questionId": "3",
              "name": "Expected inflation (% p.a.)",
              "options": this.percent,
              "variableName": "expectedInflation",
              'value': 5,
              'controlType': 'dropdown',
              'validation': [{ key: 'required', value: 'value is required', 'required': true }],
              'placeholder': 'Enter expected inflation rate',
              'flag': 'display',
              'hasOtherInput': false
            },
            {
              "questionId": "4",
              "name": "Expected returns on investment (% p.a.)",
              "options": this.percent5,
              "variableName": "expectedReturnsOnInvestment",
              'value': 12,
              'controlType': 'dropdown',
              'validation': [{ key: 'required', value: 'value is required', 'required': true }],
              'placeholder': 'Enter expected return on investment',
              'flag': 'display',
              'hasOtherInput': false
            },
            {
              "questionId": "5",
              "name": "What amount you can invest today as Lumspum?",
              "variableName": "enterLumpsumInvestmentAmount",
              'value': 0,
              'controlType': 'text',
              'patternError': 'value must be 0 or in multiple of 1000',
              'validation': [],
              'placeholder': "Enter lumpsum investment amount",
              'flag': 'display',
              'hasOtherInput': true
            },
            {
              "questionId": "5",
              "name": "What amount you can invest today as Lumspum?",
              "variableName": "enterLumpsumInvestmentAmountWithValidation",
              'value': 0,
              'controlType': 'text',
              'patternError': 'value must be 0 or in multiple of 1000',
              'validation': [{ key: 'required', value: 'value is required', 'required': false }, { key: 'pattern', value: 'value must be 0 or in multiple of 1000', 'pattern': '^0|[1-9][0-9]*000$' }],
              'placeholder': "Enter lumpsum investment amount",
              'flag': 'noDisplay',
              'hasOtherInput': false
            }
          ],
        },
        {
          "type": "Follow Passion",
          "questions": [
            {
              "questionId": "1",
              "name": "What's the current cost of activity (passion) you want to pursue?",
              "variableName": "enterAmount",
              'value': null,
              'controlType': 'text',
              'patternError': 'value must be in multiple of 1000',
              'validation': [],
              'placeholder': 'Enter amount',
              'flag': 'display',
              'hasOtherInput': true,
              'hasRequired': true
            },
            {
              "questionId": "1",
              "name": "What's the current cost of activity (passion) you want to pursue?",
              "variableName": "enterAmountWithValidation",
              'value': null,
              'controlType': 'text',
              'patternError': 'value must be in multiple of 1000',
              'validation': [{ key: 'required', value: 'value is required', 'required': false }, { key: 'pattern', value: 'value must be in multiple of 1000', 'pattern': '^[1-9][0-9]*000$' }],
              'placeholder': 'Enter amount',
              'flag': 'noDisplay',
              'hasOtherInput': false
            },
            {
              "questionId": "2",
              "name": "After how many years do you plan to pursue your passion?",
              "options": this.number,
              "variableName": "enterNumberOfYears",
              'value': null,
              'controlType': 'dropdown',
              'validation': [{ key: 'required', value: 'value is required', 'required': true }],
              'placeholder': "Enter number of years",
              'flag': 'display',
              'hasOtherInput': false
            },
            {
              "questionId": "3",
              "name": "Expected inflation (% p.a.)",
              "options": this.percent,
              "variableName": "expectedInflation",
              'value': 5,
              'controlType': 'dropdown',
              'validation': [{ key: 'required', value: 'value is required', 'required': true }],
              'placeholder': 'Enter expected inflation rate',
              'flag': 'display',
              'hasOtherInput': false
            },
            {
              "questionId": "4",
              "name": "Expected returns on investment (% p.a.)",
              "options": this.percent5,
              "variableName": "expectedReturnsOnInvestment",
              'value': 12,
              'controlType': 'dropdown',
              'validation': [{ key: 'required', value: 'value is required', 'required': true }],
              'placeholder': 'Enter expected return on investment',
              'flag': 'display',
              'hasOtherInput': false
            },
            {
              "questionId": "5",
              "name": "What amount you can invest today as Lumspum?",
              "variableName": "enterLumpsumInvestmentAmount",
              'value': 0,
              'controlType': 'text',
              'patternError': 'value must be 0 or in multiple of 1000',
              'validation': [],
              'placeholder': "Enter lumpsum investment amount",
              'flag': 'display',
              'hasOtherInput': true
            },
            {
              "questionId": "5",
              "name": "What amount you can invest today as Lumspum?",
              "variableName": "enterLumpsumInvestmentAmountWithValidation",
              'value': 0,
              'controlType': 'text',
              'patternError': 'value must be 0 or in multiple of 1000',
              'validation': [{ key: 'required', value: 'value is required', 'required': false }, { key: 'pattern', value: 'value must be 0 or in multiple of 1000', 'pattern': '^0|[1-9][0-9]*000$' }],
              'placeholder': "Enter lumpsum investment amount",
              'flag': 'noDisplay',
              'hasOtherInput': false
            }
          ],
        }, {
          "type": "Philanthropy",
          "questions": [
            {
              "questionId": "1",
              "name": "What amount you would liked to contribute today, if you were to donate today?	",
              "variableName": "enterAmount",
              'value': null,
              'controlType': 'text',
              'patternError': 'value must be in multiple of 1000',
              'validation': [],
              'placeholder': 'Enter amount',
              'flag': 'display',
              'hasOtherInput': true,
              'hasRequired': true
            },
            {
              "questionId": "1",
              "name": "What amount you would liked to contribute today, if you were to donate today?	",
              "variableName": "enterAmountWithValidation",
              'value': null,
              'controlType': 'text',
              'patternError': 'value must be in multiple of 1000',
              'validation': [{ key: 'required', value: 'value is required', 'required': false }, { key: 'pattern', value: 'value must be in multiple of 1000', 'pattern': '^[1-9][0-9]*000$' }],
              'placeholder': 'Enter amount',
              'flag': 'noDisplay',
              'hasOtherInput': false
            },
            {
              "questionId": "2",
              "name": "After how many years do you plan to contribute for the donation?",
              "options": this.number,
              "variableName": "enterNumberOfYears",
              'value': null,
              'controlType': 'dropdown',
              'validation': [{ key: 'required', value: 'value is required', 'required': true }],
              'placeholder': "Enter number of years",
              'flag': 'display',
              'hasOtherInput': false
            },
            {
              "questionId": "3",
              "name": "Expected inflation (% p.a.)",
              "options": this.percent,
              "variableName": "expectedInflation",
              'value': 5,
              'controlType': 'dropdown',
              'validation': [{ key: 'required', value: 'value is required', 'required': true }],
              'placeholder': 'Enter expected inflation rate',
              'flag': 'display',
              'hasOtherInput': false
            },
            {
              "questionId": "4",
              "name": "Expected returns on investment (% p.a.)",
              "options": this.percent5,
              "variableName": "expectedReturnsOnInvestment",
              'value': 12,
              'controlType': 'dropdown',
              'validation': [{ key: 'required', value: 'value is required', 'required': true }],
              'placeholder': 'Enter expected return on investment',
              'flag': 'display',
              'hasOtherInput': false
            },
            {
              "questionId": "5",
              "name": "What amount you can invest today as Lumspum?	",
              "variableName": "enterLumpsumInvestmentAmount",
              'value': 0,
              'controlType': 'text',
              'patternError': 'value must be 0 or in multiple of 1000',
              'validation': [],
              'placeholder': "Enter lumpsum investment amount",
              'flag': 'display',
              'hasOtherInput': true
            },
            {
              "questionId": "5",
              "name": "What amount you can invest today as Lumspum?	",
              "variableName": "enterLumpsumInvestmentAmountWithValidation",
              'value': 0,
              'controlType': 'text',
              'patternError': 'value must be 0 or in multiple of 1000',
              'validation': [{ key: 'required', value: 'value is required', 'required': false }, { key: 'pattern', value: 'value must be 0 or in multiple of 1000', 'pattern': '^0|[1-9][0-9]*000$' }],
              'placeholder': "Enter lumpsum investment amount",
              'flag': 'noDisplay',
              'hasOtherInput': false
            }
          ],
        },
        {
          "type": "Bike",
          "questions": [
            {
              "questionId": "1",
              "name": "What is the cost of Bike today?",
              "variableName": "enterAmount",
              'value': null,
              'controlType': 'text',
              'patternError': 'value must be in multiple of 1000',
              'validation': [],
              'placeholder': 'Enter amount',
              'flag': 'display',
              'hasOtherInput': true,
              'hasRequired': true
            },
            {
              "questionId": "1",
              "name": "What is the cost of Bike today?",
              "variableName": "enterAmountWithValidation",
              'value': null,
              'controlType': 'text',
              'patternError': 'value must be in multiple of 1000',
              'validation': [{ key: 'required', value: 'value is required', 'required': false }, { key: 'pattern', value: 'value must be in multiple of 1000', 'pattern': '^[1-9][0-9]*000$' }],
              'placeholder': 'Enter amount',
              'flag': 'noDisplay',
              'hasOtherInput': false
            },
            {
              "questionId": "2",
              "name": "After how many years do you plan to buy the bike?",
              "options": this.number,
              "variableName": "enterNumberOfYears",
              'value': null,
              'controlType': 'dropdown',
              'validation': [{ key: 'required', value: 'value is required', 'required': true }],
              'placeholder': "Enter number of years",
              'flag': 'display',
              'hasOtherInput': false
            },
            {
              "questionId": "3",
              "name": "Expected inflation (% p.a.)",
              "options": this.percent,
              "variableName": "expectedInflation",
              'value': 5,
              'controlType': 'dropdown',
              'validation': [{ key: 'required', value: 'value is required', 'required': true }],
              'placeholder': 'Enter expected inflation rate',
              'flag': 'display',
              'hasOtherInput': false
            },
            {
              "questionId": "4",
              "name": "Bike Loan funding (%)",
              "options": this.five,
              "variableName": "loanFunding",
              'value': 50,
              'controlType': 'dropdown',
              'validation': [{ key: 'required', value: 'value is required', 'required': true }],
              'placeholder': 'Enter Bike loan funding (%)',
              'flag': 'display',
              'hasOtherInput': false
            },
            {
              "questionId": "5",
              "name": "Expected returns on your investment (% p.a.)",
              "options": this.percent5,
              "variableName": "expectedReturnsOnInvestment",
              'value': 12,
              'controlType': 'dropdown',
              'validation': [{ key: 'required', value: 'value is required', 'required': true }],
              'placeholder': 'Enter expected return on investment',
              'flag': 'display',
              'hasOtherInput': false
            },
            {
              "questionId": "6",
              "name": "How much can you invest as lumpsum today?",
              "variableName": "enterLumpsumInvestmentAmount",
              'value': 0,
              'controlType': 'text',
              'patternError': 'value must be 0 or in multiple of 1000',
              'validation': [],
              'placeholder': "Enter lumpsum investment amount",
              'flag': 'display',
              'hasOtherInput': true
            },
            {
              "questionId": "6",
              "name": "How much can you invest as lumpsum today?",
              "variableName": "enterLumpsumInvestmentAmountWithValidation",
              'value': 0,
              'controlType': 'text',
              'patternError': 'value must be 0 or in multiple of 1000',
              'validation': [{ key: 'required', value: 'value is required', 'required': false }, { key: 'pattern', value: 'value must be 0 or in multiple of 1000', 'pattern': '^0|[1-9][0-9]*000$' }],
              'placeholder': "Enter lumpsum investment amount",
              'flag': 'noDisplay',
              'hasOtherInput': false
            }
          ]
        },
        {
          "type": "Car",
          "questions": [
            {
              "questionId": "1",
              "name": "What is the cost of Car today?",
              "variableName": "enterAmount",
              'value': null,
              'controlType': 'text',
              'patternError': 'value must be in multiple of 1000',
              'validation': [],
              'placeholder': 'Enter amount',
              'flag': 'display',
              'hasOtherInput': true,
              'hasRequired': true
            },
            {
              "questionId": "1",
              "name": "What is the cost of Car today?",
              "variableName": "enterAmountWithValidation",
              'value': null,
              'controlType': 'text',
              'patternError': 'value must be in multiple of 1000',
              'validation': [{ key: 'required', value: 'value is required', 'required': false }, { key: 'pattern', value: 'value must be in multiple of 1000', 'pattern': '^[1-9][0-9]*000$' }],
              'placeholder': 'Enter amount',
              'flag': 'noDisplay',
              'hasOtherInput': false
            },
            {
              "questionId": "2",
              "name": "After how many years do you plan to buy the car?",
              "options": this.number,
              "variableName": "enterNumberOfYears",
              'value': null,
              'controlType': 'dropdown',
              'validation': [{ key: 'required', value: 'value is required', 'required': true }],
              'placeholder': "Enter number of years",
              'flag': 'display',
              'hasOtherInput': false
            },
            {
              "questionId": "3",
              "name": "Expected inflation (% p.a.)",
              "options": this.percent,
              "variableName": "expectedInflation",
              'value': 5,
              'controlType': 'dropdown',
              'validation': [{ key: 'required', value: 'value is required', 'required': true }],
              'placeholder': 'Enter expected inflation rate',
              'flag': 'display',
              'hasOtherInput': false
            },
            {
              "questionId": "4",
              "name": "Car Loan funding (%)",
              "options": this.five,
              "variableName": "loanFunding",
              'value': 50,
              'controlType': 'dropdown',
              'validation': [{ key: 'required', value: 'value is required', 'required': true }],
              'placeholder': 'Enter Car loan funding (%)',
              'flag': 'display',
              'hasOtherInput': false
            },
            {
              "questionId": "5",
              "name": "Expected returns on your investment (% p.a.)",
              "options": this.percent5,
              "variableName": "expectedReturnsOnInvestment",
              'value': 12,
              'controlType': 'text',
              'validation': [{ key: 'required', value: 'value is required', 'required': true }],
              'placeholder': 'Enter expected return on investment',
              'flag': 'display',
              'hasOtherInput': false
            },
            {
              "questionId": "6",
              "name": "How much can you invest as lumpsum today?",
              "variableName": "enterLumpsumInvestmentAmount",
              'value': 0,
              'controlType': 'text',
              'patternError': 'value must be 0 or in multiple of 1000',
              'validation': [],
              'placeholder': "Enter lumpsum investment amount",
              'flag': 'display',
              'hasOtherInput': true
            },
            {
              "questionId": "6",
              "name": "How much can you invest as lumpsum today?",
              "variableName": "enterLumpsumInvestmentAmountWithValidation",
              'value': 0,
              'controlType': 'text',
              'patternError': 'value must be 0 or in multiple of 1000',
              'validation': [{ key: 'required', value: 'value is required', 'required': false }, { key: 'pattern', value: 'value must be 0 or in multiple of 1000', 'pattern': '^0|[1-9][0-9]*000$' }],
              'placeholder': "Enter lumpsum investment amount",
              'flag': 'noDisplay',
              'hasOtherInput': false
            }
          ]
        },
        {
          "type": "Dream Home",
          "questions": [
            {
              "questionId": "1",
              "name": "What is the cost of your dream home today?",
              "variableName": "enterAmount",
              'value': null,
              'controlType': 'text',
              'patternError': 'value must be in multiple of 1000',
              'validation': [],
              'placeholder': 'Enter amount',
              'flag': 'display',
              'hasOtherInput': true,
              'hasRequired': true
            },
            {
              "questionId": "1",
              "name": "What is the cost of your dream home today?",
              "variableName": "enterAmountWithValidation",
              'value': null,
              'controlType': 'text',
              'patternError': 'value must be in multiple of 1000',
              'validation': [{ key: 'required', value: 'value is required', 'required': false }, { key: 'pattern', value: 'value must be in multiple of 1000', 'pattern': '^[1-9][0-9]*000$' }],
              'placeholder': 'Enter amount',
              'flag': 'noDisplay',
              'hasOtherInput': false
            },
            {
              "questionId": "2",
              "name": "After how many years do you plan to buy your dream home?",
              "options": this.number,
              "variableName": "enterNumberOfYears",
              'value': null,
              'controlType': 'dropdown',
              'validation': [{ key: 'required', value: 'value is required', 'required': true }],
              'placeholder': "Enter number of years",
              'flag': 'display',
              'hasOtherInput': false
            },
            {
              "questionId": "3",
              "name": "Expected inflation (% p.a.)",
              "options": this.percent,
              "variableName": "expectedInflation",
              'value': 5,
              'controlType': 'dropdown',
              'validation': [{ key: 'required', value: 'value is required', 'required': true }],
              'placeholder': 'Enter expected inflation rate',
              'flag': 'display',
              'hasOtherInput': false
            },
            {
              "questionId": "4",
              "name": "Dream Home Loan funding (%)",
              "options": this.five,
              "variableName": "loanFunding",
              'value': 80,
              'controlType': 'dropdown',
              'validation': [{ key: 'required', value: 'value is required', 'required': true }],
              'placeholder': 'Enter Dream Home loan funding (%)',
              'flag': 'display',
              'hasOtherInput': false
            },
            {
              "questionId": "5",
              "name": "Expected returns on your investment (% p.a.)",
              "options": this.percent5,
              "variableName": "expectedReturnsOnInvestment",
              'value': 12,
              'controlType': 'dropdown',
              'validation': [{ key: 'required', value: 'value is required', 'required': true }],
              'placeholder': 'Enter expected return on investment',
              'flag': 'display',
              'hasOtherInput': false
            },
            {
              "questionId": "6",
              "name": "How much can you invest as lumpsum today?",
              "variableName": "enterLumpsumInvestmentAmount",
              'value': 0,
              'controlType': 'text',
              'patternError': 'value must be 0 or in multiple of 1000',
              'validation': [],
              'placeholder': "Enter lumpsum investment amount",
              'flag': 'display',
              'hasOtherInput': true
            },
            {
              "questionId": "6",
              "name": "How much can you invest as lumpsum today?",
              "variableName": "enterLumpsumInvestmentAmountWithValidation",
              'value': 0,
              'controlType': 'text',
              'patternError': 'value must be 0 or in multiple of 1000',
              'validation': [{ key: 'required', value: 'value is required', 'required': false }, { key: 'pattern', value: 'value must be 0 or in multiple of 1000', 'pattern': '^0|[1-9][0-9]*000$' }],
              'placeholder': "Enter lumpsum investment amount",
              'flag': 'noDisplay',
              'hasOtherInput': false
            }
          ]
        },
        {
          "type": "Childs Education",
          "questions": [
            {
              "questionId": "1",
              "name": "Enter your Child's name",
              "variableName": "enterChildName",
              'value': null,
              'controlType': 'text',
              'patternError': 'No special character or number allowed',
              'validation': [{ key: 'required', value: 'name is required', 'required': true }, { key: 'pattern', value: 'No special character or number allowed', 'pattern': '[a-zA-Z ]*$' }],
              'placeholder': "Enter child name",
              'flag': 'display',
              'hasOtherInput': false
            },
            {
              "questionId": "2",
              "name": "After how many years does your child wants to go for higher education",
              "options": this.number,
              "variableName": "enterNumberOfYears",
              'value': null,
              'controlType': 'dropdown',
              'validation': [{ key: 'required', value: 'value is required', 'required': true }],
              'placeholder': "Enter age in years",
              'flag': 'display',
              'hasOtherInput': false
            },
            {
              "questionId": "3",
              "name": "Enter today's cost to fulfill your child's education",
              "variableName": "enterAmount",
              'value': null,
              'controlType': 'text',
              'patternError': 'value must be in multiple of 1000',
              'validation': [],
              'placeholder': 'Enter amount',
              'flag': 'display',
              'hasOtherInput': true,
              'hasRequired': true
            },
            {
              "questionId": "3",
              "name": "Enter today's cost to fulfill your child's education",
              "variableName": "enterAmountWithValidation",
              'value': null,
              'controlType': 'text',
              'patternError': 'value must be in multiple of 1000',
              'validation': [{ key: 'required', value: 'value is required', 'required': false }, { key: 'pattern', value: 'value must be in multiple of 1000', 'pattern': '^[1-9][0-9]*000$' }],
              'placeholder': 'Enter amount',
              'flag': 'noDisplay',
              'hasOtherInput': false
            },
            {
              "questionId": "4",
              "name": "Expected inflation (% p.a.)",
              "options": this.percent,
              "variableName": "expectedInflation",
              'value': 5,
              'controlType': 'dropdown',
              'validation': [{ key: 'required', value: 'value is required', 'required': true }],
              'placeholder': 'Enter expected inflation rate',
              'flag': 'display',
              'hasOtherInput': false
            },
            {
              "questionId": "5",
              "name": "Expected returns on investment (% p.a.)",
              "options": this.percent5,
              "variableName": "expectedReturnsOnInvestment",
              'value': 12,
              'controlType': 'dropdown',
              'validation': [{ key: 'required', value: 'value is required', 'required': true }],
              'placeholder': 'Enter expected return on investment',
              'flag': 'display',
              'hasOtherInput': false
            },
            {
              "questionId": "6",
              "name": "What amount you can invest today as Lumspum?",
              "variableName": "enterLumpsumInvestmentAmount",
              'value': 0,
              'controlType': 'text',
              'patternError': 'value must be 0 or in multiple of 1000',
              'validation': [],
              'placeholder': "Enter lumpsum investment amount",
              'flag': 'display',
              'hasOtherInput': true
            },
            {
              "questionId": "6",
              "name": "What amount you can invest today as Lumspum?",
              "variableName": "enterLumpsumInvestmentAmountWithValidation",
              'value': 0,
              'controlType': 'text',
              'patternError': 'value must be 0 or in multiple of 1000',
              'validation': [{ key: 'required', value: 'value is required', 'required': false }, { key: 'pattern', value: 'value must be 0 or in multiple of 1000', 'pattern': '^0|[1-9][0-9]*000$' }],
              'placeholder': "Enter lumpsum investment amount",
              'flag': 'noDisplay',
              'hasOtherInput': false
            }
          ]
        },
        {
          "type": "Childs Marriage",
          "questions": [
            {
              "questionId": "1",
              "name": "Enter your Child's name",
              "variableName": "enterChildName",
              'value': null,
              'controlType': 'text',
              'patternError': 'No special character or number allowed',
              'validation': [{ key: 'required', value: 'name is required', 'required': true }, { key: 'pattern', value: 'No special character or number allowed', 'pattern': '[a-zA-Z ]*$' }],
              'placeholder': "Enter child name",
              'flag': 'display',
              'hasOtherInput': false
            },
            {
              "questionId": "2",
              "name": "Enter the age when your child might get married",
              "options": this.number,
              "variableName": "enterNumberOfYears",
              'value': null,
              'controlType': 'dropdown',
              'validation': [{ key: 'required', value: 'value is required', 'required': true }],
              'placeholder': "Enter age in years",
              'flag': 'display',
              'hasOtherInput': false
            },
            {
              "questionId": "3",
              "name": "Enter today's cost for your Child's marriage",
              "variableName": "enterAmount",
              'value': null,
              'controlType': 'text',
              'patternError': 'value must be in multiple of 1000',
              'validation': [],
              'placeholder': 'Enter amount',
              'flag': 'display',
              'hasOtherInput': true,
              'hasRequired': true
            },
            {
              "questionId": "3",
              "name": "Enter today's cost for your Child's marriage",
              "variableName": "enterAmountWithValidation",
              'value': null,
              'controlType': 'text',
              'patternError': 'value must be in multiple of 1000',
              'validation': [{ key: 'required', value: 'value is required', 'required': false }, { key: 'pattern', value: 'value must be in multiple of 1000', 'pattern': '^[1-9][0-9]*000$' }],
              'placeholder': 'Enter amount',
              'flag': 'noDisplay',
              'hasOtherInput': false
            },
            {
              "questionId": "4",
              "name": "Expected inflation (% p.a.)",
              "options": this.percent,
              "variableName": "expectedInflation",
              'value': 5,
              'controlType': 'dropdown',
              'validation': [{ key: 'required', value: 'value is required', 'required': true }],
              'placeholder': 'Enter expected inflation rate',
              'flag': 'display',
              'hasOtherInput': false
            },
            {
              "questionId": "5",
              "name": "Expected returns on investment (% p.a.)",
              "options": this.percent5,
              "variableName": "expectedReturnsOnInvestment",
              'value': 12,
              'controlType': 'dropdown',
              'validation': [{ key: 'required', value: 'value is required', 'required': true }],
              'placeholder': 'Enter expected return on investment',
              'flag': 'display',
              'hasOtherInput': false
            },
            {
              "questionId": "6",
              "name": "What amount you can invest today as Lumspum?",
              "variableName": "enterLumpsumInvestmentAmount",
              'value': 0,
              'controlType': 'text',
              'patternError': 'value must be 0 or in multiple of 1000',
              'validation': [],
              'placeholder': "Enter lumpsum investment amount",
              'flag': 'display',
              'hasOtherInput': true,

            },
            {
              "questionId": "6",
              "name": "What amount you can invest today as Lumspum?",
              "variableName": "enterLumpsumInvestmentAmountWithValidation",
              'value': 0,
              'controlType': 'text',
              'patternError': 'value must be 0 or in multiple of 1000',
              'validation': [{ key: 'required', value: 'value is required', 'required': false }, { key: 'pattern', value: 'value must be 0 or in multiple of 1000', 'pattern': '^0|[1-9][0-9]*000$' }],
              'placeholder': "Enter lumpsum investment amount",
              'flag': 'noDisplay',
              'hasOtherInput': false
            }
          ]
        },
        {
          "type": "Retirement",
          "questions": [
            {
              "questionId": "1",
              "name": "What's your current age?",
              "variableName": "currentAge",
              'value': this.userAge,
              'controlType': 'text',
              'validation': [{ key: 'required', value: 'value is required', 'required': true }],
              'flag': 'display',
              'hasOtherInput': false,
              'disabled': true,
            },
            {
              "questionId": "2",
              "name": "At what age you plan to retire?",
              "options": this.age,
              "variableName": "enterRetirementAge",
              'value': null,
              'controlType': 'dropdown',
              'validation': [{ key: 'required', value: 'value is required', 'required': true }],
              'placeholder': "Enter retirement age",
              'flag': 'display',
              'hasOtherInput': false,
              'disabled': false,
            },
            {
              "questionId": "3",
              "name": "What are your current annual expenses?",
              "variableName": "enterAmount",
              'value': null,
              'controlType': 'text',
              'patternError': 'value must be in multiple of 1000',
              'validation': [],
              'placeholder': 'Enter amount',
              'flag': 'display',
              'hasOtherInput': true,
              'hasRequired': true,
              'disabled': false,
            },
            {
              "questionId": "3",
              "name": "What are your current annual expenses?",
              "variableName": "enterAmountWithValidation",
              'value': null,
              'controlType': 'text',
              'patternError': 'value must be in multiple of 1000',
              'validation': [{ key: 'required', value: 'value is required', 'required': false }, { key: 'pattern', value: 'value must be in multiple of 1000', 'pattern': '^[1-9][0-9]*000$' }],
              'placeholder': 'Enter amount',
              'flag': 'noDisplay',
              'hasOtherInput': false,
              'disabled': false,
            },
            {
              "questionId": "4",
              "name": "What is the expected rate of inflation? (Before Retirement)",
              "options": this.percent,
              "variableName": "expectedInflationBeforeRetiremnet",
              'value': 5,
              'controlType': 'dropdown',
              'validation': [{ key: 'required', value: 'value is required', 'required': true }],
              'placeholder': 'Enter expected inflation rate',
              'flag': 'display',
              'hasOtherInput': false,
              'disabled': false,
            },
            {
              "questionId": "5",
              "name": "What is the expected rate of return? (Before Retirement)",
              "options": this.percent5,
              "variableName": "rateOfReturnBeforeRetirement",
              'value': 12,
              'controlType': 'dropdown',
              'validation': [{ key: 'required', value: 'value is required', 'required': true }],
              'flag': 'display',
              'hasOtherInput': false,
              'disabled': false,
            },
            {
              "questionId": "6",
              "name": "What is the expected rate of return on your retirement saving? (Post Retirement)",
              "options": this.percent5,
              "variableName": "rateOfReturnPostRetirement",
              'value': 8,
              'controlType': 'dropdown',
              'validation': [{ key: 'required', value: 'value is required', 'required': true }],
              'flag': 'display',
              'hasOtherInput': false,
              'disabled': false,
            },
            {
              "questionId": "7",
              "name": "How much can you invest as lumpsum today for your retirement?",
              "variableName": "enterLumpsumInvestmentAmount",
              'value': 0,
              'controlType': 'text',
              'patternError': 'value must be 0 or in multiple of 1000',
              'validation': [],
              'placeholder': "Enter lumpsum investment amount",
              'flag': 'display',
              'hasOtherInput': true,
              'disabled': false,
            },
            {
              "questionId": "7",
              "name": "How much can you invest as lumpsum today for your retirement?",
              "variableName": "enterLumpsumInvestmentAmountWithValidation",
              'value': 0,
              'controlType': 'text',
              'patternError': 'value must be 0 or in multiple of 1000',
              'validation': [{ key: 'required', value: 'value is required', 'required': false }, { key: 'pattern', value: 'value must be 0 or in multiple of 1000', 'pattern': '^0|[1-9][0-9]*000$' }],
              'placeholder': "Enter lumpsum investment amount",
              'flag': 'noDisplay',
              'hasOtherInput': false,
              'disabled': false,
            }
          ]
        },
        {
          "type": "customGoal",
          "questions": [
            {
              "questionId": "1",
              "name": "What's your Goal?",
              "variableName": "goalName",
              'value': this.customGoal,
              'controlType': 'text',
              'patternError': 'No special character or number allowed',
              'validation': [{ key: 'required', value: 'Goal name is required', 'required': true }, { key: 'pattern', value: 'No special character or number allowed', 'pattern': '[a-zA-Z ]*$' }],
              'flag': 'display',
              'hasOtherInput': false,
              'disabled': true,
            },
            {
              "questionId": "2",
              "name": "What's the cost to fund your goal today?",
              "variableName": "enterAmount",
              'value': null,
              'controlType': 'text',
              'patternError': 'value must be in multiple of 1000',
              'validation': [],
              'placeholder': 'Enter amount',
              'flag': 'display',
              'hasOtherInput': true,
              'hasRequired': true,
              'disabled': false,
            },
            {
              "questionId": "2",
              "name": "What's the cost to fund your goal today?",
              "variableName": "enterAmountWithValidation",
              'value': null,
              'controlType': 'text',
              'patternError': 'value must be in multiple of 1000',
              'validation': [{ key: 'required', value: 'value is required', 'required': false }, { key: 'pattern', value: 'value must be in multiple of 1000', 'pattern': '^[1-9][0-9]*000$' }],
              'placeholder': 'Enter amount',
              'flag': 'noDisplay',
              'hasOtherInput': false,
              'disabled': false,
            },
            {
              "questionId": "3",
              "name": "After how many years do you wish to achieve this goal?",
              "options": this.number,
              "variableName": "enterNumberOfYears",
              'value': null,
              'controlType': 'dropdown',
              'validation': [{ key: 'required', value: 'value is required', 'required': true }],
              'placeholder': "Enter number of years",
              'flag': 'display',
              'hasOtherInput': false,
              'disabled': false,
            },
            {

              "questionId": "4",
              "name": "What is the expected inflation?",
              "options": this.percent,
              "variableName": "expectedInflation",
              'value': 5,
              'controlType': 'dropdown',
              'validation': [{ key: 'required', value: 'value is required', 'required': true }],
              'placeholder': 'Enter expected inflation rate',
              'flag': 'display',
              'hasOtherInput': false,
              'disabled': false,
            },
            {
              "questionId": "5",
              "name": "Expected returns on investment (% p.a.)",
              "options": this.percent5,
              "variableName": "expectedReturnsOnInvestment",
              'value': 12,
              'controlType': 'dropdown',
              'validation': [{ key: 'required', value: 'value is required', 'required': true }],
              'placeholder': 'Enter expected return on investment',
              'flag': 'display',
              'hasOtherInput': false,
              'disabled': false,
            },
            {
              "questionId": "6",
              "name": "Would you like to invest lumpsum amount for your Goal",
              "variableName": "enterLumpsumInvestmentAmount",
              'value': 0,
              'controlType': 'text',
              'patternError': 'value must be 0 or in multiple of 1000',
              'validation': [],
              'placeholder': "Enter lumpsum investment amount",
              'flag': 'display',
              'hasOtherInput': true,
              'disabled': false,
            },
            {
              "questionId": "6",
              "name": "Would you like to invest lumpsum amount for your Goal",
              "variableName": "enterLumpsumInvestmentAmountWithValidation",
              'value': 0,
              'controlType': 'text',
              'patternError': 'value must be 0 or in multiple of 1000',
              'validation': [{ key: 'required', value: 'value is required', 'required': false }, { key: 'pattern', value: 'value must be 0 or in multiple of 1000', 'pattern': '^0|[1-9][0-9]*000$' }],
              'placeholder': "Enter lumpsum investment amount",
              'flag': 'noDisplay',
              'hasOtherInput': false,
              'disabled': false,
            }
          ],

        }
      ]

      if (res[0].goals) {
        this.onGoalClick(res[0].goals, 0, res[0].goal_id, res[0].age);
      }
  
    });




    for (let i = 5; i <= 25; i++) {
      let ival = { "name": `${i}%`, "value": i };
      // console.log(ival);
      this.percent5.push(ival);
    }
    for (let i = 1; i <= 10; i++) {
      let ival = { "name": `${i}%`, "value": i };
      // console.log(ival);
      this.percent.push(ival);
    }
    for (let i = 1; i <= 30; i++) {
      let ival = { "name": i, "value": i };
      // console.log(ival);
      this.number.push(ival);
    }

    for (let i = 5; i <= 100; i++) {
      let ival = { "name": `${i}%`, "value": i };
      // console.log(ival);
      this.five.push(ival);
    }

    for (let i = 30; i <= 80; i++) {
      let ival = { "name": `${i}`, "value": i };
      // console.log(ival);
      this.age.push(ival);
    }



  }



  isFormReady: boolean = false;

  createForm() {
    console.log('custom goal at the time of form creation', this.customGoal);
    this.isFormReady = false;

    this.dynamicGoalForm = null;

    let questionFromDropdownAndText = {};
    console.log(this.ques.questions);

    this.ques.questions.forEach(singleObjectQuestionData => {             //{question 1 full object}
     

      let value = singleObjectQuestionData['value']
      let validations = [];
      singleObjectQuestionData['validation'].forEach(validator => {

        validations = [Validators.required];




        if (validator['pattern']) {
          validations.push(Validators.pattern(validator.pattern));
         
        }
      })
      questionFromDropdownAndText[singleObjectQuestionData['variableName']] = new FormControl(value, validations);
    
    });

    console.log("questionFromDropdownAndText is ", questionFromDropdownAndText);

    this.dynamicGoalForm = this.fb.group(questionFromDropdownAndText);
    console.log(this.dynamicGoalForm)

    console.log(this.dynamicGoalForm);
    console.log('this is the form data', this.dynamicGoalForm.get('enterAmount'))
    this.onAmountEnter();
    this.isFormReady = true;
  }

  Replan() {
    this.showButton = !this.showButton;
    this.router.navigateByUrl("/goals");
    for(let i = 0; i< this.nextGoals.length; i++){

        this.nextGoals[i].isCalculated = false;
  
    }
      let goalObj =  {
      goals : '',
      goal_id: 0,
      queans : [],
      res: null
    };
    this.globalCal['goal1'] = goalObj;
    this.globalCal['goal2'] = goalObj;
    this.globalCal['goal3'] = goalObj;
 
    this.createForm(); 
   }
 

  goalTypes = ["Self Development", "Starting Business", "Bike", "Marriage", "Honeymoon", "Wealth Creation", "Holiday",
    "Car", "Childs Education", "Childs Marriage", "Follow Passion", "World Tour", "Dream Home", "Retirement",
    "Philanthropy"];


  setImages() {
    this.images = [];
    let goalsLength = this.selectGoal.length;
    for (let i = 0; i < goalsLength; i++) {
      let currentGoalName = this.selectGoal[i].goals;
      if (this.goalTypes.includes(currentGoalName)) {
        let imgUrl = `./assets/img/${currentGoalName}.png`;
        this.images.push(imgUrl);
      } else {
        let customImgUrl = `./assets/img/AddOtherGoal.png`;
        this.images.push(customImgUrl);
      }
    }
  }


  onAmountEnter() {
    this.dynamicGoalForm.get('enterAmount').valueChanges.subscribe((amount: number) => {
      // this.convertCommaSeperatedNumberToNumber(amount);
      this.amountInNumber = amount
        .toString()
        .replace(/[, ]+/g, '')
        .trim();

      // this.convertNumberToCommaSeperatedNumber();
      this.dynamicGoalForm
        .get('enterAmount')
        .setValue(this.commaSeparateNumber(this.amountInNumber), {
          emitEvent: false,
        });
      let _amnt = !this.amountInNumber ? null : parseFloat(this.amountInNumber);
      this.dynamicGoalForm.get('enterAmountWithValidation').setValue(_amnt, { emitEvent: false });
      this.dynamicGoalForm
        .get('enterAmountWithValidation')
        .updateValueAndValidity({ emitEvent: false });
    });

    this.dynamicGoalForm.get('enterLumpsumInvestmentAmount').valueChanges.subscribe((amount: number) => {
      this.amountInNumber = amount
        .toString()
        .replace(/[, ]+/g, '')
        .trim();
      this.dynamicGoalForm
        .get('enterLumpsumInvestmentAmount')
        .setValue(this.commaSeparateNumber(this.amountInNumber), {
          emitEvent: false,
        });
      let _amnt = !this.amountInNumber ? null : parseFloat(this.amountInNumber);
      this.dynamicGoalForm.get('enterLumpsumInvestmentAmountWithValidation').setValue(_amnt, { emitEvent: false });
      this.dynamicGoalForm
        .get('enterLumpsumInvestmentAmountWithValidation')
        .updateValueAndValidity({ emitEvent: false });
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

  convertCommaSeperatedNumberToNumber(amount) {
    this.amountInNumber = amount
      .toString()
      .replace(/[, ]+/g, '')
      .trim();
    let _amnt = !this.amountInNumber ? null : parseFloat(this.amountInNumber);
    return _amnt;
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      } else if (control instanceof FormArray) {
        for (const control1 of control.controls) {
          if (control1 instanceof FormControl) {
            control1.markAsTouched({
              onlySelf: true,
            });
          }
          if (control1 instanceof FormGroup) {
            this.validateAllFormFields(control1);
          }
        }
      }
    });
  }

  convertNumberToCommaSeperatedNumber(amount) {
    // return amount;
    return this.commaSeparateNumber(amount);
  }
  
  validation(validator, key ){
  let result  =validator.find(val=>{ 
      return (val.key == key)
    })

    return result['value'];
    
  }


  ques: any;
  onGoalClick(data, index, goalId, age?) {
    this.showDesc = false;
    this.showButton = false;


    console.log("@@@Goal id is ", goalId);
    this.index = index;
    this.setImages();
    if (this.goalTypes.includes(data)) {
      let selectedGoalImgUrl = `./assets/img/${data}color.png`;
      this.images[index] = selectedGoalImgUrl;
    } else {
      let customColorImg = `./assets/img/AddOtherGoalcolor.png`
      this.images[index] = customColorImg;
    }

    // this.goalsInputValue = [];
    // this.goalInputValueJson = {};customGoal
    this.ques = this.goalQuestion.find((res) => res.type === data);
    console.log('data data', data);
    console.log('this.ques', this.ques);
    console.log('this.ques', this.goalQuestion);
    if (this.ques == undefined) {
      this.customGoal = data;
      console.log('custom goal', this.customGoal);
      console.log(data)
      this.ques = this.goalQuestion.find((res) => res.type === 'customGoal');

      ///// change/////
      console.log("this.ques-->>", this.ques)
      /////change/////

      this.ques['questions'][0].value = this.customGoal;
    } else {
      this.ques = this.goalQuestion.find((res) => res.type === data);
      console.log('testing', data)

    }


    this.ques['goalId'] = goalId;
    this.ques['age'] = age;


    // console.log(this.ques);
    // console.log("this.description->>",this.ques.description)

    // this.description = this.ques.description;
    // this.questions = this.ques.questions;

    this.questions = [];
    console.log('testing', this.ques.questions)
    let questionsArray = this.ques.questions;

    let questionsArrayLength = questionsArray.length;
    for (let i = 0; i < questionsArrayLength; i++) {
      let currentQuestion = questionsArray[i];
      // console.log("currentQuestion", currentQuestion)
      // if(currentQuestion.flag == 'display'){
      this.questions.push(currentQuestion);
      // }
    }



    this.singleSelectedGoal = data;
    // console.log(this.singleSelectedGoal);
    console.log("this.questions IS", this.questions);

    console.log(this.ques);


    // call createForm 
    this.createForm();
  }

  
  errMsg: string;
  calculateFunction() {
    this.showDesc = false;

    let lumsum = this.dynamicGoalForm.get('enterLumpsumInvestmentAmount').value;
    if(lumsum == null || lumsum == ""){
      this.dynamicGoalForm.get('enterLumpsumInvestmentAmount').setValue(0);
    }

    console.log(`Form errros are ${this.dynamicGoalForm.status}`);
    let isValid = this.dynamicGoalForm.valid;
    if (isValid === true ) {
      this.showButton = !this.showButton;
      // get values from formcontrol and store in an object
      this.goalInputValueJson = {};
      let questionsLength = this.questions.length;
      for (let i = 0; i < questionsLength; i++) {
        let currentQuestion = this.questions[i];
      
        if (currentQuestion.variableName == 'enterChildName') {
          this.goalInputValueJson[currentQuestion.variableName] = this.dynamicGoalForm.controls[currentQuestion.variableName].value;
        }

        else {
          let amount = this.dynamicGoalForm.controls[currentQuestion.variableName].value;
          console.log("Amount is ", amount);
          let number = this.convertCommaSeperatedNumberToNumber(amount);
          this.goalInputValueJson[currentQuestion.variableName] = number
        }

      }
      console.log('this.goalInputValueJson i/p Json', this.goalInputValueJson);
      // call calculations
      this.calculationMethod();

    } else {
      console.log("Not Valid data")
      this.validateAllFormFields(this.dynamicGoalForm)
    }

  }

  globalCal = {
    goal1: {
      goals: '',
      goal_id: 0,
      queans: [],
      res: null
    },
    goal2: {
      goals: '',
      goal_id: 0,
      queans: [],
      res: null
    },
    goal3: {
      goals: '',
      goal_id: 0,
      queans: [],
      res: null
    }
  };


  calculationMethod() {

    if (this.singleSelectedGoal === "Self Development") {
      console.log(this.questionType)
      // Calculating future Value Of Starting Business
      this.futureValueOfSelfDevelopmentGoal = Math.round(this.futureValue(this.goalInputValueJson['expectedInflation'], this.goalInputValueJson['enterNumberOfYears'], this.goalInputValueJson['enterAmount']))
      console.log("This is calculation for Self Development", this.futureValueOfSelfDevelopmentGoal);

      // Calculating SIP (considering no lumpsum amount is invested today)
      this.sipNoLumpsum = Math.round(this.PMT(this.goalInputValueJson['expectedReturnsOnInvestment'] / 12, this.goalInputValueJson['enterNumberOfYears'] * 12, 0, -this.futureValueOfSelfDevelopmentGoal, 1))
      console.log("This is calculation for sip with no lumpsum", this.sipNoLumpsum);

      // // Calculating SIP (considering  lumpsum amount is invested today)
      this.sipWithLumpsum = Math.round(-this.PMT(this.goalInputValueJson['expectedReturnsOnInvestment'] / 12, this.goalInputValueJson['enterNumberOfYears'] * 12, -this.goalInputValueJson['enterLumpsumInvestmentAmount'], this.futureValueOfSelfDevelopmentGoal, 1));
      console.log("This is calculation for sip with lumpsum", this.sipWithLumpsum);

      //Displaying calculation for life insurance cover 
      (this.sipWithLumpsum * 100) < 5000000 ? this.lifeInsurance = this.sipWithLumpsum * 100 : this.lifeInsurance = 5000000;
      console.log("This is the calculation for life insurance cover", this.lifeInsurance)

      
      
      let caclObj = {};
      caclObj['futureValueOfSelfDevelopmentGoal'] = this.futureValueOfSelfDevelopmentGoal;
      caclObj['sipNoLumpsum'] = this.sipNoLumpsum;
      caclObj['sipWithLumpsum'] = this.sipWithLumpsum;
      caclObj['lifeInsurance'] = this.lifeInsurance;
      caclObj['afterYears'] = this.goalInputValueJson['enterNumberOfYears'];

      this.storeDataToLocalObject(caclObj);

      this.futureValueOfSelfDevelopmentGoal = this.convertNumberToCommaSeperatedNumber(this.futureValueOfSelfDevelopmentGoal);
      this.sipNoLumpsum = this.convertNumberToCommaSeperatedNumber(this.sipNoLumpsum);
      this.sipWithLumpsum = this.convertNumberToCommaSeperatedNumber(this.sipWithLumpsum);
      this.goalInputValueJson['enterLumpsumInvestmentAmount'] = this.convertNumberToCommaSeperatedNumber(this.goalInputValueJson['enterLumpsumInvestmentAmount']);
      this.lifeInsurance = this.convertNumberToCommaSeperatedNumber(this.lifeInsurance);

      this.desc = `Hi <span style="color:red !important">${this.userName}</span>  for <span style="color:red !important">${'Self Development'}</span> after <span style="color:red !important">${this.goalInputValueJson['enterNumberOfYears']}</span> years 	
      you would require <span style="color:red !important">${'₹'} ${this.futureValueOfSelfDevelopmentGoal}</span>. To fund the same, you need to start a monthly SIP of <span style="color:red !important">${'₹'} ${this.sipNoLumpsum}</span> 	
      over next <span style="color:red !important">${this.goalInputValueJson['enterNumberOfYears']}</span> years. As you are investing <span style="color:red !important">${'₹'} ${this.goalInputValueJson['enterLumpsumInvestmentAmount']}</span> as lumpsum amount today, you can achieve your goal by starting a monthly SIP of <span style="color:red !important">${'₹'} ${this.sipWithLumpsum}</span>.	
      What's more, if you opt for the CSIP* facility, you can get a life insurance cover of upto <span style="color:red !important">${'₹'} ${this.lifeInsurance}</span> at no additional cost.	`;
    }


    else if (this.singleSelectedGoal === "Starting Business") {
      console.log(this.questionType)
      // Calculating future Value Of Starting Business
      this.futureValueOfStartingBusiness = Math.round(this.futureValue(this.goalInputValueJson['expectedInflation'], this.goalInputValueJson['enterNumberOfYears'], this.goalInputValueJson['enterAmount']))
      console.log("This is calculation for Starting Business", this.futureValueOfStartingBusiness);

      this.sipNoLumpsum = Math.round(this.PMT(this.goalInputValueJson['expectedReturnsOnInvestment'] / 12, this.goalInputValueJson['enterNumberOfYears'] * 12, 0, -this.futureValueOfStartingBusiness, 1))
      console.log("This is calculation for sip with no lumpsum", this.sipNoLumpsum);
      // // Calculating SIP (considering  lumpsum amount is invested today)
      this.sipWithLumpsum = Math.round(-this.PMT(this.goalInputValueJson['expectedReturnsOnInvestment'] / 12, this.goalInputValueJson['enterNumberOfYears'] * 12, -this.goalInputValueJson['enterLumpsumInvestmentAmount'], this.futureValueOfStartingBusiness, 1))
      console.log("This is calculation for sip with lumpsum", this.sipWithLumpsum);

      //Displaying calculation for life insurance cover 
      (this.sipWithLumpsum * 100) < 5000000 ? this.lifeInsurance = this.sipWithLumpsum * 100 : this.lifeInsurance = 5000000;
      console.log("This is the calculation for life insurance cover", this.lifeInsurance)

      let caclObj = {};
      caclObj['futureValueOfStartingBusiness'] = this.futureValueOfStartingBusiness;
      caclObj['sipNoLumpsum'] = this.sipNoLumpsum;
      caclObj['sipWithLumpsum'] = this.sipWithLumpsum;
      caclObj['lifeInsurance'] = this.lifeInsurance;
      caclObj['afterYears'] = this.goalInputValueJson['enterNumberOfYears'];

      this.storeDataToLocalObject(caclObj);

      this.futureValueOfStartingBusiness = this.convertNumberToCommaSeperatedNumber(this.futureValueOfStartingBusiness);
      this.sipNoLumpsum = this.convertNumberToCommaSeperatedNumber(this.sipNoLumpsum);
      this.sipWithLumpsum = this.convertNumberToCommaSeperatedNumber(this.sipWithLumpsum);
      this.goalInputValueJson['enterLumpsumInvestmentAmount'] = this.convertNumberToCommaSeperatedNumber(this.goalInputValueJson['enterLumpsumInvestmentAmount']);
      this.lifeInsurance = this.convertNumberToCommaSeperatedNumber(this.lifeInsurance);

      this.desc = `Hi <span style="color:red !important">${this.userName}</span>  for <span style="color:red !important"> ${'Starting Business'}</span> after <span style="color:red !important">${this.goalInputValueJson['enterNumberOfYears']}</span> years 	
      you would require <span style="color:red !important">${'₹'} ${this.futureValueOfStartingBusiness}</span>. To fund the same, you need to start a monthly SIP of <span style="color:red !important">${'₹'} ${this.sipNoLumpsum}</span> 	
      over next <span style="color:red !important">${this.goalInputValueJson['enterNumberOfYears']}</span> years. As you are investing <span style="color:red !important">${'₹'} ${this.goalInputValueJson['enterLumpsumInvestmentAmount']}</span> as lumpsum amount today, you can achieve your goal by starting a monthly SIP of <span style="color:red !important"> ${'₹'} ${this.sipWithLumpsum}</span>.	
      What's more, if you opt for the CSIP* facility, you can get a life insurance cover of upto <span style="color:red !important">${'₹'} ${this.lifeInsurance}</span> at no additional cost.	`;

    }

    else if (this.singleSelectedGoal === "Marriage") {

      // Calculating future Value Of Starting Business
      this.futureValueOfGettingMarried = Math.round(this.futureValue(this.goalInputValueJson['expectedInflation'], this.goalInputValueJson['enterNumberOfYears'], this.goalInputValueJson['enterAmount']))
      console.log("This is calculation for Marriage", this.futureValueOfGettingMarried);

      this.sipNoLumpsum = Math.round(this.PMT(this.goalInputValueJson['expectedReturnsOnInvestment'] / 12, this.goalInputValueJson['enterNumberOfYears'] * 12, 0, -this.futureValueOfGettingMarried, 1))
      console.log("This is calculation for sip with no lumpsum", this.sipNoLumpsum);
      // // Calculating SIP (considering  lumpsum amount is invested today)
      this.sipWithLumpsum = Math.round(-this.PMT(this.goalInputValueJson['expectedReturnsOnInvestment'] / 12, this.goalInputValueJson['enterNumberOfYears'] * 12, -this.goalInputValueJson['enterLumpsumInvestmentAmount'], this.futureValueOfGettingMarried, 1));
      console.log("This is calculation for sip with lumpsum", this.sipWithLumpsum);

      //Displaying calculation for life insurance cover 
      (this.sipWithLumpsum * 100) < 5000000 ? this.lifeInsurance = this.sipWithLumpsum * 100 : this.lifeInsurance = 5000000;
      console.log("This is the calculation for life insurance cover", this.lifeInsurance)

      let caclObj = {};
      caclObj['futureValueOfGettingMarried'] = this.futureValueOfGettingMarried;
      caclObj['sipNoLumpsum'] = this.sipNoLumpsum;
      caclObj['sipWithLumpsum'] = this.sipWithLumpsum;
      caclObj['lifeInsurance'] = this.lifeInsurance;
      caclObj['afterYears'] = this.goalInputValueJson['enterNumberOfYears'];

      this.storeDataToLocalObject(caclObj);

      this.futureValueOfGettingMarried = this.convertNumberToCommaSeperatedNumber(this.futureValueOfGettingMarried);
      this.sipNoLumpsum = this.convertNumberToCommaSeperatedNumber(this.sipNoLumpsum);
      this.sipWithLumpsum = this.convertNumberToCommaSeperatedNumber(this.sipWithLumpsum);
      this.goalInputValueJson['enterLumpsumInvestmentAmount'] = this.convertNumberToCommaSeperatedNumber(this.goalInputValueJson['enterLumpsumInvestmentAmount']);
      this.lifeInsurance = this.convertNumberToCommaSeperatedNumber(this.lifeInsurance);

      this.desc = `Hi <span style="color:red !important">${this.userName}</span>  for <span style="color:red !important">${'Marriage'}</span> after <span style="color:red !important">${this.goalInputValueJson['enterNumberOfYears']}</span> years 	
      you would require <span style="color:red !important">${'₹'} ${this.futureValueOfGettingMarried}</span>. To fund the same, you need to start a monthly SIP of <span style="color:red !important">${'₹'} ${this.sipNoLumpsum}</span> 	
      over next <span style="color:red !important">${this.goalInputValueJson['enterNumberOfYears']}</span> years. As you are investing <span style="color:red !important">${'₹'} ${this.goalInputValueJson['enterLumpsumInvestmentAmount']}</span> as lumpsum amount today, you can achieve your goal by starting a monthly SIP of <span style="color:red !important">${'₹'} ${this.sipWithLumpsum}</span>. What's more, if you opt for the CSIP* facility, you can get a life insurance cover of upto <span style="color:red !important">${'₹'} ${this.lifeInsurance}</span> at no additional cost.	`;
    }


    else if (this.singleSelectedGoal === "Honeymoon") {
      console.log(this.questionType);
      // Calculating future Value Of Starting Business
      this.futureValueOfVisitingHoneymoonDestination = Math.round(this.futureValue(this.goalInputValueJson['expectedInflation'], this.goalInputValueJson['enterNumberOfYears'], this.goalInputValueJson['enterAmount']))
      console.log("This is calculation for Honeymoon", this.futureValueOfVisitingHoneymoonDestination);

      this.sipNoLumpsum = Math.round(this.PMT(this.goalInputValueJson['expectedReturnsOnInvestment'] / 12, this.goalInputValueJson['enterNumberOfYears'] * 12, 0, -this.futureValueOfVisitingHoneymoonDestination, 1))
      console.log("This is calculation for sip with no lumpsum", this.sipNoLumpsum);
      // // Calculating SIP (considering  lumpsum amount is invested today)
      this.sipWithLumpsum = Math.round(-this.PMT(this.goalInputValueJson['expectedReturnsOnInvestment'] / 12, this.goalInputValueJson['enterNumberOfYears'] * 12, -this.goalInputValueJson['enterLumpsumInvestmentAmount'], this.futureValueOfVisitingHoneymoonDestination, 1));
      console.log("This is calculation for sip with lumpsum", this.sipWithLumpsum);
      //Displaying calculation for life insurance cover 
      (this.sipWithLumpsum * 100) < 5000000 ? this.lifeInsurance = this.sipWithLumpsum * 100 : this.lifeInsurance = 5000000;
      console.log("This is the calculation for life insurance cover", this.lifeInsurance)

      let caclObj = {};
      caclObj['futureValueOfVisitingHoneymoonDestination'] = this.futureValueOfVisitingHoneymoonDestination;
      caclObj['sipNoLumpsum'] = this.sipNoLumpsum;
      caclObj['sipWithLumpsum'] = this.sipWithLumpsum;
      caclObj['lifeInsurance'] = this.lifeInsurance;
      caclObj['afterYears'] = this.goalInputValueJson['enterNumberOfYears'];


      this.storeDataToLocalObject(caclObj);

      this.futureValueOfVisitingHoneymoonDestination = this.convertNumberToCommaSeperatedNumber(this.futureValueOfVisitingHoneymoonDestination);
      this.sipNoLumpsum = this.convertNumberToCommaSeperatedNumber(this.sipNoLumpsum);
      this.sipWithLumpsum = this.convertNumberToCommaSeperatedNumber(this.sipWithLumpsum);
      this.goalInputValueJson['enterLumpsumInvestmentAmount'] = this.convertNumberToCommaSeperatedNumber(this.goalInputValueJson['enterLumpsumInvestmentAmount']);
      this.lifeInsurance = this.convertNumberToCommaSeperatedNumber(this.lifeInsurance);

      this.desc = `Hi <span style="color:red !important">${this.userName}</span>  for <span style="color:red !important">${'Honeymoon'}</span> after <span style="color:red !important">${this.goalInputValueJson['enterNumberOfYears']}</span> years 	
      you would require <span style="color:red !important">${'₹'} ${this.futureValueOfVisitingHoneymoonDestination}</span>. To fund the same, you need to start a monthly SIP of <span style="color:red !important">${'₹'} ${this.sipNoLumpsum}</span> 	
      over next <span style="color:red !important">${this.goalInputValueJson['enterNumberOfYears']}</span> years. As you are investing <span style="color:red !important">${'₹'} ${this.goalInputValueJson['enterLumpsumInvestmentAmount']}</span> as lumpsum amount today, you can achieve your goal by starting a monthly SIP of <span style="color:red !important">${'₹'} ${this.sipWithLumpsum}</span>.	What's more, if you opt for the CSIP* facility, you can get a life insurance cover of upto <span style="color:red !important">${'₹'} ${this.lifeInsurance}</span> at no additional cost.	`;

    }

    else if (this.singleSelectedGoal === "Wealth Creation") {
      console.log(this.questionType);
      //Calculation
      this.sipNoLumpsum = Math.round(this.PMT(this.goalInputValueJson['expectedReturnsOnInvestment'] / 12, this.goalInputValueJson['enterNumberOfYears'] * 12, 0, -this.goalInputValueJson['enterAmount'], 1))
      console.log("This is calculation for sip with no lumpsum", this.sipNoLumpsum);
      // // Calculating SIP (considering  lumpsum amount is invested today)
      this.sipWithLumpsum = Math.round(-this.PMT(this.goalInputValueJson['expectedReturnsOnInvestment'] / 12, this.goalInputValueJson['enterNumberOfYears'] * 12, -this.goalInputValueJson['enterLumpsumInvestmentAmount'], this.goalInputValueJson['enterAmount'], 1));
      console.log("This is calculation for sip with lumpsum", this.sipWithLumpsum);
      //Displaying calculation for life insurance cover 
      (this.sipWithLumpsum * 100) < 5000000 ? this.lifeInsurance = this.sipWithLumpsum * 100 : this.lifeInsurance = 5000000;
      console.log("This is the calculation for life insurance cover", this.lifeInsurance)

      let caclObj = {};
      caclObj['sipNoLumpsum'] = this.sipNoLumpsum;
      caclObj['sipWithLumpsum'] = this.sipWithLumpsum;
      caclObj['lifeInsurance'] = this.lifeInsurance;
      caclObj['afterYears'] = this.goalInputValueJson['enterNumberOfYears'];

      this.storeDataToLocalObject(caclObj);

      this.desc = `Hi <span style="color:red !important">${this.userName}</span> for <span style="color:red !important">${'Wealth Creation'}</span> of <span style="color:red !important">${'₹'} ${this.goalInputValueJson['enterAmount']}</span> after <span style="color:red !important">${this.goalInputValueJson['enterNumberOfYears']}</span> years you need to start a monthly SIP of <span style="color:red !important">${'₹'} ${this.sipNoLumpsum}</span> over next <span style="color:red !important"> ${this.goalInputValueJson['enterNumberOfYears']}</span> years. As you are investing <span style="color:red !important">${'₹'} ${this.goalInputValueJson['enterLumpsumInvestmentAmount']}</span> as lumpsum amount today, you can achieve your goal by starting a monthly SIP of <span style="color:red !important">${'₹'} ${this.sipWithLumpsum}</span>. What's more, if you opt for the CSIP* facility, you can get a life insurance cover of upto <span style="color:red !important">${'₹'} ${this.lifeInsurance}</span>	If less than 50 lakh, at no additional cost.`
    }

    else if (this.singleSelectedGoal === "Holiday") {

      console.log(this.questionType)
      // Calculating future Value Of Starting Business
      this.futureValueOfVisitingHolidayDestination = Math.round(this.futureValue(this.goalInputValueJson['expectedInflation'], this.goalInputValueJson['enterNumberOfYears'], this.goalInputValueJson['enterAmount']))
      console.log("This is calculation for Self Development", this.futureValueOfVisitingHolidayDestination);

      // Calculating SIP (considering no lumpsum amount is invested today)
      this.sipNoLumpsum = Math.round(this.PMT(this.goalInputValueJson['expectedReturnsOnInvestment'] / 12, this.goalInputValueJson['enterNumberOfYears'] * 12, 0, -this.futureValueOfVisitingHolidayDestination, 1))
      console.log("This is calculation for sip with no lumpsum", this.sipNoLumpsum);

      // // Calculating SIP (considering  lumpsum amount is invested today)
      this.sipWithLumpsum = Math.round(-this.PMT(this.goalInputValueJson['expectedReturnsOnInvestment'] / 12, this.goalInputValueJson['enterNumberOfYears'] * 12, -this.goalInputValueJson['enterLumpsumInvestmentAmount'], this.futureValueOfVisitingHolidayDestination, 1));
      console.log("This is calculation for sip with lumpsum", this.sipWithLumpsum);

      //Displaying calculation for life insurance cover 
      (this.sipWithLumpsum * 100) < 5000000 ? this.lifeInsurance = this.sipWithLumpsum * 100 : this.lifeInsurance = 5000000;
      console.log("This is the calculation for life insurance cover", this.lifeInsurance)

      let caclObj = {};
      caclObj['futureValueOfVisitingHoneymoonDestination'] = this.futureValueOfVisitingHoneymoonDestination;
      caclObj['sipNoLumpsum'] = this.sipNoLumpsum;
      caclObj['sipWithLumpsum'] = this.sipWithLumpsum;
      caclObj['lifeInsurance'] = this.lifeInsurance;
      caclObj['afterYears'] = this.goalInputValueJson['enterNumberOfYears'];

      this.storeDataToLocalObject(caclObj);

      this.futureValueOfVisitingHolidayDestination = this.convertNumberToCommaSeperatedNumber(this.futureValueOfVisitingHolidayDestination);
      this.sipNoLumpsum = this.convertNumberToCommaSeperatedNumber(this.sipNoLumpsum);
      this.sipWithLumpsum = this.convertNumberToCommaSeperatedNumber(this.sipWithLumpsum);
      this.goalInputValueJson['enterLumpsumInvestmentAmount'] = this.convertNumberToCommaSeperatedNumber(this.goalInputValueJson['enterLumpsumInvestmentAmount']);
      this.lifeInsurance = this.convertNumberToCommaSeperatedNumber(this.lifeInsurance);

      this.desc = `Hi <span style="color:red !important">${this.userName}</span>  for <span style="color:red !important">${'Holiday'}</span> after <span style="color:red !important">${this.goalInputValueJson['enterNumberOfYears']}</span> years 	
      you would require <span style="color:red !important">${'₹'} ${this.futureValueOfVisitingHolidayDestination}</span>. To fund the same, you need to start a monthly SIP of <span style="color:red !important">${'₹'} ${this.sipNoLumpsum}</span> 	
      over next <span style="color:red !important">${this.goalInputValueJson['enterNumberOfYears']}</span> years. As you are investing <span style="color:red !important">${this.goalInputValueJson['enterLumpsumInvestmentAmount']}</span> as lumpsum amount today, you can achieve your goal by starting a monthly SIP of <span style="color:red !important">${'₹'} ${this.sipWithLumpsum}</span>. 	
      What's more, if you opt for the CSIP* facility, you can get a life insurance cover of upto <span style="color:red !important">${'₹'} ${this.lifeInsurance}</span> at no additional cost.	`;
    }

    else if (this.singleSelectedGoal === "World Tour") {

      // Calculating future Value Of Starting Business
      this.futureValueOfGoingOnWorldTour = Math.round(this.futureValue(this.goalInputValueJson['expectedInflation'], this.goalInputValueJson['enterNumberOfYears'], this.goalInputValueJson['enterAmount']))
      console.log("This is calculation for World Tour", this.futureValueOfGoingOnWorldTour);

      this.sipNoLumpsum = Math.round(this.PMT(this.goalInputValueJson['expectedReturnsOnInvestment'] / 12, this.goalInputValueJson['enterNumberOfYears'] * 12, 0, -this.futureValueOfGoingOnWorldTour, 1));
      console.log("This is calculation for sip with no lumpsum", this.sipNoLumpsum);
      // // Calculating SIP (considering  lumpsum amount is invested today)
      this.sipWithLumpsum = Math.round(-this.PMT(this.goalInputValueJson['expectedReturnsOnInvestment'] / 12, this.goalInputValueJson['enterNumberOfYears'] * 12, -this.goalInputValueJson['enterLumpsumInvestmentAmount'], this.futureValueOfGoingOnWorldTour, 1));
      console.log("This is calculation for sip with lumpsum", this.sipWithLumpsum);

      //Displaying calculation for life insurance cover 
      (this.sipWithLumpsum * 100) < 5000000 ? this.lifeInsurance = this.sipWithLumpsum * 100 : this.lifeInsurance = 5000000;
      console.log("This is the calculation for life insurance cover", this.lifeInsurance)

      let caclObj = {};
      caclObj['futureValueOfGoingOnWorldTour'] = this.futureValueOfGoingOnWorldTour;
      caclObj['sipNoLumpsum'] = this.sipNoLumpsum;
      caclObj['sipWithLumpsum'] = this.sipWithLumpsum;
      caclObj['lifeInsurance'] = this.lifeInsurance;
      caclObj['afterYears'] = this.goalInputValueJson['enterNumberOfYears'];

      this.storeDataToLocalObject(caclObj);

      this.futureValueOfGoingOnWorldTour = this.convertNumberToCommaSeperatedNumber(this.futureValueOfGoingOnWorldTour);
      this.sipNoLumpsum = this.convertNumberToCommaSeperatedNumber(this.sipNoLumpsum);
      this.sipWithLumpsum = this.convertNumberToCommaSeperatedNumber(this.sipWithLumpsum);
      this.goalInputValueJson['enterLumpsumInvestmentAmount'] = this.convertNumberToCommaSeperatedNumber(this.goalInputValueJson['enterLumpsumInvestmentAmount']);
      this.lifeInsurance = this.convertNumberToCommaSeperatedNumber(this.lifeInsurance);

      this.desc = `Hi <span style="color:red !important">${this.userName}</span>  for <span style="color:red !important">${'World Tour'}</span> after <span style="color:red !important">${this.goalInputValueJson['enterNumberOfYears']}</span> years 	
      you would require <span style="color:red !important">${'₹'} ${this.futureValueOfGoingOnWorldTour}</span>. To fund the same, you need to start a monthly SIP of <span style="color:red !important">${'₹'} ${this.sipNoLumpsum}</span> 	
      over next <span style="color:red !important">${this.goalInputValueJson['enterNumberOfYears']}</span> years. As you are investing <span style="color:red !important">${this.goalInputValueJson['enterLumpsumInvestmentAmount']}</span> as lumpsum amount today, you can achieve your goal by starting a monthly SIP of <span style="color:red !important">${'₹'} ${this.sipWithLumpsum}</span> 	
      What's more, if you opt for the CSIP* facility, you can get a life insurance cover of upto <span style="color:red !important">${'₹'} ${this.lifeInsurance}</span> at no additional cost.	`;

    }

    else if (this.singleSelectedGoal === "Follow Passion") {

      // Calculating future Value Of Starting Business
      this.futureValueOfPassion = Math.round(this.futureValue(this.goalInputValueJson['expectedInflation'], this.goalInputValueJson['enterNumberOfYears'], this.goalInputValueJson['enterAmount']))
      console.log("This is calculation for Follow Passion", this.futureValueOfPassion);

      this.sipNoLumpsum = Math.round(this.PMT(this.goalInputValueJson['expectedReturnsOnInvestment'] / 12, this.goalInputValueJson['enterNumberOfYears'] * 12, 0, -this.futureValueOfPassion, 1));
      console.log("This is calculation for sip with no lumpsum", this.sipNoLumpsum);
      // // Calculating SIP (considering  lumpsum amount is invested today)
      this.sipWithLumpsum = Math.round(-this.PMT(this.goalInputValueJson['expectedReturnsOnInvestment'] / 12, this.goalInputValueJson['enterNumberOfYears'] * 12, -this.goalInputValueJson['enterLumpsumInvestmentAmount'], this.futureValueOfPassion, 1));
      console.log("This is calculation for sip with lumpsum", this.sipWithLumpsum);

      //Displaying calculation for life insurance cover 
      (this.sipWithLumpsum * 100) < 5000000 ? this.lifeInsurance = this.sipWithLumpsum * 100 : this.lifeInsurance = 5000000;
      console.log("This is the calculation for life insurance cover", this.lifeInsurance)

      let caclObj = {};
      caclObj['futureValueOfPassion'] = this.futureValueOfPassion;
      caclObj['sipNoLumpsum'] = this.sipNoLumpsum;
      caclObj['sipWithLumpsum'] = this.sipWithLumpsum;
      caclObj['lifeInsurance'] = this.lifeInsurance;
      caclObj['afterYears'] = this.goalInputValueJson['enterNumberOfYears'];

      this.storeDataToLocalObject(caclObj);

      this.futureValueOfGettingMarried = this.convertNumberToCommaSeperatedNumber(this.futureValueOfPassion);
      this.sipNoLumpsum = this.convertNumberToCommaSeperatedNumber(this.sipNoLumpsum);
      this.sipWithLumpsum = this.convertNumberToCommaSeperatedNumber(this.sipWithLumpsum);
      this.goalInputValueJson['enterLumpsumInvestmentAmount'] = this.convertNumberToCommaSeperatedNumber(this.goalInputValueJson['enterLumpsumInvestmentAmount']);
      this.lifeInsurance = this.convertNumberToCommaSeperatedNumber(this.lifeInsurance);

      this.desc = `Hi <span style="color:red !important">${this.userName}</span>  for <span style="color:red !important">${'Following your Passion'}</span> after <span style="color:red !important">${this.goalInputValueJson['enterNumberOfYears']}</span> years 	
      you would require ₹ <span style="color:red !important">${this.futureValueOfPassion}</span>. To fund the same, you need to start a monthly SIP of <span style="color:red !important">${'₹'} ${this.sipNoLumpsum}</span> 	
      over next <span style="color:red !important">${this.goalInputValueJson['enterNumberOfYears']}</span> years. As you are investing <span style="color:red !important">${this.goalInputValueJson['enterLumpsumInvestmentAmount']}</span> as lumpsum amount today, you can achieve your goal by starting a monthly SIP of <span style="color:red !important">${'₹'} ${this.sipWithLumpsum}</span> 	
      What's more, if you opt for the CSIP* facility, you can get a life insurance cover of upto <span style="color:red !important">${'₹'} ${this.lifeInsurance}</span> at no additional cost.	`;

    }

    else if (this.singleSelectedGoal === "Philanthropy") {

      // Calculating future Value Of Starting Business
      this.futureValueOfPhilantrophy = Math.round(this.futureValue(this.goalInputValueJson['expectedInflation'], this.goalInputValueJson['enterNumberOfYears'], this.goalInputValueJson['enterAmount']))
      console.log("This is calculation for Philanthropy", this.futureValueOfPhilantrophy);

      this.sipNoLumpsum = Math.round(this.PMT(this.goalInputValueJson['expectedReturnsOnInvestment'] / 12, this.goalInputValueJson['enterNumberOfYears'] * 12, 0, -this.futureValueOfPhilantrophy, 1));
      console.log("This is calculation for sip with no lumpsum", this.sipNoLumpsum);
      // // Calculating SIP (considering  lumpsum amount is invested today)
      this.sipWithLumpsum = Math.round(-this.PMT(this.goalInputValueJson['expectedReturnsOnInvestment'] / 12, this.goalInputValueJson['enterNumberOfYears'] * 12, -this.goalInputValueJson['enterLumpsumInvestmentAmount'], this.futureValueOfPhilantrophy, 1))
      console.log("This is calculation for sip with lumpsum", this.sipWithLumpsum);

      //Displaying calculation for life insurance cover 
      (this.sipWithLumpsum * 100) < 5000000 ? this.lifeInsurance = this.sipWithLumpsum * 100 : this.lifeInsurance = 5000000;
      console.log("This is the calculation for life insurance cover", this.lifeInsurance)

      let caclObj = {};
      caclObj['futureValueOfPhilantrophy'] = this.futureValueOfPhilantrophy;
      caclObj['sipNoLumpsum'] = this.sipNoLumpsum;
      caclObj['sipWithLumpsum'] = this.sipWithLumpsum;
      caclObj['lifeInsurance'] = this.lifeInsurance;
      caclObj['afterYears'] = this.goalInputValueJson['enterNumberOfYears'];

      this.storeDataToLocalObject(caclObj);

      this.futureValueOfPhilantrophy = this.convertNumberToCommaSeperatedNumber(this.futureValueOfPhilantrophy);
      this.sipNoLumpsum = this.convertNumberToCommaSeperatedNumber(this.sipNoLumpsum);
      this.sipWithLumpsum = this.convertNumberToCommaSeperatedNumber(this.sipWithLumpsum);
      this.goalInputValueJson['enterLumpsumInvestmentAmount'] = this.convertNumberToCommaSeperatedNumber(this.goalInputValueJson['enterLumpsumInvestmentAmount']);
      this.lifeInsurance = this.convertNumberToCommaSeperatedNumber(this.lifeInsurance);


      this.desc = `Hi <span style="color:red !important">${this.userName}</span>  for <span style="color:red !important">${'Philanthropy'}</span> after <span style="color:red !important">${this.goalInputValueJson['enterNumberOfYears']}</span> years 	
      you would require <span style="color:red !important">${'₹'} ${this.futureValueOfPhilantrophy}</span>. To fund the same, you need to start a monthly SIP of <span style="color:red !important">${'₹'} ${this.sipNoLumpsum}</span> 	
      over next <span style="color:red !important">${this.goalInputValueJson['enterNumberOfYears']}</span> years. As you are investing <span style="color:red !important">${'₹'} ${this.goalInputValueJson['enterLumpsumInvestmentAmount']}</span> as lumpsum amount today, you can achieve your goal by starting a monthly SIP of <span style="color:red !important">${'₹'} ${this.sipWithLumpsum}</span> 	
      What's more, if you opt for the CSIP* facility, you can get a life insurance cover of upto <span style="color:red !important">${'₹'} ${this.lifeInsurance}</span> at no additional cost.	`;

    }

    else if (this.singleSelectedGoal === "Bike") {

      // Calculating future Value Of Starting Business
      this.futureValueOfBike = Math.round(this.futureValue(this.goalInputValueJson['expectedInflation'], this.goalInputValueJson['enterNumberOfYears'], this.goalInputValueJson['enterAmount']))
      console.log("This is calculation for Bike", this.futureValueOfBike);

      //Calculating vehicle loan amount
      this.vehicleLoanAmount = Math.round(this.findLoanAmount(this.downPayment = 20, this.futureValueOfBike));
      console.log(this.vehicleLoanAmount);

      //Calculating Down Payment Amount
      this.downPaymentAmount = Math.round(this.findDownPaymentAmount(this.downPayment = 20, this.futureValueOfBike));
      console.log(this.downPaymentAmount)

      this.sipNoLumpsum = Math.round(this.PMT(this.goalInputValueJson['expectedReturnsOnInvestment'] / 12, this.goalInputValueJson['enterNumberOfYears'] * 12, 0, -this.downPaymentAmount, 1));
      console.log("This is calculation for sip with no lumpsum", this.sipNoLumpsum);
      // // Calculating SIP (considering  lumpsum amount is invested today)
      this.sipWithLumpsum = Math.round(-this.PMT(this.goalInputValueJson['expectedReturnsOnInvestment'] / 12, this.goalInputValueJson['enterNumberOfYears'] * 12, -this.goalInputValueJson['enterLumpsumInvestmentAmount'], this.downPaymentAmount, 1));
      console.log("This is calculation for sip with lumpsum", this.sipWithLumpsum);

      //Displaying calculation for life insurance cover 
      (this.sipWithLumpsum * 100) < 5000000 ? this.lifeInsurance = this.sipWithLumpsum * 100 : this.lifeInsurance = 5000000;
      console.log("This is the calculation for life insurance cover", this.lifeInsurance)

      let caclObj = {};
      caclObj['futureValueOfBike'] = this.futureValueOfBike;
      caclObj['vehicleLoanAmount'] = this.vehicleLoanAmount;
      caclObj['downPaymentAmount'] = this.downPaymentAmount;
      caclObj['sipNoLumpsum'] = this.sipNoLumpsum;
      caclObj['sipWithLumpsum'] = this.sipWithLumpsum;
      caclObj['lifeInsurance'] = this.lifeInsurance;
      caclObj['afterYears'] = this.goalInputValueJson['enterNumberOfYears'];


      this.storeDataToLocalObject(caclObj);



      this.futureValueOfBike = this.convertNumberToCommaSeperatedNumber(this.futureValueOfBike);
      this.downPaymentAmount = this.convertNumberToCommaSeperatedNumber(this.downPaymentAmount);
      this.sipNoLumpsum = this.convertNumberToCommaSeperatedNumber(this.sipNoLumpsum);
      this.sipWithLumpsum = this.convertNumberToCommaSeperatedNumber(this.sipWithLumpsum);
      this.goalInputValueJson['enterLumpsumInvestmentAmount'] = this.convertNumberToCommaSeperatedNumber(this.goalInputValueJson['enterLumpsumInvestmentAmount']);
      this.lifeInsurance = this.convertNumberToCommaSeperatedNumber(this.lifeInsurance);

      this.desc = `Hi 	<span style="color:red !important">${this.userName}</span> after <span style="color:red !important">${this.goalInputValueJson['enterNumberOfYears']}</span> years the <span style="color:red !important">${'Bike'}</span> will cost you <span style="color:red !important">${'₹'} ${this.futureValueOfBike}</span>. As you are funding <span style="color:red !important">${'20%'}</span> of the down payment i.e. <span style="color:red !important">${'₹'} ${this.downPaymentAmount}</span> you would need to start a monthly SIP of 	<span style="color:red !important">${'₹'} ${this.sipNoLumpsum}</span> As you are investing <span style="color:red !important">${'₹'} ${this.goalInputValueJson['enterLumpsumInvestmentAmount']}</span> as lumpsum amount today, you can achieve your goal by starting a monthly SIP of <span style="color:red !important">${'₹'} ${this.sipWithLumpsum}</span>. What's more, if you opt for the CSIP* facility, you can get a life insurance cover of upto <span style="color:red !important">${'₹'} ${this.lifeInsurance}</span> at no additional cost.`;
    }

    else if (this.singleSelectedGoal === "Car") {

      // Calculating future Value Of Starting Business
      this.futureValueOfCar = Math.round(this.futureValue(this.goalInputValueJson['expectedInflation'], this.goalInputValueJson['enterNumberOfYears'], this.goalInputValueJson['enterAmount']))
      console.log("This is calculation for Car", this.futureValueOfCar);

      //Calculating vehicle loan amount
      this.vehicleLoanAmount = Math.round(this.findLoanAmount(this.downPayment = 30, this.futureValueOfCar));
      console.log(this.vehicleLoanAmount);
      //Calculating Down Payment Amount
      this.downPaymentAmount = Math.round(this.findDownPaymentAmount(this.downPayment = 30, this.futureValueOfCar));
      console.log(this.downPaymentAmount)
      this.sipNoLumpsum = Math.round(this.PMT(this.goalInputValueJson['expectedReturnsOnInvestment'] / 12, this.goalInputValueJson['enterNumberOfYears'] * 12, 0, -this.downPaymentAmount, 1));
      console.log("This is calculation for sip with no lumpsum", this.sipNoLumpsum);
      // // Calculating SIP (considering  lumpsum amount is invested today)
      this.sipWithLumpsum = Math.round(-this.PMT(this.goalInputValueJson['expectedReturnsOnInvestment'] / 12, this.goalInputValueJson['enterNumberOfYears'] * 12, -this.goalInputValueJson['enterLumpsumInvestmentAmount'], this.downPaymentAmount, 1));
      console.log("This is calculation for sip with lumpsum", this.sipWithLumpsum);

      //Displaying calculation for life insurance cover 
      (this.sipWithLumpsum * 100) < 5000000 ? this.lifeInsurance = this.sipWithLumpsum * 100 : this.lifeInsurance = 5000000;
      console.log("This is the calculation for life insurance cover", this.lifeInsurance)

      let caclObj = {};
      caclObj['futureValueOfCar'] = this.futureValueOfCar;
      caclObj['vehicleLoanAmount'] = this.vehicleLoanAmount;
      caclObj['downPaymentAmount'] = this.downPaymentAmount;
      caclObj['sipNoLumpsum'] = this.sipNoLumpsum;
      caclObj['sipWithLumpsum'] = this.sipWithLumpsum;
      caclObj['lifeInsurance'] = this.lifeInsurance;
      caclObj['afterYears'] = this.goalInputValueJson['enterNumberOfYears'];

      this.storeDataToLocalObject(caclObj);

      this.futureValueOfCar = this.convertNumberToCommaSeperatedNumber(this.futureValueOfCar);
      this.downPaymentAmount = this.convertNumberToCommaSeperatedNumber(this.downPaymentAmount);
      this.sipNoLumpsum = this.convertNumberToCommaSeperatedNumber(this.sipNoLumpsum);
      this.sipWithLumpsum = this.convertNumberToCommaSeperatedNumber(this.sipWithLumpsum);
      this.goalInputValueJson['enterLumpsumInvestmentAmount'] = this.convertNumberToCommaSeperatedNumber(this.goalInputValueJson['enterLumpsumInvestmentAmount']);
      this.lifeInsurance = this.convertNumberToCommaSeperatedNumber(this.lifeInsurance);

      this.desc = `Hi <span style="color:red !important">${this.userName}</span> after <span style="color:red !important">${this.goalInputValueJson['enterNumberOfYears']}</span> years the <span style="color:red !important">${'Car'}</span> will cost you <span style="color:red !important">${'₹'} ${this.futureValueOfCar}</span> As you are funding 	<span style="color:red !important">${'30%'}</span> of the down payment i.e. <span style="color:red !important">${'₹'} ${this.downPaymentAmount}</span> you would need to start a monthly SIP of <span style="color:red !important">${'₹'} ${this.sipNoLumpsum}</span>. As you are investing <span style="color:red !important">${'₹'} ${this.goalInputValueJson['enterLumpsumInvestmentAmount']}</span> as lumpsum amount today, you can achieve your goal by starting a monthly SIP of <span style="color:red !important"> ${'₹'} ${this.sipWithLumpsum}</span>. What's more, if you opt for the CSIP* facility, you can get a life insurance cover of upto <span style="color:red !important">	${'₹'} ${this.lifeInsurance}</span>at no additional cost.`;
    }

    else if (this.singleSelectedGoal === "Dream Home") {

      // Calculating future Value Of Starting Business
      this.futureValueOfDreamHome = Math.round(this.futureValue(this.goalInputValueJson['expectedInflation'], this.goalInputValueJson['enterNumberOfYears'], this.goalInputValueJson['enterAmount']))
      console.log("This is calculation for Dream Home", this.futureValueOfDreamHome);

      //Calculating vehicle loan amount
      this.dreamHomeLoanAmount = Math.round(this.findLoanAmount(this.downPayment = 20, this.futureValueOfDreamHome));
      console.log(this.dreamHomeLoanAmount);

      //Calculating Down Payment Amount
      this.downPaymentAmount = Math.round(this.findDownPaymentAmount(this.downPayment = 20, this.futureValueOfDreamHome));
      console.log(this.downPaymentAmount)

      this.sipNoLumpsum = Math.round(this.PMT(this.goalInputValueJson['expectedReturnsOnInvestment'] / 12, this.goalInputValueJson['enterNumberOfYears'] * 12, 0, -this.downPaymentAmount, 1));
      console.log("This is calculation for sip with no lumpsum", this.sipNoLumpsum);
      // // Calculating SIP (considering  lumpsum amount is invested today)
      this.sipWithLumpsum = Math.round(-this.PMT(this.goalInputValueJson['expectedReturnsOnInvestment'] / 12, this.goalInputValueJson['enterNumberOfYears'] * 12, -this.goalInputValueJson['enterLumpsumInvestmentAmount'], this.downPaymentAmount, 1));
      console.log("This is calculation for sip with lumpsum", this.sipWithLumpsum);

      //Displaying calculation for life insurance cover 
      (this.sipWithLumpsum * 100) < 5000000 ? this.lifeInsurance = this.sipWithLumpsum * 100 : this.lifeInsurance = 5000000;
      console.log("This is the calculation for life insurance cover", this.lifeInsurance)

      let caclObj = {};
      caclObj['futureValueOfDreamHome'] = this.futureValueOfDreamHome;
      caclObj['dreamHomeLoanAmount'] = this.dreamHomeLoanAmount;
      caclObj['downPaymentAmount'] = this.downPaymentAmount;
      caclObj['sipNoLumpsum'] = this.sipNoLumpsum;
      caclObj['sipWithLumpsum'] = this.sipWithLumpsum;
      caclObj['lifeInsurance'] = this.lifeInsurance;
      caclObj['afterYears'] = this.goalInputValueJson['enterNumberOfYears'];


      this.storeDataToLocalObject(caclObj);


      this.futureValueOfDreamHome = this.convertNumberToCommaSeperatedNumber(this.futureValueOfDreamHome);
      this.downPaymentAmount = this.convertNumberToCommaSeperatedNumber(this.downPaymentAmount);
      this.sipNoLumpsum = this.convertNumberToCommaSeperatedNumber(this.sipNoLumpsum);
      this.sipWithLumpsum = this.convertNumberToCommaSeperatedNumber(this.sipWithLumpsum);
      this.goalInputValueJson['enterLumpsumInvestmentAmount'] = this.convertNumberToCommaSeperatedNumber(this.goalInputValueJson['enterLumpsumInvestmentAmount']);
      this.lifeInsurance = this.convertNumberToCommaSeperatedNumber(this.lifeInsurance);

      this.desc = `Hi 	<span style="color:red !important">${this.userName}</span> after <span style="color:red !important">${this.goalInputValueJson['enterNumberOfYears']}</span> years the <span style="color:red !important">${'Dream Home'}</span>  will cost you <span style="color:red !important">${'₹'} ${this.futureValueOfDreamHome}</span>. As you are funding 	<span style="color:red !important">${'20%'}</span> of the down payment i.e. <span style="color:red !important">${'₹'} ${this.downPaymentAmount}</span> you would need to start a monthly SIP of <span style="color:red !important">${'₹'} ${this.sipNoLumpsum}</span>. As you are investing <span style="color:red !important">${'₹'} ${this.goalInputValueJson['enterLumpsumInvestmentAmount']}</span> as lumpsum amount today, you can achieve your goal by starting a monthly SIP of 	<span style="color:red !important">${'₹'} ${this.sipWithLumpsum}</span> What's more, if you opt for the CSIP* facility, you can get a life insurance cover of upto <span style="color:red !important">${'₹'} ${this.lifeInsurance}</span> at no additional cost.`;
    }

    else if (this.singleSelectedGoal === "Childs Education") {

      // Calculating future Value Of Starting Business
      this.futureValueOfChildEducation = Math.round(this.futureValue(this.goalInputValueJson['expectedInflation'], this.goalInputValueJson['enterNumberOfYears'], this.goalInputValueJson['enterAmount']))
      console.log("This is calculation for Child Education", this.futureValueOfChildEducation);

      this.sipNoLumpsum = Math.round(this.PMT(this.goalInputValueJson['expectedReturnsOnInvestment'] / 12, this.goalInputValueJson['enterNumberOfYears'] * 12, 0, -this.futureValueOfChildEducation, 1))
      console.log("This is calculation for sip with no lumpsum", this.sipNoLumpsum);
      // // Calculating SIP (considering  lumpsum amount is invested today)
      this.sipWithLumpsum = Math.round(-this.PMT(this.goalInputValueJson['expectedReturnsOnInvestment'] / 12, this.goalInputValueJson['enterNumberOfYears'] * 12, -this.goalInputValueJson['enterLumpsumInvestmentAmount'], this.futureValueOfChildEducation, 1));
      console.log("This is calculation for sip with lumpsum", this.sipWithLumpsum);

      //Displaying calculation for life insurance cover 
      (this.sipWithLumpsum * 100) < 5000000 ? this.lifeInsurance = this.sipWithLumpsum * 100 : this.lifeInsurance = 5000000;
      console.log("This is the calculation for life insurance cover", this.lifeInsurance)

      let caclObj = {};
      caclObj['futureValueOfChildEducation'] = this.futureValueOfChildEducation;
      caclObj['sipNoLumpsum'] = this.sipNoLumpsum;
      caclObj['sipWithLumpsum'] = this.sipWithLumpsum;
      caclObj['lifeInsurance'] = this.lifeInsurance;
      caclObj['afterYears'] = this.goalInputValueJson['enterNumberOfYears'];

      this.convertNumberToCommaSeperatedNumber(caclObj['futureValueOfChildEducation']);

      this.storeDataToLocalObject(caclObj);

      this.futureValueOfChildEducation = this.convertNumberToCommaSeperatedNumber(this.futureValueOfChildEducation);
      this.sipNoLumpsum = this.convertNumberToCommaSeperatedNumber(this.sipNoLumpsum);
      this.sipWithLumpsum = this.convertNumberToCommaSeperatedNumber(this.sipWithLumpsum);
      this.goalInputValueJson['enterLumpsumInvestmentAmount'] = this.convertNumberToCommaSeperatedNumber(this.goalInputValueJson['enterLumpsumInvestmentAmount']);
      this.lifeInsurance = this.convertNumberToCommaSeperatedNumber(this.lifeInsurance);

      this.desc = `Hi 	<span style="color:red !important">${this.userName}</span> for 	<span style="color:red !important">${this.goalInputValueJson['enterChildName']}${"'s Education"} </span>after <span style="color:red !important">${this.goalInputValueJson['enterNumberOfYears']}</span> years you would require <span style="color:red !important">${'₹'} ${this.futureValueOfChildEducation}</span>. To fund the same, you need to start a monthly SIP of <span style="color:red !important">${'₹'} ${this.sipNoLumpsum}</span> over next	<span style="color:red !important">${this.goalInputValueJson['enterNumberOfYears']}</span>	years. As you are investing	<span style="color:red !important">${'₹'} ${this.goalInputValueJson['enterLumpsumInvestmentAmount']}</span>	as lumpsum amount today, you can achieve your goal by starting a monthly SIP of	<span style="color:red !important">${'₹'} ${this.sipWithLumpsum}</span> What's more, if you opt for the CSIP* facility, you can get a life insurance cover of upto <span style="color:red !important">${'₹'} ${this.lifeInsurance}</span> at no additional cost`;
    }

    else if (this.singleSelectedGoal === "Childs Marriage") {

      // Calculating future Value Of Starting Business
      this.futureValueOfChildMarriage = Math.round(this.futureValue(this.goalInputValueJson['expectedInflation'], this.goalInputValueJson['enterNumberOfYears'], this.goalInputValueJson['enterAmount']))
      console.log("This is calculation for Child Marriage", this.futureValueOfChildMarriage);

      this.sipNoLumpsum = Math.round(this.PMT(this.goalInputValueJson['expectedReturnsOnInvestment'] / 12, this.goalInputValueJson['enterNumberOfYears'] * 12, 0, -this.futureValueOfChildMarriage, 1));
      console.log("This is calculation for sip with no lumpsum", this.sipNoLumpsum);
      // // Calculating SIP (considering  lumpsum amount is invested today)
      this.sipWithLumpsum = Math.round(-this.PMT(this.goalInputValueJson['expectedReturnsOnInvestment'] / 12, this.goalInputValueJson['enterNumberOfYears'] * 12, -this.goalInputValueJson['enterLumpsumInvestmentAmount'], this.futureValueOfChildMarriage, 1));
      console.log("This is calculation for sip with lumpsum", this.sipWithLumpsum);

      //Displaying calculation for life insurance cover 
      (this.sipWithLumpsum * 100) < 5000000 ? this.lifeInsurance = this.sipWithLumpsum * 100 : this.lifeInsurance = 5000000;
      console.log("This is the calculation for life insurance cover", this.lifeInsurance)

      let caclObj = {};
      caclObj['futureValueOfChildMarriage'] = this.futureValueOfChildMarriage;
      caclObj['sipNoLumpsum'] = this.sipNoLumpsum;
      caclObj['sipWithLumpsum'] = this.sipWithLumpsum;
      caclObj['lifeInsurance'] = this.lifeInsurance;
      caclObj['afterYears'] = this.goalInputValueJson['enterNumberOfYears'];

      this.storeDataToLocalObject(caclObj);

      this.futureValueOfChildMarriage = this.convertNumberToCommaSeperatedNumber(this.futureValueOfChildMarriage);
      this.sipNoLumpsum = this.convertNumberToCommaSeperatedNumber(this.sipNoLumpsum);
      this.sipWithLumpsum = this.convertNumberToCommaSeperatedNumber(this.sipWithLumpsum);
      this.goalInputValueJson['enterLumpsumInvestmentAmount'] = this.convertNumberToCommaSeperatedNumber(this.goalInputValueJson['enterLumpsumInvestmentAmount']);
      this.lifeInsurance = this.convertNumberToCommaSeperatedNumber(this.lifeInsurance);

      this.desc = `Hi <span style="color:red !important">${this.userName}</span> for <span style="color:red !important">${this.goalInputValueJson['enterChildName']}${"'s Marriage"}</span> after <span style="color:red !important">${this.goalInputValueJson['enterNumberOfYears']}</span> years you would require<span style="color:red !important">${'₹'} ${this.futureValueOfChildMarriage}</span> To fund the same, you need to start a monthly SIP of	<span style="color:red !important">${'₹'} ${this.sipNoLumpsum}</span> over next	<span style="color:red !important">${this.goalInputValueJson['enterNumberOfYears']}</span>	years. As you are investing <span style="color:red !important">${'₹'} ${this.goalInputValueJson['enterLumpsumInvestmentAmount']}</span>	as lumpsum amount today, you can achieve your goal by starting a monthly SIP of	<span style="color:red !important">${'₹'} ${this.sipWithLumpsum}</span> What's more, if you opt for the CSIP* facility, you can get a life insurance cover of upto <span style="color:red !important">${'₹'} ${this.lifeInsurance}</span>  at no additional cost`;
    }

    else if (this.singleSelectedGoal === "Retirement") {

      // Calculating future Value Of Starting Business
    
      this.futureValueOfExpensesInRetirementAge=Math.round(this.futureValue(this.goalInputValueJson['expectedInflationBeforeRetiremnet'], (this.goalInputValueJson['currentAge']-25), this.goalInputValueJson['enterAmount']))
      console.log("This is calculation for Retirement", this.futureValueOfExpensesInRetirementAge)


      //Calculating Corpus Required to Fund Retirement Expenses
      this.corpusAmount = Math.round(this.findCorpusAmount(this.futureValueOfExpensesInRetirementAge, this.goalInputValueJson['rateOfReturnPostRetirement']));
      console.log(this.corpusAmount)
      // Calculating SIP (considering no lumpsum amount is invested today)
      // this.sipNoLumpsum=Math.round(this.PMT(this.goalInputValueJson['expectedReturnsOnInvestment']/12, 25*12, 0,this.corpusAmount , 1));
      // console.log("This is calculation for sip with no lumpsum",this.sipNoLumpsum);

      this.sipNoLumpsum = Math.round(this.PMT((this.goalInputValueJson['rateOfReturnBeforeRetirement'] / 12), (this.goalInputValueJson['enterRetirementAge'] - this.goalInputValueJson['currentAge']) * 12, 0, this.corpusAmount, 1));
       
      console.log("This is calculation for sip with no lumpsum", this.sipNoLumpsum);

      // // Calculating SIP (considering  lumpsum amount is invested today)
      this.sipWithLumpsum = Math.round(-this.PMT(this.goalInputValueJson['rateOfReturnBeforeRetirement'] / 12, (this.goalInputValueJson['enterRetirementAge'] - this.goalInputValueJson['currentAge']) * 12, this.goalInputValueJson['enterLumpsumInvestmentAmount'], this.futureValueOfExpensesInRetirementAge, 1));
      console.log("This is calculation for sip with lumpsum", this.sipWithLumpsum);

      //Displaying calculation for life insurance cover 
      (this.sipWithLumpsum * 100) < 5000000 ? this.lifeInsurance = this.sipWithLumpsum * 100 : this.lifeInsurance = 5000000;
      console.log("This is the calculation for life insurance cover", this.lifeInsurance)

      let ageDifference = this.goalInputValueJson['enterRetirementAge'] - this.goalInputValueJson['currentAge']

      let caclObj = {};
      caclObj['futureValueOfExpensesInRetirementAge'] = this.futureValueOfExpensesInRetirementAge;
      caclObj['corpusAmount'] = this.corpusAmount;
      caclObj['sipNoLumpsum'] = this.sipNoLumpsum;
      caclObj['sipWithLumpsum'] = this.sipWithLumpsum;
      caclObj['lifeInsurance'] = this.lifeInsurance;
      caclObj['afterYears'] = ageDifference;


      this.storeDataToLocalObject(caclObj);

      this.goalInputValueJson['enterAmount'] = this.convertNumberToCommaSeperatedNumber(this.goalInputValueJson['enterAmount']);
      this.futureValueOfExpensesInRetirementAge = this.convertNumberToCommaSeperatedNumber(this.futureValueOfExpensesInRetirementAge);
      this.corpusAmount = this.convertNumberToCommaSeperatedNumber(this.corpusAmount);
      this.sipWithLumpsum = this.convertNumberToCommaSeperatedNumber(this.sipWithLumpsum);
      this.goalInputValueJson['enterLumpsumInvestmentAmount'] = this.convertNumberToCommaSeperatedNumber(this.goalInputValueJson['enterLumpsumInvestmentAmount']);
      this.lifeInsurance = this.convertNumberToCommaSeperatedNumber(this.lifeInsurance);

      this.desc = `Hi <span style="color:red !important">${this.userName}</span>, after <span style="color:red !important">${(this.goalInputValueJson['enterRetirementAge'] - this.goalInputValueJson['currentAge'])}</span> years (as you Retire), your current annual expenses of <span style="color:red !important">${'₹'} ${this.goalInputValueJson['enterAmount']}</span> would swell to <span style="color:red !important">${'₹'} ${this.futureValueOfExpensesInRetirementAge}</span>. To maintain the same lifestyle post retirement, you would need a retirement savings of <span style="color:red !important">${'₹'} ${this.corpusAmount}</span>. If you invest <span style="color:red !important">${'₹'} ${this.goalInputValueJson['enterLumpsumInvestmentAmount']}</span> lumpsum today for your retirement, you would need to start a monthly SIP of <span style="color:red !important">${'₹'} ${this.sipWithLumpsum}</span> and continue till you turn <span style="color:red !important">${this.goalInputValueJson['currentAge']}</span> . What's more, if you opt for the CSIP* facility, you can get a life insurance cover of upto <span style="color:red !important">${'₹'} ${this.lifeInsurance}</span>  at no additional cost.`;
    }

    else {

      // Calculating future Value Of Starting Business
      this.futureValueOfGoal = Math.round(this.futureValue(this.goalInputValueJson['expectedInflation'], this.goalInputValueJson['enterNumberOfYears'], this.goalInputValueJson['enterAmount']))
      console.log("This is calculation for AddOtherGoal", this.futureValueOfGoal);

      // Calculating SIP (considering no lumpsum amount is invested today)
      this.sipNoLumpsum = Math.round(this.PMT(this.goalInputValueJson['expectedReturnsOnInvestment'] / 12, this.goalInputValueJson['enterNumberOfYears'] * 12, 0, -this.futureValueOfGoal, 1))
      console.log("This is calculation for sip with no lumpsum", this.sipNoLumpsum);
      // // Calculating SIP (considering  lumpsum amount is invested today)
      this.sipWithLumpsum = Math.round(-this.PMT(this.goalInputValueJson['expectedReturnsOnInvestment'] / 12, this.goalInputValueJson['enterNumberOfYears'] * 12, -this.goalInputValueJson['enterLumpsumInvestmentAmount'], this.futureValueOfGoal, 1));
      console.log("This is calculation for sip with lumpsum", this.sipWithLumpsum);

      //Displaying calculation for life insurance cover 
      (this.sipWithLumpsum * 100) < 5000000 ? this.lifeInsurance = this.sipWithLumpsum * 100 : this.lifeInsurance = 5000000;
      console.log("This is the calculation for life insurance cover", this.lifeInsurance)

      let negativeNumber =this.checkNegativeNumber(this.sipWithLumpsum, this.sipNoLumpsum, this.lifeInsurance);


      let caclObj = {};
      caclObj['futureValueOfGoal'] = this.futureValueOfGoal;
      caclObj['sipNoLumpsum'] = this.sipNoLumpsum;
      caclObj['sipWithLumpsum'] = this.sipWithLumpsum;
      caclObj['lifeInsurance'] = this.lifeInsurance;
      caclObj['afterYears'] = this.goalInputValueJson['enterNumberOfYears'];

      this.storeDataToLocalObject(caclObj);

      this.futureValueOfGoal = this.convertNumberToCommaSeperatedNumber(this.futureValueOfGoal);
      this.sipNoLumpsum = this.convertNumberToCommaSeperatedNumber(this.sipNoLumpsum);
      this.sipWithLumpsum = this.convertNumberToCommaSeperatedNumber(this.sipWithLumpsum);
      this.goalInputValueJson['enterLumpsumInvestmentAmount'] = this.convertNumberToCommaSeperatedNumber(this.goalInputValueJson['enterLumpsumInvestmentAmount']);
      this.lifeInsurance = this.convertNumberToCommaSeperatedNumber(this.lifeInsurance);


      this.desc = `Hi <span style="color:red !important">${this.userName}</span> for <span style="color:red !important">${this.customGoal}</span> after <span style="color:red !important">${this.goalInputValueJson['enterNumberOfYears']}</span> years 	
      you would require <span style="color:red !important">${'₹'} ${this.futureValueOfGoal}</span> To fund the same, you need to start a monthly SIP of <span style="color:red !important">${'₹'} ${this.sipNoLumpsum}</span> 	
      over next <span style="color:red !important">${this.goalInputValueJson['enterNumberOfYears']}</span> years. As you are investing <span style="color:red !important">${'₹'} ${this.goalInputValueJson['enterLumpsumInvestmentAmount']}</span> as lumpsum amount today, you can achieve your goal by starting a monthly SIP of <span style="color:red !important">${'₹'} ${this.sipWithLumpsum}</span> 	
      What's more, if you opt for the CSIP* facility, you can get a life insurance cover of upto <span style="color:red !important">${'₹'} ${this.lifeInsurance}</span>  at no additional cost.	`;
    }
  }



  //Method to caculate Future Value
  futureValue(i, n, PV) {
    i = parseInt(i);
    n = parseInt(n);
    PV = parseInt(PV);
    var x = (1 + i / 100)
    var FV = PV * (Math.pow(x, n))
    return FV;
  }


  PMT(rate_per_period, number_of_payments, present_value, future_value, type) {
    rate_per_period = parseInt(rate_per_period);
    number_of_payments = parseInt(number_of_payments);
    present_value = parseInt(present_value);;
    future_value = parseInt(future_value);
    type = parseInt(type)

    future_value = typeof future_value !== 'undefined' ? future_value : 0;
    type = typeof type !== 'undefined' ? type : 0;
    rate_per_period = rate_per_period / 100;
    if (rate_per_period != 0.0) {
      // Interest rate exists
      var q = Math.pow(1 + rate_per_period, number_of_payments);
      return -(rate_per_period * (future_value + (q * present_value))) / ((-1 + q) * (1 + rate_per_period * (type)));
    } else if (number_of_payments != 0.0) {
      // No interest rate, but number of payments exists
      return -(future_value + present_value) / number_of_payments;
    }
    return 0;
  }

  findLoanAmount(downPayment, FV) {
    downPayment = parseInt(downPayment);
    FV = parseInt(FV);
    let vehicleLoanAmount = (1 - downPayment / 100) * FV;
    return vehicleLoanAmount;
  }

  findDownPaymentAmount(downPayment, FV) {
    downPayment = parseInt(downPayment);
    FV = parseInt(FV);
    let downPaymentAmount = (downPayment / 100 * FV);
    return downPaymentAmount;
  }

  findCorpusAmount(futureValueOfExpensesInRetirementAge, rateOfReturnPostRetirement) {
    futureValueOfExpensesInRetirementAge = parseInt(futureValueOfExpensesInRetirementAge);
    rateOfReturnPostRetirement = parseInt(rateOfReturnPostRetirement)/100;

    let corpusAmount = futureValueOfExpensesInRetirementAge / rateOfReturnPostRetirement;
    return corpusAmount;
  }

  checkNegativeNumber(sipWithLumpsum, sipWithNoLumpsum, lifeInsurance){
    if(sipWithLumpsum || sipWithNoLumpsum || lifeInsurance < 0){
      return 
    }
  }




  desc: any;

  storeDataToLocalObject(caclObj) {
    // this.desc = this.getDesc(this.userName, this.goalInputValueJson['enterNumberOfYears']);
    this.showDesc = true;
    let questionsLength = this.questions.length;
    let queans = [];
    for (let i = 0; i < questionsLength; i++) {
      let currentQuestion = this.questions[i];
      let queObj = {
        que_id: currentQuestion.questionId,
        question: currentQuestion.name,
        answer: this.goalInputValueJson[currentQuestion.variableName]
      };
      queans.push(queObj);
    }

    caclObj['age'] = this.ques.age;

    let goalObj = {
      goals: this.ques.type,
      goal_id: this.ques.goalId,
      queans: queans,
      res: JSON.stringify(caclObj)
    }

    if (this.index == 0) {
      this.globalCal['goal1'] = goalObj;
    } else if (this.index == 1) {
      this.globalCal['goal2'] = goalObj;
    } else if (this.index == 2) {
      this.globalCal['goal3'] = goalObj;
    }

    for (let i = 0; i < this.nextGoals.length; i++) {
      let indexOfLoop = this.nextGoals[i].index;
      // let isCalculatevalue = this.nextGoals[i].isCalculated;
      if (indexOfLoop == this.index) {
        this.nextGoals[i].isCalculated = true;
      }
      
    }


  }
}










