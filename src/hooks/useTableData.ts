import { useState, useEffect, useMemo } from 'react';
import { tableData } from '../config/tableData';
import { TableData, SortConfig, FilterConfig } from '../types/table';

export function useTableData() {
  const [data, setData] = useState<TableData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: 'name',
    direction: 'asc'
  });
  const [filters, setFilters] = useState<FilterConfig>({});

  useEffect(() => {
    // Simulate API call
    const loadData = () => {
      setTimeout(() => {
        setData(tableData);
        setIsLoading(false);
      }, 1000);
    };
    loadData();
  }, []);

  const handleSort = (key: string) => {
    setSortConfig((current) => ({
      key,
      direction:
        current.key === key && current.direction === 'asc' ? 'desc' : 'asc',
    }));

    setData((current) =>
      [...current].sort((a: any, b: any) => {
        if (sortConfig.direction === 'asc') {
          return a[key] > b[key] ? 1 : -1;
        }
        return a[key] < b[key] ? 1 : -1;
      })
    );
  };

  const updateRecord = (updatedRecord: TableData) => {
    setData(current =>
      current.map(record =>
        record.id === updatedRecord.id ? updatedRecord : record
      )
    );
  };

  const handleFilter = (newFilters: FilterConfig) => {
    setFilters(newFilters);
  };

  const filteredData = useMemo(() => {
    return data.filter(item => {
      const nameMatch = !filters.name || 
        item.name.toLowerCase().includes(filters.name.toLowerCase());
      
      const positionMatch = !filters.position || 
        item.position.toLowerCase().includes(filters.position.toLowerCase());
      
      const locationMatch = !filters.location || 
        item.location.toLowerCase().includes(filters.location.toLowerCase());
      
      const salaryMatch = !filters.salaryRange || (
        (!filters.salaryRange.min || item.salary >= filters.salaryRange.min) &&
        (!filters.salaryRange.max || item.salary <= filters.salaryRange.max)
      );

      return nameMatch && positionMatch && locationMatch && salaryMatch;
    });
  }, [data, filters]);

  return { 
    data: filteredData, 
    isLoading, 
    sortConfig, 
    filters,
    handleSort, 
    updateRecord,
    handleFilter
  };
}