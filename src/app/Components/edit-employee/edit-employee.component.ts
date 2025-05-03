import { CommonModule } from "@angular/common";
import { Component, inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { EmployeeServiceService } from "../../Core/Services/employee-service.service";
import { Employee } from "../../Core/Interfaces/employee";

@Component({
  selector: 'app-edit-department',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,FormsModule],
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss']
})
export class EditEmployeeComponent implements OnInit {
 
  private readonly _Router=inject(Router);
  private readonly _ActivatedRoute=inject(ActivatedRoute)

  employeeForm!: FormGroup;
  employeeId!: number;
  private readonly _service=inject(EmployeeServiceService);
  isloading:boolean=false;

    constructor(private fb: FormBuilder, private route: ActivatedRoute){
      this.employeeId = +this._ActivatedRoute.snapshot.paramMap.get('id')!;
    }


     ngOnInit(): void {
      this.GetDetails();
     }
     GetDetails(){
      this.employeeForm = this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        position: ['', Validators.required],
      });

      this.employeeId = +this.route.snapshot.paramMap.get('id')!; // Assuming the ID is passed in the URL
    // Fetch the employee data and populate the form
    this._service.getById(this.employeeId).subscribe({
      next: (employee: Employee) => {
        // Use patchValue to map the fetched data to the form
        this.employeeForm.patchValue({
          firstName: employee.firstName,
          lastName: employee.lastName,
          email: employee.email,
          position: employee.position
        });
      },
      error: (err) => {
        console.error('Failed to fetch employee data', err);
      }
    });
     }
     updateEmployee(): void {
      this.employeeForm.value.id = this.employeeId;
      if (this.employeeForm.valid) {
        this.isloading = true;
        this._service.update(this.employeeForm.value).subscribe(
          (response) => {
            this.isloading = false;
          
            this._Router.navigate(['/employees']);
          },
          (error) => {
            this.isloading = false;
            
          }
        );
      }
    }
}

