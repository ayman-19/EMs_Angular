import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { EmployeeServiceService } from '../../Core/Services/employee-service.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule,  RouterLinkActive, CommonModule ],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.scss'
})
export class EmployeeFormComponent {
  public errorMessage: string = '';
  private readonly _service=inject(EmployeeServiceService);
  private readonly _Router=inject(Router);
  employeeForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.employeeForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      position: ['', Validators.required]
    });
  }

  
  addEmployee(): void {
    if (this.employeeForm.valid) {
      this._service.add(this.employeeForm.value).subscribe(
        (response) => {
        
          this._Router.navigate(['/employees']);
        },
         (error) => {
          if (error.error && error.error.message) {
            this.errorMessage = error.error.message;
          } else {
            this.errorMessage = 'An unexpected error occurred.';
          }
        }
      );
    }
  }
}
