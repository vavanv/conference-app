import { useState } from "react";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Event, EventFormData } from "../../types/event";
import { EventForm } from "./EventForm";
import { ConfirmDialog } from "../common/ConfirmDialog";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import {
  addEvent,
  updateEvent,
  deleteEvent,
} from "../../store/slices/eventsSlice";
import { getEventColumns } from "./columns";
import { CustomGridToolbar } from "../common/CustomGridToolbar";

export function EventsGrid() {
  const dispatch = useAppDispatch();
  const events = useAppSelector((state) => state.events.items);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editEvent, setEditEvent] = useState<Event | null>(null);
  const [deleteEventId, setDeleteEventId] = useState<string | null>(null);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 25,
    page: 0,
  });

  const handleEdit = (event: Event) => {
    setEditEvent(event);
  };

  const handleEditSubmit = (data: EventFormData) => {
    if (editEvent) {
      dispatch(updateEvent({ id: editEvent.id, data }));
      setEditEvent(null);
    }
  };

  const handleDeleteClick = (eventId: string) => {
    setDeleteEventId(eventId);
  };

  const handleDeleteConfirm = () => {
    if (deleteEventId) {
      dispatch(deleteEvent(deleteEventId));
      setDeleteEventId(null);
    }
  };

  const handleAddEvent = (data: EventFormData) => {
    dispatch(addEvent(data));
    setIsAddOpen(false);
  };

  const columns = getEventColumns(handleEdit, handleDeleteClick);
  const eventToDelete = events.find((e) => e.id === deleteEventId);

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
          rows={events}
          columns={columns}
          density="compact"
          components={{
            Toolbar: (props) => (
              <CustomGridToolbar
                {...props}
                onAdd={() => setIsAddOpen(true)}
                addButtonText="Add Event"
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

      <EventForm
        open={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSubmit={handleAddEvent}
        title="Add New Event"
      />

      {editEvent && (
        <EventForm
          open={true}
          onClose={() => setEditEvent(null)}
          onSubmit={handleEditSubmit}
          initialData={editEvent}
          title="Edit Event"
        />
      )}

      <ConfirmDialog
        open={!!deleteEventId}
        title="Delete Event"
        message={
          eventToDelete
            ? `Are you sure you want to delete ${eventToDelete.name}?`
            : ""
        }
        confirmLabel="Delete"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteEventId(null)}
      />
    </Box>
  );
}
