import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Icalculatorgoal } from '../Interfaces(Structure)/calculatorgoal';
import { Igoal } from '../Interfaces(Structure)/goal';

@Injectable({providedIn:'root'})

export class AdityaBirlaServices{
    public url=" http://localhost:3000/";
    public setselectedgoals:any;
    public headers:HttpHeaders;
    constructor( private http:HttpClient ){
        this.headers = new HttpHeaders({
            'Content-Type':'application/json'
        });
    }

    postUserDetails(routename,data):Observable<Icalculatorgoal>{
        console.log(this.url+routename,data);
        console.log("postCalculatorgoal method executed")
        return this.http.post<Icalculatorgoal>(this.url+routename,data,{headers:this.headers});
    }

    postGoalData(routename,data):Observable<Igoal[]>{
        console.log("=>",this.url+routename+localStorage.getItem('id'),data);
        return this.http.post<Igoal[]>(this.url+routename,data,{headers:this.headers});
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

    postInputValuesAndResultOfGoals(routename,/*data*/){
        // console.log("=>",this.url+routename+localStorage.getItem('id'),/*data*/);
        return this.http.post(this.url+routename,{headers:this.headers});
    }

    getAnswer(id){
        return this.http.get(`${this.url}getanswers/${id}`)
    }    
    
}