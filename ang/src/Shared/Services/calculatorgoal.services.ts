import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Icalculatorgoal } from '../Interfaces(Structure)/calculatorgoal';
import { Igoal } from '../Interfaces(Structure)/goal';
import { Location } from '@angular/common';
import {Router} from '@angular/router';

@Injectable({providedIn:'root'})

export class AdityaBirlaServices{
    public url="http://localhost:8000/";
    
    // public url="https://f17ce88c.ngrok.io/"
    
    public setselectedgoals:any;
    public headers:HttpHeaders;
    constructor( private http:HttpClient, private location: Location, private router : Router ){
        this.headers = new HttpHeaders({
            'Content-Type':'application/json'
        });

        // this.location.subscribe(x => {
        // console.log("this is location",x);
        // if(x.url === "/termgoals" && x.pop === true){
        //     console.log("@@@@@@@@@@@@@@@@@@@inside if");
        //     return this.router.navigate(["/calculatorgoal"]);
        // } 
        // });
    }

    postUserDetails(data):Observable<Icalculatorgoal>{
        console.log(this.url,data);
        console.log("postCalculatorgoal method executed")
        return this.http.post<Icalculatorgoal>(`${this.url}details`,data,{headers:this.headers});
    }

    postGoalData(data):Observable<Igoal[]>{
        // console.log("=>",this.url+routename+localStorage.getItem('id'),data);
        return this.http.post<Igoal[]>(`${this.url}usergoals`,data,{headers:this.headers});
    }

    addCustomGoal(goalName){
        return this.http.post<Icalculatorgoal>(`${this.url}addCustomGoal`,{goalName: goalName},{headers:this.headers});
    }

    getdata(id){
        console.log("route",`${this.url}/getusergoal/${id}`);
        return this.http.get(`${this.url}getusergoal/${id}`);  
    }
    
    setSelectedGoal(goals){
        this.setselectedgoals = goals;
        console.log("goals",goals);
    }

    getSelecetdGoal(){
        return this.setselectedgoals;
    }

    postInputValuesAndResultOfGoals(data){
        // console.log("=>",this.url+routename+localStorage.getItem('id'),/*data*/);
        return this.http.post(this.url+'goalsanswer', data, {headers:this.headers});
    }

    getAnswer(id){
        return this.http.get(`${this.url}getanswers/${id}`)
    }    
}