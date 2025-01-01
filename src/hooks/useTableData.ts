import { useState, useEffect } from 'react';
import { tableData } from '../config/tableData';
import { TableData, SortConfig } from '../types/table';

export function useTableData() {
  const [data, setData] = useState<TableData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: 'name',
    direction: 'asc'
  });

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

  return { data, isLoading, sortConfig, handleSort, updateRecord };
}