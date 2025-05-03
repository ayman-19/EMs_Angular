import { Routes } from '@angular/router';
import { EmployeeFormComponent } from './Components/employee-form/employee-form.component';
import { ListComponent } from './Components/list/list.component';
import { DeleteEmployeeComponent } from './Components/delete-employee/delete-employee.component';
import { EditEmployeeComponent } from './Components/edit-employee/edit-employee.component';

export const routes: Routes = [
  {path:'',redirectTo:'employees', pathMatch:'full'}, 
  {path:'employees', component:ListComponent},
  {path:'employees/add', component:EmployeeFormComponent},
  {path: 'employees/delete/:id', component: DeleteEmployeeComponent},
  {path: 'employees/add', component: EmployeeFormComponent},
  {path: 'employees/update', component: EditEmployeeComponent}
];
