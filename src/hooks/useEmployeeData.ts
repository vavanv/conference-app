import { useState, useEffect, useCallback } from 'react';
import { tableData } from '../config/tableData';
import { Employee } from '../types/employee';
import { FilterConfig } from '../types/filters';

export function useEmployeeData() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<FilterConfig>({});

  useEffect(() => {
    const loadData = () => {
      setTimeout(() => {
        setEmployees(tableData);
        setIsLoading(false);
      }, 1000);
    };
    loadData();
  }, []);

  const addEmployee = useCallback((data: Omit<Employee, 'id'>) => {
    const newEmployee: Employee = {
      id: Date.now(),
      ...data
    };
    setEmployees(prev => [newEmployee, ...prev]);
    return newEmployee;
  }, []);

  const updateEmployee = useCallback((id: number, data: Omit<Employee, 'id'>) => {
    setEmployees(prev => 
      prev.map(employee => 
        employee.id === id ? { ...employee, ...data } : employee
      )
    );
  }, []);

  const deleteEmployee = useCallback((id: number) => {
    setEmployees(prev => prev.filter(employee => employee.id !== id));
  }, []);

  const handleFilter = useCallback((newFilters: FilterConfig) => {
    setFilters(newFilters);
  }, []);

  const filteredEmployees = employees.filter(employee => {
    const nameMatch = !filters.name || 
      employee.name.toLowerCase().includes(filters.name.toLowerCase());
    
    const positionMatch = !filters.position || 
      employee.position.toLowerCase().includes(filters.position.toLowerCase());
    
    const locationMatch = !filters.location || 
      employee.location.toLowerCase().includes(filters.location.toLowerCase());
    
    const salaryMatch = !filters.salaryRange || (
      (!filters.salaryRange.min || employee.salary >= filters.salaryRange.min) &&
      (!filters.salaryRange.max || employee.salary <= filters.salaryRange.max)
    );

    return nameMatch && positionMatch && locationMatch && salaryMatch;
  });

  return {
    employees: filteredEmployees,
    isLoading,
    filters,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    handleFilter
  };
}
