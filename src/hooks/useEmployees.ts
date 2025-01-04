import { useState, useCallback } from 'react';
import { Employee, EmployeeFormData } from '../types/employee';
import { generateInitialEmployees } from '../utils/employeesData';

export function useEmployees() {
  const [employees, setEmployees] = useState<Employee[]>(generateInitialEmployees());

  const addEmployee = useCallback((data: EmployeeFormData) => {
    const newEmployee: Employee = {
      id: crypto.randomUUID(),
      ...data
    };
    setEmployees(prev => [...prev, newEmployee]);
    return newEmployee;
  }, []);

  const updateEmployee = useCallback((id: string, data: EmployeeFormData) => {
    setEmployees(prev => 
      prev.map(employee => 
        employee.id === id ? { ...employee, ...data } : employee
      )
    );
  }, []);

  const deleteEmployee = useCallback((id: string) => {
    setEmployees(prev => prev.filter(employee => employee.id !== id));
  }, []);

  return {
    employees,
    addEmployee,
    updateEmployee,
    deleteEmployee
  };
}
