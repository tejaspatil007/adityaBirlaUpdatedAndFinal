import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { AdityaBirlaServices } from "../../Shared/Services/calculatorgoal.services"
import { SelectgoalsComponent } from "../selectgoals/selectgoals.component"
// import { Icalculatorgoal } from 'src/Shared/Interfaces(Structure)/calculatorgoal';
import { Igoal } from './../../Shared/Interfaces(Structure)/goal';
import { async } from 'q';
import { Alert } from 'selenium-webdriver';


@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: [/*'./goals.component.css'*/],
})
export class GoalsComponent implements OnInit {

  // public Img:any;
  public images = [];
  // public response;
  public goalsInputValue: Object = [];

  public goals: Igoal;
  public goalData: Array<string> = [];
  // public Data;
  public data: any;
  // public img: any;
  // public img1: any;
  // public img2: any;
  public userName: any;
  public currentAge : any;
  public selectGoal: any;
  public questions: any;
  public questionType: string;
  public singleSelectedQuestion: string;
  public description: string;
  public goalQuestion = [];
  public goalInputValueJson;

  public colorImage:string;
  public uid: any;
  // public percent:any;
  public ival: any;

  public number = [];
  public percent = []
  public percent5 = [];
  public five = [];
  public age = [];

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

  public Image : string;
  // public show:boolean;

  constructor(private router: Router, private route: ActivatedRoute, private abs: AdityaBirlaServices) { }


  ngOnInit() {
    this.getSelectedGoals();

    // this.goalQuestion={};
    // this.goalQuestion[d = '';


  }

  SubmitGoalsData() {
    this.abs.postInputValuesAndResultOfGoals('goalsanswer').subscribe(res => {
      console.log(res)
    });
  }

