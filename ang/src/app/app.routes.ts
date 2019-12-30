import {Route} from '@angular/router';
import { CalculatorgoalComponent } from './calculatorgoal/calculatorgoal.component';
import { AdityabirlaComponent } from './adityabirla/adityabirla.component';
import { SelectgoalsComponent } from './selectgoals/selectgoals.component';
import { GoalsComponent } from './goals/goals.component';
import { TermgoalsComponent } from './termgoals/termgoals.component';
import { GoalsGuard } from './goals.guard';


export const routes : Route[] = [
{
    path:"",
    component:AdityabirlaComponent,
  
},
{
    path : 'calculatorgoal',
    component: CalculatorgoalComponent
},
{
    path:'selectgoals',
    component:SelectgoalsComponent
},
{
    path:'goals',
    component: GoalsComponent , canActivate : [GoalsGuard]
    // data : {getData :'goals'}
   
},
{
    path:'goal',
    component: GoalsComponent
   
},
{
    path: 'termgoals',
    component: TermgoalsComponent
}]