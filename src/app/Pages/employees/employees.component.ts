import { Component, inject } from '@angular/core';
import { EmployeeServiceService } from '../../Core/Services/employee-service.service';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss'
})
export class EmployeesComponent {
private readonly _services = inject(EmployeeServiceService);
ngOnInit(): void {
  //this._services
}
}