  getSelectedGoals() {
    this.abs.getdata(localStorage.getItem('id')).subscribe(res => {

      console.log("result ->", res);
      this.selectGoal = res;
      // console.log("selectGoal=>",this.selectGoal);
      this.userName = this.selectGoal[0].name;
      // console.log(this.userName);
      this.currentAge = this.selectGoal[0].age;
      console.log("current Age",this.currentAge)
       
      // console.log("Images array is -->>> ", this.images);

      this.goalQuestion = [
        {
          "type": "Self Development",
          "questions": [
            {
              "questionId": "1",
              "name": "What amount is required for your self development goal today?",
              "variableName": "enterAmount",
              'control-type':'text',
              'validation': 'required'
            },
            {
              "questionId": "2",
              "name": "After how many years do you plan to take up your self development goal?",
              "variableName": "enterNumberOfYears",
              "options": this.number,
              'control-type':'dropdown',
              'validation': 'required'
            },
            {
              "questionId": "3",
              "name": "Expected inflation (% p.a.)",
              "options": this.percent,
              "variableName": "expectedInflation",
              'control-type':'dropdown',
              'validation': 'required'
            },
            {
              "questionId": "4",
              "name": "Expected returns on investment (% p.a.)",
              "options": this.percent5,
              "variableName": "expectedReturnsOnInvestment",
              'control-type':'dropdown',
              'validation': 'required'
            },
            {
              "questionId": "5",
              "name": "What amount you can invest today as Lumspum?",
              "variableName": "enterLumpsumInvestmentAmount",
              'control-type':'text',
              'validation': 'required'
            }
          ],
          "description": `Hi <span style="color:red !important">${this.userName}</span>  for Self Development after <span style="color:red !important">${this.goalsInputValue['enterNumberOfYears']}</span> years 	
          you would require ₹<span style="color:red !important"> ${this.futureValueOfSelfDevelopmentGoal}</span>. To fund the same, you need to start a monthly SIP of ₹ <span style="color:red !important">${this.sipNoLumpsum}</span> 	
          over next <span style="color:red !important">${this.goalsInputValue['enterNumberOfYears']}</span> years As you are investing <span style="color:red !important">${this.goalsInputValue['enterLumpsumInvestmentAmount']}</span> as lumpsum amount today, you can achieve your goal by starting a monthly SIP of 	₹<span style="color:red !important"> ${this.sipWithLumpsum}</span> 	
          What's more, if you opt for the CSIP* facility, you can get a life insurance cover of upto ₹ <span style="color:red !important">${this.lifeInsurance}</span> at no additional cost.`
        },
        {
          "type": "Starting Business",
          "questions": [
            {
              "questionId": "1",
              "name": "Amount required to start your Business today",
              "variableName": "enterAmount",
              'control-type':'text',
              'validation': 'required'
            },
            {
              "questionId": "2",
              "name": "After how many years do you plan to start your Business?",
              "options": this.number,
              "variableName": "enterNumberOfYears",
              'control-type':'dropdown',
              'validation': 'required'
            },
            {
              "questionId": "3",
              "name": "Expected inflation (% per annum)",
              "options": this.percent,
              "variableName": "expectedInflation",
              'control-type':'dropdown',
              'validation': 'required'
            },
            {
              "questionId": "4",
              "name": "Expected returns on investment (% per annum)",
              "options": this.percent5,
              "variableName": "expectedReturnsOnInvestment",
              'control-type':'dropdown',
              'validation': 'required'
            },
            {
              "questionId": "5",
              "name": "What amount you can invest today as Lumspum?",
              "variableName": "enterLumpsumInvestmentAmount",
              'control-type':'text',
              'validation': 'required'
            }
          ],
          "description": `Hi 	<span style="color:red !important">${this.userName}</span>  for Starting Business after <span style="color:red !important">${this.goalsInputValue['enterNumberOfYears']}</span> years 	
          you would require ₹ <span style="color:red !important">${this.futureValueOfStartingBusiness}</span> To fund the same, you need to start a monthly SIP of ₹<span style="color:red !important"> ${this.sipNoLumpsum}</span> 	
          over next <span style="color:red !important">${this.goalsInputValue['enterNumberOfYears']}</span> years As you are investing <span style="color:red !important">${this.goalsInputValue['enterLumpsumInvestmentAmount']}</span> as lumpsum amount today, you can achieve your goal by starting a monthly SIP of 	₹<span style="color:red !important"> ${this.sipWithLumpsum}</span> 	
          What's more, if you opt for the CSIP* facility, you can get a life insurance cover of upto Rs. 	₹ <span style="color:red !important">${this.lifeInsurance}</span> at no additional cost.	`


        },
        {
          "type": "Marriage",
          "questions": [
            {
              "questionId": "1",
              "name": "What amount you would require to get married today?",
              "variableName": "enterAmount",
              'control-type':'text',
              'validation': 'required'
            },
            {
              "questionId": "",
              "name": "After how many years do you plan to get married?",
              "options": this.number, "fname": "Enter number of years",
              "variableName": "enterNumberOfYears",
              'control-type':'dropdown',
              'validation': 'required'
            },
            {
              "questionId": "2",
              "name": "Expected inflation (% per annum)",
              "options": this.percent,
              "variableName": "expectedInflation",
              'control-type':'dropdown',
              'validation': 'required'
            },
            {
              "questionId": "3",
              "name": "Expected returns on investment (% per annum)",
              "options": this.percent5,
              "variableName": "expectedReturnsOnInvestment",
              'control-type':'dropdown',
              'validation': 'required'
            },
            {
              "questionId": "4",
              "name": "What amount you can invest today as Lumspum?",
              "variableName": "enterLumpsumInvestmentAmount",
              'control-type':'text',
              'validation': 'required'
            },
          ],
          "description": `Hi 	<span style="color:red !important">${this.userName}</span>  for Starting Business after <span style="color:red !important">${this.goalsInputValue['enterNumberOfYears']}</span> years 	
          you would require ₹ <span style="color:red !important">${this.futureValueOfStartingBusiness}</span> To fund the same, you need to start a monthly SIP of ₹<span style="color:red !important"> ${this.sipNoLumpsum}</span> 	
          over next <span style="color:red !important">${this.goalsInputValue['enterNumberOfYears']}</span> years As you are investing <span style="color:red !important">${this.goalsInputValue['enterLumpsumInvestmentAmount']}</span> as lumpsum amount today, you can achieve your goal by starting a monthly SIP of 	₹<span style="color:red !important"> ${this.sipWithLumpsum}</span> 	
          What's more, if you opt for the CSIP* facility, you can get a life insurance cover of upto Rs. ₹ <span style="color:red !important">${this.lifeInsurance}</span> at no additional cost.	`


        }, {
          "type": "Honeymoon",
          "questions": [
            {
              "questionId": "1",
              "name": "What amount is required to visit your honeymoon destination today?",
              "variableName": "enterAmount",
              'control-type':'text',
              'validation': 'required'
            },
            {
              "questionId": "2",
              "name": "After how many years do you plan to visit your honeymoon destination?",
              "options": this.number,
              "variableName": "enterNumberOfYears",
              'control-type':'dropdown',
              'validation': 'required'

            },
            {
              "questionId": "3",
              "name": "Expected inflation (% p.a.)",
              "options": this.percent,
              "variableName": "expectedInflation",
              'control-type':'dropdown',
              'validation': 'required'

            },
            {
              "questionId": "4",
              "name": "Expected returns on investment (% p.a.)",
              "options": this.percent5,
              "variableName": "expectedReturnsOnInvestment",
              'control-type':'dropdown',
              'validation': 'required'

            },
            {
              "questionId": "5",
              "name": "hat amount you can invest today as Lumspum?",
              "variableName": "enterLumpsumInvestmentAmount",
              'control-type':'text',
              'validation': 'required'

            }
          ],
          "description": `Hi 	<span style="color:red !important">${this.userName}</span>  for Starting Business after <span style="color:red !important">${this.goalsInputValue['enterNumberOfYears']}</span> years 	
          you would require ₹ <span style="color:red !important">${this.futureValueOfStartingBusiness}</span> To fund the same, you need to start a monthly SIP of ₹<span style="color:red !important"> ${this.sipNoLumpsum}</span> 	
          over next <span style="color:red !important">${this.goalsInputValue['enterNumberOfYears']}</span> years As you are investing <span style="color:red !important">${this.goalsInputValue['enterLumpsumInvestmentAmount']}</span> as lumpsum amount today, you can achieve your goal by starting a monthly SIP of 	₹<span style="color:red !important"> ${this.sipWithLumpsum}</span> 	
          What's more, if you opt for the CSIP* facility, you can get a life insurance cover of upto Rs. ₹ <span style="color:red !important">${this.lifeInsurance}</span> at no additional cost.	`

        },
        {
          "type": "Wealth Creation",
          "questions": [
            {
              "questionId": "1",
              "name": "How much wealth do you wish you accumulate?",
              "variableName": "enterAmount",
              'control-type':'text',
              'validation': 'required'

            },
            {
              "questionId": "2",
              "name": "After how many years do you plan to own this wealth?",
              "options": this.number,
              "variableName": "enterNumberOfYears",
              'control-type':'dropdown',
              'validation': 'required'
            },
            {
              "questionId": "3",
              "name": "Expected returns on investment (% p.a.)",
              "options": this.percent5,
              "variableName": "expectedReturnsOnInvestment",
              'control-type':'dropdown',
              'validation': 'required'
            },
            {
              "questionId": "4",
              "name": "Enter the savings you wish to invest for wealth creation?",
              "variableName": "enterLumpsumInvestmentAmount",
              'control-type':'text',
              'validation': 'required'
            }
          ],

          "description": `Hi <span style="color:red !important">${this.userName}</span> for Car of ₹ <span style="color:red !important">${this.goalsInputValue['enterAmount']}</span> after <span style="color:red !important">${this.goalsInputValue['enterNumberOfYears']}</span> years you need to start a monthly SIP of ₹ <span style="color:red !important">${this.sipNoLumpsum}</span> over next <span style="color:red !important"> ${this.goalsInputValue['enterNumberOfYears']}</span> years As you are investing ₹ <span style="color:red !important">${this.goalsInputValue['enterLumpsumInvestmentAmount']}</span> as lumpsum amount today, you can achieve your goal by starting a monthly SIP of ₹<span style="color:red !important"> ${this.sipWithLumpsum}</span> What's more, if you opt for the CSIP* facility, you can get a life insurance cover of upto Rs. 	₹ <span style="color:red !important">${this.lifeInsurance}</span>	If less than 50 lakh, at no additional cost.`

        }, {
          "type": "Holiday",
          "questions": [
            {
              "questionId": "1",
              "name": "Enter the amount required to visit your holiday destination today?",
              "variableName": "enterAmount",
              'control-type':'text',
              'validation': 'required'

            },
            {
              "questionId": "2",
              "name": "After how many years do you plan to visit your holiday destination?",
              "options": this.number,
              "variableName": "enterNumberOfYears",
              'control-type':'dropdown',
              'validation': 'required'

            },
            {
              "questionId": "3",
              "name": "Expected inflation (% p.a.)",
              "options": this.percent,
              "variableName": "expectedInflation",
              'control-type':'dropdown',
              'validation': 'required'
            },
            {
              "questionId": "4",
              "name": "Expected returns on investment (% p.a.)",
              "options": this.percent5,
              "variableName": "expectedReturnsOnInvestment",
              'control-type':'dropdown',
              'validation': 'required'

            },
            {
              "questionId": "5",
              "name": "What amount you can invest today as Lumspum?",
              "variableName": "enterLumpsumInvestmentAmount",
              'control-type':'text',
              'validation': 'required'
            }
          ],
          "description": `Hi 	<span style="color:red !important">${this.userName}</span>  for Starting Business after <span style="color:red !important">${this.goalsInputValue['enterNumberOfYears']}</span> years 	
          you would require ₹ <span style="color:red !important">${this.futureValueOfStartingBusiness}</span> To fund the same, you need to start a monthly SIP of ₹<span style="color:red !important"> ${this.sipNoLumpsum}</span> 	
          over next <span style="color:red !important">${this.goalsInputValue['enterNumberOfYears']}</span> years As you are investing <span style="color:red !important">${this.goalsInputValue['enterLumpsumInvestmentAmount']}</span> as lumpsum amount today, you can achieve your goal by starting a monthly SIP of 	₹<span style="color:red !important"> ${this.sipWithLumpsum}</span> 	
          What's more, if you opt for the CSIP* facility, you can get a life insurance cover of upto Rs. 	₹ <span style="color:red !important">${this.lifeInsurance}</span> at no additional cost.	`


        },
        {
          "type": "World Tour",
          "questions": [
            {
              "questionId": "1",
              "name": "What's the current cost of going on a World Tour?",
              "variableName": "enterAmount",
              'control-type':'text',
              'validation': 'required'

            },
            {
              "questionId": "2",
              "name": "After how many years do you plan to go for a World Tour?",
              "options": this.number,
              "variableName": "enterNumberOfYears",
              'control-type':'dropdown',
              'validation': 'required'

            },
            {
              "questionId": "3",
              "name": "Expected inflation (% p.a.)",
              "options": this.percent,
              "variableName": "expectedInflation",
              'control-type':'dropdown',
              'validation': 'required'

            },
            {
              "questionId": "4",
              "name": "Expected returns on investment (% p.a.)",
              "options": this.percent5,
              "variableName": "expectedReturnsOnInvestment",
              'control-type':'dropdown',
              'validation': 'required'
            },
            {
              "questionId": "5",
              "name": "What amount you can invest today as Lumspum?",
              "variableName": "enterLumpsumInvestmentAmount",
              'control-type':'text',
              'validation': 'required'

            }
          ],
          "description": `Hi 	<span style="color:red !important">${this.userName}</span> for World Tour after <span style="color:red !important">${this.goalsInputValue['enterNumberOfYears']}</span> years you would require ₹ <span style="color:red !important">${this.futureValueOfGoingOnWorldTour}</span> To fund the same, you need to start a monthly SIP of ₹<span style="color:red !important"> ${this.sipNoLumpsum}</span> over next <span style="color:red !important">${this.goalsInputValue['enterNumberOfYears']}</span>	years As you are investing 	₹<span style="color:red !important"> ${this.goalsInputValue['enterLumpsumInvestmentAmount']}</span>  	
          as lumpsum amount today, you can achieve your goal by starting a monthly SIP of 	₹ <span style="color:red !important">${this.sipWithLumpsum}</span> What's more, if you opt for the CSIP* facility, you can get a life insurance cover upto Rs. ₹ <span style="color:red !important">${this.lifeInsurance}</span> at no additional cost.`


        },
        {
          "type": "Follow Passion",
          "questions": [
            {
              "questionId": "1",
              "name": "What's the current cost of activity (passion) you want to pursue?",
              "variableName": "enterAmount",
              'control-type':'text',
              'validation': 'required'

            },
            {
              "questionId": "2",
              "name": "After how many years do you plan to pursue your passion?",
              "options": this.number,
              "variableName": "enterNumberOfYears",
              'control-type':'dropdown',
              'validation': 'required'

            },
            {
              "questionId": "3",
              "name": "Expected inflation (% p.a.)",
              "options": this.percent,
              "variableName": "expectedInflation",
              'control-type':'dropdown',
              'validation': 'required'
            },
            {
              "questionId": "4",
              "name": "Expected returns on investment (% p.a.)",
              "options": this.percent5,
              "variableName": "expectedReturnsOnInvestment",
              'control-type':'dropdown',
              'validation': 'required'

            },
            {
              "questionId": "5",
              "name": "What amount you can invest today as Lumspum?",
              "variableName": "enterLumpsumInvestmentAmount",
              'control-type':'text',
              'validation': 'required'

            }
          ],
          "description": `Hi 	<span style="color:red !important">${this.userName}</span>  for Starting Business after <span style="color:red !important">${this.goalsInputValue['enterNumberOfYears']}</span> years 	
          you would require ₹ <span style="color:red !important">${this.futureValueOfStartingBusiness}</span> To fund the same, you need to start a monthly SIP of ₹<span style="color:red !important"> ${this.sipNoLumpsum}</span> 	
          over next <span style="color:red !important">${this.goalsInputValue['enterNumberOfYears']}</span> years As you are investing <span style="color:red !important">${this.goalsInputValue['enterLumpsumInvestmentAmount']}</span> as lumpsum amount today, you can achieve your goal by starting a monthly SIP of 	₹<span style="color:red !important"> ${this.sipWithLumpsum}</span> 	
          What's more, if you opt for the CSIP* facility, you can get a life insurance cover of upto Rs. 	₹ <span style="color:red !important">${this.lifeInsurance}</span> at no additional cost.	`


        }, {
          "type": "Philanthropy",
          "questions": [
            {
              "questionId": "1",
              "name": "What amount you would liked to contribute today, if you were to donate today?	",
              "variableName": "enterAmount",
              'control-type':'text',
              'validation': 'required'

            },
            {
              "questionId": "2",
              "name": "After how many years do you plan to contribute for the donation?",
              "options": this.number,
              "variableName": "enterNumberOfYears",
              'control-type':'dropdown',
              'validation': 'required'

            },
            {
              "questionId": "3",
              "name": "Expected inflation (% p.a.)",
              "options": this.percent,
              "variableName": "expectedInflation",
              'control-type':'dropdown',
              'validation': 'required'

            },
            {
              "questionId": "4",
              "name": "Expected returns on investment (% p.a.)",
              "options": this.percent5,
              "variableName": "expectedReturnsOnInvestment",
              'control-type':'dropdown',
              'validation': 'required'
            },
            {
              "questionId": "5",
              "name": "What amount you can invest today as Lumspum?	",
              "variableName": "enterLumpsumInvestmentAmount",
              'control-type':'text',
              'validation': 'required'
            }
          ],
          "description": `Hi 	<span style="color:red !important">${this.userName}</span>  for Starting Business after <span style="color:red !important">${this.goalsInputValue['enterNumberOfYears']}</span> years 	
          you would require ₹ <span style="color:red !important">${this.futureValueOfStartingBusiness}</span> To fund the same, you need to start a monthly SIP of ₹<span style="color:red !important"> ${this.sipNoLumpsum}</span> 	
          over next <span style="color:red !important">${this.goalsInputValue['enterNumberOfYears']}</span> years As you are investing <span style="color:red !important">${this.goalsInputValue['enterLumpsumInvestmentAmount']}</span> as lumpsum amount today, you can achieve your goal by starting a monthly SIP of 	₹<span style="color:red !important"> ${this.sipWithLumpsum}</span> 	
          What's more, if you opt for the CSIP* facility, you can get a life insurance cover of upto Rs. 	₹ <span style="color:red !important">${this.lifeInsurance}</span> at no additional cost.	`


        },
        {
          "type": "Bike",
          "questions": [
            {
              "questionId": "1",
              "name": "What is the cost of Bike today?",
              "variableName": "enterAmount",
              'control-type':'text',
              'validation': 'required'

            },
            {
              "questionId": "2",
              "name": "After how many years do you plan to buy the bike?",
              "options": this.number,
              "variableName": "enterNumberOfYears",
              'control-type':'dropdown',
              'validation': 'required'
            },
            {
              "questionId": "3",
              "name": "Expected inflation (% p.a.)",
              "options": this.percent,
              "variableName": "expectedInflation",
              'control-type':'dropdown',
              'validation': 'required'
            },
            {
              "questionId": "4",
              "name": "Bike Loan funding (%)",
              "options": this.five,
              "variableName": "loanFunding",
              'control-type':'dropdown',
              'validation': 'required'
            },
            {
              "questionId": "5",
              "name": "Expected returns on your investment (% p.a.)",
              "options": this.percent5,
              "variableName": "expectedReturnsOnInvestment",
              'control-type':'dropdown',
              'validation': 'required'
            },
            {
              "questionId": "6",
              "name": "How much can you invest as lumpsum today?",
              "variableName": "enterLumpsumInvestmentAmount",
              'control-type':'text',
              'validation': 'required'
            }
          ],
          "description": `Hi 	<span style="color:red !important">${this.userName}</span> after <span style="color:red !important">${this.goalsInputValue['enterNumberOfYears']}</span> years the bike will cost you 	₹ <span style="color:red !important">${this.futureValueOfBike}</span> As you are funding 	20% of the down payment i.e. 	₹ <span style="color:red !important">${this.downPaymentAmount}</span> you would need to start a monthly SIP of 	₹ <span style="color:red !important">${this.sipNoLumpsum}</span> As you are investing 	₹ <span style="color:red !important">${this.goalsInputValue['enterLumpsumInvestmentAmount']}</span> as lumpsum amount today, you can achieve your goal by starting a monthly SIP of 	₹<span style="color:red !important"> ${this.sipWithLumpsum}</span> What's more, if you opt for the CSIP* facility, you can get a life insurance cover of upto 	₹<span style="color:red !important"> ${this.lifeInsurance}</span> If less than 50 lakh,at no additional cost.`


        },
        {
          "type": "Car",
          "questions": [
            {
              "questionId": "1",
              "name": "What is the cost of Car today?",
              "variableName": "enterAmount",
              'control-type':'text',
              'validation': 'required'
            },
            {
              "questionId": "2",
              "name": "After how many years do you plan to buy the car?",
              "options": this.number,
              "variableName": "enterNumberOfYears",
              'control-type':'dropdown',
              'validation': 'required'
            },
            {
              "questionId": "3",
              "name": "Expected inflation (% p.a.)",
              "options": this.percent,
              "variableName": "expectedInflation",
              'control-type':'dropdown',
              'validation': 'required'
            },
            {
              "questionId": "4",
              "name": "Car Loan funding (%)",
              "options": this.five,
              "variableName": "loanFunding",
              'control-type':'dropdown',
              'validation': 'required'
            },
            {
              "questionId": "5",
              "name": "Expected returns on your investment (% p.a.)",
              "options": this.percent5,
              "variableName": "expectedReturnsOnInvestment",
              'control-type':'text',
              'validation': 'required'
            },
            {
              "questionId": "6",
              "name": "How much can you invest as lumpsum today?",
              "variableName": "enterLumpsumInvestmentAmount",
              'control-type':'text',
              'validation': 'required'
            }
          ],
          "description": `Hi 	<span style="color:red !important">${this.userName}</span> after <span style="color:red !important">${this.goalsInputValue['enterNumberOfYears']}</span> years the bike will cost you 	₹ <span style="color:red !important">${this.futureValueOfBike}</span> As you are funding 	20% of the down payment i.e. 	₹ <span style="color:red !important">${this.downPaymentAmount}</span> you would need to start a monthly SIP of 	₹ <span style="color:red !important">${this.sipNoLumpsum}</span> As you are investing 	₹ <span style="color:red !important">${this.goalsInputValue['enterLumpsumInvestmentAmount']}</span> as lumpsum amount today, you can achieve your goal by starting a monthly SIP of 	₹<span style="color:red !important"> ${this.sipWithLumpsum}</span> What's more, if you opt for the CSIP* facility, you can get a life insurance cover of upto 	₹ 381,384 If less than 50 lakh,at no additional cost.`
        },
        {
          "type": "Dream Home",
          "questions": [
            {
              "questionId": "1",
              "name": "What is the cost of your dream home today?",
              "variableName": "enterAmount",
              'control-type':'text',
              'validation': 'required'
            },
            {
              "questionId": "2",
              "name": "After how many years do you plan to buy your dream home?",
              "options": this.number,
              "variableName": "enterNumberOfYears",
              'control-type':'dropdown',
              'validation': 'required'
            },
            {
              "questionId": "3",
              "name": "Expected inflation (% p.a.)",
              "options": this.percent,
              "variableName": "expectedInflation",
              'control-type':'dropdown',
              'validation': 'required'
            },
            {
              "questionId": "4",
              "name": "Dream Home Loan funding (%)",
              "options": this.five,
              "variableName": "loanFunding",
              'control-type':'dropdown',
              'validation': 'required'
            },
            {
              "questionId": "5",
              "name": "Expected returns on your investment (% p.a.)",
              "options": this.percent5,
              "variableName": "expectedReturnsOnInvestment",
              'control-type':'dropdown',
              'validation': 'required'
            },
            {
              "questionId": "6",
              "name": "How much can you invest as lumpsum today?",
              "variableName": "enterLumpsumInvestmentAmount",
              'control-type':'text',
              'validation': 'required'
            }
          ],
          "description": `Hi 	<span style="color:red !important">${this.userName}</span> after <span style="color:red !important">${this.goalsInputValue['enterNumberOfYears']}</span> years the bike will cost you 	₹ <span style="color:red !important">${this.futureValueOfBike}</span> As you are funding 	20% of the down payment i.e. 	₹ <span style="color:red !important">${this.downPaymentAmount}</span> you would need to start a monthly SIP of 	₹ <span style="color:red !important">${this.sipNoLumpsum}</span> As you are investing 	₹ <span style="color:red !important">${this.goalsInputValue['enterLumpsumInvestmentAmount']}</span> as lumpsum amount today, you can achieve your goal by starting a monthly SIP of 	₹<span style="color:red !important"> ${this.sipWithLumpsum}</span> What's more, if you opt for the CSIP* facility, you can get a life insurance cover of upto 	₹<span style="color:red !important"> ${this.lifeInsurance}</span> If less than 50 lakh,at no additional cost.`


        },
        {
          "type": "Childs Education",
          "questions": [
            {
              "questionId": "1",
              "name": "Enter your Child's name",
              "variableName": "enterChildName",
              'control-type':'text',
              'validation': 'required'
            },
            {
              "questionId": "2",
              "name": "After how many years does your child wants to go for higher education",
              "options": this.number,
              "variableName": "enterNumberOfYears",
              'control-type':'dropdown',
              'validation': 'required'
            },
            {
              "questionId": "3",
              "name": "Enter today's cost to fulfill your child's education",
              "variableName": "enterAmount",
              'control-type':'text',
              'validation': 'required'
            },
            {
              "questionId": "4",
              "name": "Expected inflation (% p.a.)",
              "options": this.percent,
              "variableName": "expectedInflation",
              'control-type':'dropdown',
              'validation': 'required'
            },
            {
              "questionId": "5",
              "name": "Expected returns on investment (% p.a.)",
              "options": this.percent5,
              "variableName": "expectedReturnsOnInvestment",
              'control-type':'dropdown',
              'validation': 'required'
            },
            {
              "questionId": "6",
              "name": "What amount you can invest today as Lumspum?",
              "variableName": "enterLumpsumInvestmentAmount",
              'control-type':'text',
              'validation': 'required'
            }
          ],

          "description": `Hi 	<span style="color:red !important">${this.userName}</span> for Abhay's Education after <span style="color:red !important">${this.goalsInputValue['enterNumberOfYears']}</span> years you would require	₹ <span style="color:red !important">${this.futureValueOfChildEducation}</span> To fund the same, you need to start a monthly SIP of	₹<span style="color:red !important"> ${this.sipNoLumpsum}</span> over next	<span style="color:red !important">${this.goalsInputValue['enterNumberOfYears']}</span>	years As you are investing	₹<span style="color:red !important"> ${this.goalsInputValue['enterLumpsumInvestmentAmount']}</span>	as lumpsum amount today, you can achieve your goal by starting a monthly SIP of	₹ <span style="color:red !important">${this.sipWithLumpsum}</span> What's more, if you opt for the CSIP* facility, you can get a life insurance cover of upto Rs.	₹ <span style="color:red !important">${this.lifeInsurance}</span> at no additional cost`
        }, {
          "type": "Childs Marriage",
          "questions": [
            {
              "questionId": "1",
              "name": "Enter your Child's name",
              "variableName": "enterChildName",
              'control-type':'text',
              'validation': 'required'
            },
            {
              "questionId": "2",
              "name": "Enter the age when your child might get married",
              "options": this.number,
              "variableName": "enterNumberOfYears",
              'control-type':'dropdown',
              'validation': 'required'
            },
            {
              "questionId": "3",
              "name": "Enter today's cost for your Child's marriage",
              "variableName": "enterAmount",
              'control-type':'text',
              'validation': 'required'
            },
            {
              "questionId": "4",
              "name": "Expected inflation (% p.a.)",
              "options": this.percent,
              "variableName": "expectedInflation",
              'control-type':'dropdown',
              'validation': 'required'
            },
            {
              "questionId": "5",
              "name": "Expected returns on investment (% p.a.)",
              "options": this.percent5,
              "variableName": "expectedReturnsOnInvestment",
              'control-type':'dropdown',
              'validation': 'required'
            },
            {
              "questionId": "6",
              "name": "What amount you can invest today as Lumspum?",
              "variableName": "enterLumpsumInvestmentAmount",
              'control-type':'text',
              'validation': 'required'

            }
          ],
          "description": `Hi 	<span style="color:red !important">${this.userName}</span> for Abhay's Marriage after <span style="color:red !important">${this.goalsInputValue['enterNumberOfYears']}</span> years you would require	₹ <span style="color:red !important">${this.futureValueOfChildEducation}</span> To fund the same, you need to start a monthly SIP of	₹<span style="color:red !important"> ${this.sipNoLumpsum}</span> over next	<span style="color:red !important">${this.goalsInputValue['enterNumberOfYears']}</span>	years As you are investing	₹<span style="color:red !important"> ${this.goalsInputValue['enterLumpsumInvestmentAmount']}</span>	as lumpsum amount today, you can achieve your goal by starting a monthly SIP of	₹ <span style="color:red !important">${this.sipWithLumpsum}</span> What's more, if you opt for the CSIP* facility, you can get a life insurance cover of upto Rs.	₹ <span style="color:red !important">${this.lifeInsurance}</span>  at no additional cost`


        },
        {
          "type": "Retirement",
          "questions": [
            {
              "questionId": "1",
              "name": "What's your current age?",
              "variableName": "currentAge",
              'control-type':'text',
              'validation': 'required'
            },
            {
              "questionId": "2",
              "name": "At what age you plan to retire?",
              "options": this.age,
              "variableName": "enterRetirementAge",
              'control-type':'dropdown',
              'validation': 'required'
            },
            {
              "questionId": "3",
              "name": "What are your current annual expenses?",
              "variableName": "enterAmount",
              'control-type':'text',
              'validation': 'required'
            },
            {
              "questionId": "4",
              "name": "What is the expected rate of inflation? (Before Retirement)",
              "options": this.percent,
              "variableName": "expectedInflationBeforeRetiremnet",
              'control-type':'dropdown',
              'validation': 'required'
            },
            {
              "questionId": "5",
              "name": "What is the expected rate of return? (Before Retirement)",
              "options": this.percent5,
              "variableName": "rateOfReturnBeforeRetirement",
              'control-type':'dropdown',
              'validation': 'required'

            },
            {
              "questionId": "6",
              "name": "What is the expected rate of return on your retirement saving? (Post Retirement)",
              "options": this.percent5,
              "variableName": "rateOfReturnPostRetirement",
              'control-type':'dropdown',
              'validation': 'required'
            },
            {
              "questionId": "7",
              "name": "How much can you invest as lumpsum today for your retirement?",
              "variableName": "enterLumpsumInvestmentAmount",
              'control-type':'text',
              'validation': 'required'
            }
          ],
          "description": `Hi <span style="color:red !important">${this.userName}</span>, after <span style="color:red !important">${(this.goalsInputValue['enterRetirementAge'] - this.goalsInputValue['currentAge'])}</span> years (as you retire), your current annual expenses of ₹ <span style="color:red !important">${this.goalsInputValue['enterAmount']}</span> would swell to ₹ <span style="color:red !important">${this.futureValueOfExpensesInRetirementAge}</span>. To maintain the same lifestyle post retirement, you would need a retirement savings of ₹ <span style="color:red !important">${this.corpusAmount}</span>. If you invest ₹ <span style="color:red !important">${this.goalsInputValue['enterLumpsumInvestmentAmount']}</span> lumpsum today for your retirement, you would need to start a monthly SIP of ₹<span style="color:red !important"> ${this.sipWithLumpsum}</span> and continue till you turn <span style="color:red !important">${this.goalsInputValue['currentAge']}</span> . What's more, if you opt for the CSIP* facility, you can get a life insurance cover of upto Rs. <span style="color:red !important">${this.lifeInsurance}</span>  at no additional cost.`


        },
        {
          "type": "customGoal",
          "questions": [
            {
              "questionId": "1",
              "name": "What's your Goal?",
              "variableName": "goalName",
              'control-type':'text',
              'validation': 'required'
            },
            {
              "questionId": "2",
              "name": "What's the cost to fund your goal today?",
              "variableName": "enterAmount",
              'control-type':'text',
              'validation': 'required'
            },
            {
              "questionId": "3",
              "name": "After how many years do you wish to achieve this goal?",
              "options": this.number,
              "variableName": "enterNumberOfYears",
              'control-type':'dropdown',
              'validation': 'required'
            },
            {

              "questionId": "4",
              "name": "What is the expected inflation?",
              "options": this.percent,
              "variableName": "expectedInflation",
              'control-type':'dropdown',
              'validation': 'required'
            },
            {
              "questionId": "5",
              "name": "Expected returns on investment (% p.a.)",
              "options": this.percent5,
              "variableName": "expectedReturnsOnInvestment",
              'control-type':'dropdown',
              'validation': 'required'
            },
            {
              "questionId": "6",
              "name": "Would you like to invest lumpsum amount for your Goal",
              "variableName": "enterLumpsumInvestmentAmount",
              'control-type':'text',
              'validation': 'required'
            }
          ],
          "description": `Hi 	<span style="color:red !important">${this.userName}</span>  for Self Development after <span style="color:red !important">${this.goalsInputValue['enterNumberOfYears']}</span> years 	
          you would require ₹ <span style="color:red !important">${this.futureValueOfSelfDevelopmentGoal}</span> To fund the same, you need to start a monthly SIP of ₹<span style="color:red !important"> ${this.sipNoLumpsum}</span> 	
          over next <span style="color:red !important">${this.goalsInputValue['enterNumberOfYears']}</span> years As you are investing <span style="color:red !important">${this.goalsInputValue['enterLumpsumInvestmentAmount']}</span> as lumpsum amount today, you can achieve your goal by starting a monthly SIP of 	₹<span style="color:red !important"> ${this.sipWithLumpsum}</span> 	
          What's more, if you opt for the CSIP* facility, you can get a life insurance cover of upto Rs. 	₹ <span style="color:red !important">${this.lifeInsurance}</span>  at no additional cost.	`,

        }
      ]

      if (res[0].goals) {
        this.onGoalClick(res[0].goals, 0);
      }
      this.goalInputValueJson = {};
      // this.goalQuestion.forEach(items=>{
      //   if(items.type == this.data)

      //   for(let i=0;i<items.questions.length;i++)
      //   this.getSelectedGoals=items.questions[i].variableName
      // })
      this.goalQuestion[0].questions.forEach(async goal => {
        this.goalInputValueJson[goal.variableName] = '';
      });
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
  Replan() {
    this.router.navigateByUrl("");
    localStorage.removeItem('id');
  }

  goalTypes = ["Self Development", "Starting Business", "Bike", "Marriage", "Honeymoon", "Wealth Creation", "Holiday",
              "Car", "Childs Education", "Childs Marriage", "Follow Passion", "World Tour", "Dream Home", "Retirement", 
              "Philanthropy"];

  setImages(){
    this.images = [];
    let goalsLength = this.selectGoal.length;
    for(let i = 0; i < goalsLength; i++){
      let currentGoalName = this.selectGoal[i].goals;
      if(this.goalTypes.includes(currentGoalName)){
        let imgUrl = `../../assets/img/${currentGoalName}.png`;
        this.images.push(imgUrl);
      }else{
        let customImgUrl = `../../assets/img/AddOtherGoal.png`;
        this.images.push(customImgUrl);
      }
      
    }
  }

  ques: any;
  onGoalClick(data, index) {
    // console.log("=>", this.img);
    this.setImages();
    if(this.goalTypes.includes(data)){
      let selectedGoalImgUrl = `../../assets/img/${data}color.png`;
      this.images[index] = selectedGoalImgUrl;
    }else{
      let customColorImg = `../../assets/img/AddOtherGoalcolor.png`
      this.images[index] = customColorImg;
    }
    
    // this.Image = `../../assets/img/${data}color.png`;
    this.goalsInputValue = [];
    this.goalInputValueJson = {};
    this.ques = this.goalQuestion.find((res) => res.type === data);
    console.log("this.ques is -->> ", this.ques);
    if(this.ques == undefined){
      this.ques = this.goalQuestion.find((res) => res.type === "customGoal");
    }
    console.log(this.ques);
    this.description = this.ques.description;
    this.questions = this.ques.questions;
    this.singleSelectedQuestion = data;
    console.log("this is the value of data variable", data);
    this.goalQuestion.forEach(async goal => {
      if (goal.type == this.singleSelectedQuestion) {                               //data= bike    (assume we clicked on bike goals)

        console.log("data",this.singleSelectedQuestion);
        goal.questions.forEach(async goalQuestion => {
          this.goalInputValueJson[goalQuestion.variableName] = ""
        })
      }
    })

    console.log(this.goalInputValueJson)
  }

  //Fetching input values from dropdown
  optionSelect(goalInputField, inputValue) {
    console.log("Input values from dropdown", goalInputField, inputValue);
    //call method to insert value
    this.goalInputValueInsert(goalInputField, parseInt(inputValue));
  }  // this.answers.push();

  //Fetching input values from input text box
  inputChanged(goalInputField, inputValue) {
    console.log("Input values from input text box", goalInputField, inputValue);
    //call method to insert value
    this.goalInputValueInsert(goalInputField, inputValue);

  }

  //Inserting input Values from input text box and dropdown
  goalInputValueInsert(goalInputField, inputValue) {
    // this.goalsInputValue[goalInputField] = inputValue;   //Previous

    this.goalInputValueJson[goalInputField] = inputValue; //New


    //  this.goalsInputValue[goalInputField];

    console.log("This is the i/p field", goalInputField);





    console.log(this.goalsInputValue);
    // console.log(this.goalsInputValue['enterAmount']);
    // console.log(this.goalsInputValue['expectedInflation']);
    // console.log(this.goalsInputValue['enterNumberOfYears'])

    // //For Calculation
    // this.calculationMethod();


  }

  errMsg: string;
  calculateFunction() {

    //For Calculation
    this.calculationMethod();

    

    console.log("data",this.data);


    console.log("Json i/p value", this.goalInputValueJson)

    this.futureValueOfSelfDevelopmentGoal = 1000
    console.log(this.futureValueOfSelfDevelopmentGoal)
    console.log(this.goalQuestion);
    
    // if(this.goalsInputValue['enterAmount'] == ""){
    //   return console.log('required')
    // }
    console.log(this.goalInputValueJson)
    Object.keys(this.goalInputValueJson).forEach(i => {
      console.log(this.goalsInputValue[i])
      if (this.goalInputValueJson[i].length == 0) {
        this.errMsg = `${i} is required!`
        alert(this.errMsg);
      }
      else if (i == 'enterAmount' || i == '') {
        if (!parseInt(this.goalsInputValue[i])) {
          this.errMsg = `${i} should be a number!!`
          alert(this.errMsg);
        }
        else {
          if (this.goalsInputValue[i] % 1000 > 0) {
            this.errMsg = `${i} should be multiple of 1000s`
            alert(this.errMsg);
          }
        }
      }
      // else {

      // }
    })
    // let questions = this.ques.questions;
    // let questionsLength = questions.length;
    // for(let i = 0; i < questionsLength; i++){
    //   let currentQuestion = questions[i];
    //   if(currentQuestion.variableName){
    //     if(!this.goalsInputValue[currentQuestion.variableName]){

    //       return console.log(`Value of <span style="color:red !important">${currentQuestion.name} is not present.`)
    //     }
    //     else if(this.goalsInputValue[currentQuestion.variableName] == '' || this.goalsInputValue[currentQuestion.variableName] == 0 
    //       || this.goalsInputValue[currentQuestion.variableName] == undefined){
    //         return console.log(`Invalid value for <span style="color:red !important">${currentQuestion.name}.`)
    //     }
    //   }
    // }

    // console.log("Keys are ", keys);
    // var length = keys.length
    // for(let i=0; i< length; i++){
    //   var key = keys[i];
    //   if(!this.goalsInputValue[key]){
    //     return console.log(`Value of <span style="color:red !important">${key} is not present.`)
    //   }
    // }

  }

  calculationMethod() {

    console.log(this.goalsInputValue);


    if (this.singleSelectedQuestion === "Self Development") {
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

    }

    if (this.singleSelectedQuestion === "Starting Business") {
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
    }

    if (this.singleSelectedQuestion === "Marriage") {

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
    }


    if (this.singleSelectedQuestion === "Honeymoon") {
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
    }

    if (this.singleSelectedQuestion === "Wealth Creation") {
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
    }

    if (this.singleSelectedQuestion === "Holiday") {

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
    }

    if (this.singleSelectedQuestion === "World Tour") {

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
    }

    if (this.singleSelectedQuestion === "Follow Passion") {

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
    }

    if (this.singleSelectedQuestion === "Philanthropy") {

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
    }

    if (this.singleSelectedQuestion === "Bike") {

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
    }

    if (this.singleSelectedQuestion === "Car") {

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
    }

    if (this.singleSelectedQuestion === "Dream Home") {

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
    }

    if (this.singleSelectedQuestion === "Childs Education") {

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
    }

    if (this.singleSelectedQuestion === "Childs Marriage") {

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
    }

    if (this.singleSelectedQuestion === "Retirement") {

      // Calculating future Value Of Starting Business
      this.futureValueOfExpensesInRetirementAge = Math.round(this.futureValue(this.goalInputValueJson['expectedInflationBeforeRetirement'], this.goalInputValueJson['currentAge'] - (this.goalInputValueJson['enterRetirementAge'] - this.goalInputValueJson['currentAge']), this.goalInputValueJson['enterAmount']))
      console.log("This is calculation for Retirement", this.futureValueOfExpensesInRetirementAge);

      //Calculating Corpus Required to Fund Retirement Expenses
      this.corpusAmount = Math.round(this.findCorpusAmount(this.futureValueOfExpensesInRetirementAge, this.goalInputValueJson['rateOfReturnPostRetirement']));
      console.log(this.corpusAmount)
      // Calculating SIP (considering no lumpsum amount is invested today)
      // this.sipNoLumpsum=Math.round(this.PMT(this.goalInputValueJson['expectedReturnsOnInvestment']/12, 25*12, 0,this.corpusAmount , 1));
      // console.log("This is calculation for sip with no lumpsum",this.sipNoLumpsum);
      this.sipNoLumpsum = Math.round(this.PMT(this.goalInputValueJson['rateOfReturnBeforeRetirement'] / 12, (this.goalInputValueJson['enterRetirementAge'] - this.goalInputValueJson['currentAge']) * 12, 0, this.corpusAmount, 1));
      console.log("This is calculation for sip with no lumpsum", this.sipNoLumpsum);

      // // Calculating SIP (considering  lumpsum amount is invested today)
      this.sipWithLumpsum = Math.round(-this.PMT(this.goalInputValueJson['expectedReturnsOnInvestment'] / 12, this.goalInputValueJson['enterNumberOfYears'], -this.goalInputValueJson['enterLumpsumInvestmentAmount'], this.futureValueOfExpensesInRetirementAge, 1));
      console.log("This is calculation for sip with lumpsum", this.sipWithLumpsum);

      //Displaying calculation for life insurance cover 
      (this.sipWithLumpsum * 100) < 5000000 ? this.lifeInsurance = this.sipWithLumpsum * 100 : this.lifeInsurance = 5000000;
      console.log("This is the calculation for life insurance cover", this.lifeInsurance)
    }

    if (this.singleSelectedQuestion === "AddOtherGoal") {

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

  // PMT(ROI, numberOfYears, FV, type, enterLumpsumInvestmentAmount?, PV?){
  //   var PMT:number=9999;
  //   return PMT;
  // }

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
    rateOfReturnPostRetirement = parseInt(rateOfReturnPostRetirement);

    let corpusAmount = futureValueOfExpensesInRetirementAge / rateOfReturnPostRetirement;
    return corpusAmount;
  }
}










