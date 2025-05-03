import { Component, inject } from '@angular/core';
import { EmployeeServiceService } from '../../Core/Services/employee-service.service';
import { EmployeeFormComponent } from "../../Components/employee-form/employee-form.component";
import { ListComponent } from "../../Components/list/list.component";
import { EditEmployeeComponent } from "../../Components/edit-employee/edit-employee.component";

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [EmployeeFormComponent, ListComponent],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss'
})
export class EmployeesComponent {
private readonly _services = inject(EmployeeServiceService);
ngOnInit(): void {
  //this._services
}
}
