export interface Employee {
  id: number;
  name: string;
  position: string;
  location: string;
  salary: number;
}

export interface EmployeeFormData extends Omit<Employee, 'id'> {}