import { Component, Input } from '@angular/core';
import { EmployeeServiceService } from '../../Core/Services/employee-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delete-employee',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-employee.component.html',
  styleUrl: './delete-employee.component.scss'
})
export class DeleteEmployeeComponent {
  @Input() employeeId!: number;
  constructor(
    private service: EmployeeServiceService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.employeeId = Number(this.route.snapshot.paramMap.get('id'));
  }

  confirmDelete(): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.service.delete(this.employeeId).subscribe({
        next: () => {
          alert('Employee deleted successfully.');
          this.router.navigate(['/employees']);
        },
        error: () => {
          alert('Failed to delete employee.');
        }
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/employees']);
  }
}