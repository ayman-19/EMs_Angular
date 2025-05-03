import { Employee } from "./employee";

export interface PaginatedEmployeeResponse {
    success: boolean;
    statusCode: number;
    message: string;
    result: {
      page: number;
      pageSize: number;
      totalPage: number;
      employees: Employee[];
    };
  }