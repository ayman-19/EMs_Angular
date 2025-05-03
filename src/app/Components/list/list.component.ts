
import { Component, inject } from '@angular/core';
import { EmployeeServiceService } from '../../Core/Services/employee-service.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';
import { EditEmployeeComponent } from '../edit-employee/edit-employee.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    CommonModule,
    EmployeeFormComponent, EditEmployeeComponent
],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  employees: any[] = [];
  selectedEmployeeId: number = 0;
  private _router = inject(Router);
  //selectedEmployeeId: number | null = null; 
  editModalVisible = false;

  constructor(private service: EmployeeServiceService) {
    this.loadEmployees();
  }

  loadEmployees(): void {
    const requestParams = {
      page: 1,
      pageSize: 10,
      id: 0
    };

    this.service.getAll(requestParams).subscribe({
      next: (data) => this.employees = data,
      error: (err) => console.error('Failed to load employees', err)
    });
  }

  openEditForm(employeeId: number): void {
    this._router.navigate(['employees/update', employeeId])
  }

  openAddForm(): void {
    this._router.navigate(['employees/add'])
  }
  closeEditModal(): void {
    this.editModalVisible = false;  // Close the modal
  }

  loadEmployeesAfterUpdate(): void {
    this.loadEmployees();  // Reload the employees after the update
  }
}
