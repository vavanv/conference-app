export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  position: string;
  location: string;
  status: 'active' | 'inactive';
}

export interface EmployeeFormData extends Omit<Employee, 'id'> {}