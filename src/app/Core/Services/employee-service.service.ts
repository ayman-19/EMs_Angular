import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../Interfaces/employee';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {
  private apiUrl = 'https://localhost:7215/employees'; 

  constructor(private http: HttpClient) {}

  // Get all employees
  getAll(params: { page: number; pageSize: number; id: number }): Observable<Employee[]> {
    return this.http.post<any>(`${this.apiUrl}/paginate`, params).pipe(
      map(response => response.result as Employee[]) );
  }

  // Add new employee
  add(employee: Omit<Employee, 'id'>): Observable<Employee> {
    return this.http.post<Employee>(`${this.apiUrl}/add`, employee);
  }

  // Update existing employee
  update(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiUrl}/update`, employee);
  }

  // Delete employee
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

  getById(id: number): Observable<Employee> {
    return this.http.get<any>(`${this.apiUrl}/getById/${id}`).pipe(
      map(response => response.result)  // Assuming 'result' contains the actual employee data
    );
  }
}
