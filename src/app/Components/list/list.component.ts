import { Component, inject } from '@angular/core';
import { EmployeeServiceService } from '../../Core/Services/employee-service.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';
import { EditEmployeeComponent } from '../edit-employee/edit-employee.component';
import { Employee } from "../../Core/Interfaces/employee";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    CommonModule,
    EmployeeFormComponent, 
    EditEmployeeComponent, 
    FormsModule, 
    ReactiveFormsModule
],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  employees: Employee[] = [];
  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 0;
  filterEmployee: Employee[] = [];
  searhTerm: string = '';
  private _router = inject(Router);
  editModalVisible = false;

  constructor(private service: EmployeeServiceService) {
    this.loadEmployees(this.currentPage);
  }


  loadEmployees(page: number): void {
    const requestParams = {
      page,
      pageSize: this.pageSize,
      id: 0
    };
    

    this.service.getAll(requestParams).subscribe({
      next: (res) => {
        this.employees = res.result.employees;
        this.filterEmployee =  this.employees;
        this.currentPage = res.result.page;
        this.pageSize = res.result.pageSize;
        this.totalPages = res.result.totalPage;
      },
      error: (err) => console.error('Failed to load employees', err)
    });
  }

  onSearch() {
    const term = this.searhTerm.toLowerCase();
    this.filterEmployee = this.employees.filter(emp =>
      emp.firstName.toLowerCase().includes(term) || emp.lastName.toLowerCase().includes(term)
    );
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.loadEmployees(page);
    }
  }

  openEditForm(employee: Employee): void {
    this._router.navigate(['employees/update', employee])
  }

  openAddForm(): void {
    this._router.navigate(['employees/add'])
  }
  closeEditModal(): void {
    this.editModalVisible = false;  // Close the modal
  }
  isLoad: boolean = false;

  openDelete(id: number) {
    Swal.fire({
      title: "Do you want to delete?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel"
    }).then((result) => {
      if (result.isConfirmed) {
        this.isLoad = true;
        this.service.delete(id).subscribe({
          next: () => {
            this.isLoad = false;
            Swal.fire("Deleted!", "", "success");
            this.loadEmployees(this.currentPage);
          },
          error: (error) => {
            this.isLoad = false;
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: error.error.message,
            });
          }
        });
      } else {
        Swal.fire("Deletion cancelled", "", "info");
      }
    });
  }

  loadEmployeesAfterUpdate(): void {
    this.loadEmployees(this.currentPage); 
  }
}
