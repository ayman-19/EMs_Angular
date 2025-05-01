import { Routes } from '@angular/router';
import { EmployeesComponent } from './Pages/employees/employees.component';

export const routes: Routes = [{path:'',redirectTo:'employees', pathMatch:'full'}, {path:'employees', title:'employees', component:EmployeesComponent}];
