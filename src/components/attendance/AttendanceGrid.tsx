import { useState } from "react";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Attendance, AttendanceFormData } from "../../types/attendance";
import AttendanceForm from "./AttendanceForm";
import { ConfirmDialog } from "../common/ConfirmDialog";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import {
  addAttendance,
  updateAttendance,
  deleteAttendance,
} from "../../store/slices/attendanceSlice";
import { getAttendanceColumns } from "./columns";
import { CustomGridToolbar } from "../common/CustomGridToolbar";

export default function AttendanceGrid() {
  const dispatch = useAppDispatch();
  const attendance = useAppSelector((state) => state.attendance.items);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editAttendance, setEditAttendance] = useState<Attendance | null>(null);
  const [deleteAttendanceId, setDeleteAttendanceId] = useState<string | null>(
    null
  );
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 25,
    page: 0,
  });

  const handleEdit = (attendance: Attendance) => {
    setEditAttendance(attendance);
  };

  const handleEditSubmit = (data: AttendanceFormData) => {
    if (editAttendance) {
      dispatch(updateAttendance({ id: editAttendance.id, data }));
      setEditAttendance(null);
    }
  };

  const handleDeleteClick = (attendanceId: string) => {
    setDeleteAttendanceId(attendanceId);
  };

  const handleDeleteConfirm = () => {
    if (deleteAttendanceId) {
      dispatch(deleteAttendance(deleteAttendanceId));
      setDeleteAttendanceId(null);
    }
  };

  const handleAddAttendance = (data: AttendanceFormData) => {
    dispatch(addAttendance(data));
    setIsAddOpen(false);
  };

  const columns = getAttendanceColumns(handleEdit, handleDeleteClick);
  const attendanceToDelete = attendance.find(
    (a) => a.id === deleteAttendanceId
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "calc(100vh - 170px)",
        backgroundColor: "background.paper",
      }}
    >
      <Box sx={{ flex: 1, width: "100%", overflow: "hidden" }}>
        <DataGrid
          rows={attendance}
          columns={columns}
          density="compact"
          components={{
            Toolbar: (props) => (
              <CustomGridToolbar
                {...props}
                onAdd={() => setIsAddOpen(true)}
                addButtonText="Add Attendance"
              />
            ),
          }}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[10, 25, 50]}
          disableRowSelectionOnClick
          sx={{
            height: "100%",
            border: "none",
            "& .MuiDataGrid-cell": {
              borderColor: "divider",
            },
            "& .MuiDataGrid-columnHeaders": {
              bgcolor: "background.default",
              borderColor: "divider",
            },
            "& .MuiDataGrid-footerContainer": {
              borderColor: "divider",
            },
          }}
        />
      </Box>

      <AttendanceForm
        open={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSubmit={handleAddAttendance}
        title="Add New Attendance"
      />

      {editAttendance && (
        <AttendanceForm
          open={true}
          onClose={() => setEditAttendance(null)}
          onSubmit={handleEditSubmit}
          initialData={editAttendance}
          title="Edit Attendance"
        />
      )}

      <ConfirmDialog
        open={!!deleteAttendanceId}
        title="Delete Attendance"
        message={
          attendanceToDelete
            ? `Are you sure you want to delete attendance record for ${attendanceToDelete.employeeName}?`
            : ""
        }
        confirmLabel="Delete"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteAttendanceId(null)}
      />
    </Box>
  );
}
