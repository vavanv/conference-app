import { useState } from "react";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Presenter, PresenterFormData } from "../../types/presenter";
import { PresenterForm } from "./PresenterForm";
import { ConfirmDialog } from "../common/ConfirmDialog";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import {
  addPresenter,
  updatePresenter,
  deletePresenter,
} from "../../store/slices/presentersSlice";
import { getPresenterColumns } from "./columns";
import { CustomGridToolbar } from "../common/CustomGridToolbar";

export function PresentersGrid() {
  const dispatch = useAppDispatch();
  const presenters = useAppSelector((state) => state.presenters.items);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editPresenter, setEditPresenter] = useState<Presenter | null>(null);
  const [deletePresenterId, setDeletePresenterId] = useState<string | null>(
    null
  );
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 25,
    page: 0,
  });

  const handleEdit = (presenter: Presenter) => {
    setEditPresenter(presenter);
  };

  const handleEditSubmit = (data: PresenterFormData) => {
    if (editPresenter) {
      dispatch(updatePresenter({ id: editPresenter.id, data }));
      setEditPresenter(null);
    }
  };

  const handleDeleteClick = (presenterId: string) => {
    setDeletePresenterId(presenterId);
  };

  const handleDeleteConfirm = () => {
    if (deletePresenterId) {
      dispatch(deletePresenter(deletePresenterId));
      setDeletePresenterId(null);
    }
  };

  const handleAddPresenter = (data: PresenterFormData) => {
    dispatch(addPresenter(data));
    setIsAddOpen(false);
  };

  const columns = getPresenterColumns(handleEdit, handleDeleteClick);
  const presenterToDelete = presenters.find((p) => p.id === deletePresenterId);

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
          rows={presenters}
          columns={columns}
          density="compact"
          components={{
            Toolbar: (props) => (
              <CustomGridToolbar
                {...props}
                onAdd={() => setIsAddOpen(true)}
                addButtonText="Add Presenter"
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

      <PresenterForm
        open={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSubmit={handleAddPresenter}
        title="Add New Presenter"
      />

      {editPresenter && (
        <PresenterForm
          open={true}
          onClose={() => setEditPresenter(null)}
          onSubmit={handleEditSubmit}
          initialData={editPresenter}
          title="Edit Presenter"
        />
      )}

      <ConfirmDialog
        open={!!deletePresenterId}
        title="Delete Presenter"
        message={
          presenterToDelete
            ? `Are you sure you want to delete ${presenterToDelete.firstName} ${presenterToDelete.lastName}?`
            : ""
        }
        confirmLabel="Delete"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeletePresenterId(null)}
      />
    </Box>
  );
}
