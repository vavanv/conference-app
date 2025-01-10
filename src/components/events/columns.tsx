import { GridColDef, GridActionsCellItem } from "@mui/x-data-grid";
import { Edit2, Trash2 } from "lucide-react";
import { Box } from "@mui/material";
import { Event } from "../../types/event";

export const getEventColumns = (
  onEdit: (event: Event) => void,
  onDelete: (id: string) => void
): GridColDef[] => [
  {
    field: "name",
    headerName: "Name",
    flex: 1,
    minWidth: 200,
  },
  {
    field: "startDate",
    headerName: "Start Date",
    flex: 1,
    minWidth: 150,
    valueFormatter: (params) => new Date(params.value).toLocaleString(),
  },
  {
    field: "endDate",
    headerName: "End Date",
    flex: 1,
    minWidth: 150,
    valueFormatter: (params) => new Date(params.value).toLocaleString(),
  },
  {
    field: "location",
    headerName: "Location",
    flex: 1,
    minWidth: 150,
  },
  {
    field: "organizer",
    headerName: "Organizer",
    flex: 1,
    minWidth: 150,
  },
  {
    field: "status",
    headerName: "Status",
    flex: 0.7,
    minWidth: 100,
    renderCell: (params) => (
      <Box
        sx={{
          px: 2,
          py: 0.5,
          borderRadius: 1,
          bgcolor:
            params.value === "cancelled"
              ? "error.light"
              : params.value === "completed"
              ? "success.light"
              : params.value === "ongoing"
              ? "warning.light"
              : "info.light",
          color:
            params.value === "cancelled"
              ? "error.dark"
              : params.value === "completed"
              ? "success.dark"
              : params.value === "ongoing"
              ? "warning.dark"
              : "info.dark",
          textTransform: "capitalize",
        }}
      >
        {params.value}
      </Box>
    ),
  },
  {
    field: "actions",
    type: "actions",
    headerName: "Actions",
    width: 80,
    getActions: (params) => [
      <GridActionsCellItem
        icon={<Edit2 size={14} />}
        label="Edit"
        onClick={() => onEdit(params.row)}
        sx={{ "& .MuiSvgIcon-root": { fontSize: "1.1rem" } }}
      />,
      <GridActionsCellItem
        icon={<Trash2 size={14} />}
        label="Delete"
        onClick={() => onDelete(params.row.id)}
        sx={{ "& .MuiSvgIcon-root": { fontSize: "1.1rem" } }}
      />,
    ],
  },
];
