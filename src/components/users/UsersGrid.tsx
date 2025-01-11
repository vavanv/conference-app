import { useState } from "react";
    import { Box } from "@mui/material";
    import { DataGrid } from "@mui/x-data-grid";
    import { User, UserFormData } from "../../types/user";
    import UserForm from "./UserForm";
    import { ConfirmDialog } from "../common/ConfirmDialog";
    import { useAppSelector, useAppDispatch } from "../../hooks/redux";
    import {
      addUser,
      updateUser,
      deleteUser,
    } from "../../store/slices/usersSlice";
    import { getUserColumns } from "./columns";
    import { CustomGridToolbar } from "../common/CustomGridToolbar";
    
    export default function UsersGrid() {
      const dispatch = useAppDispatch();
      const users = useAppSelector((state) => state.users.items);
      const [isAddOpen, setIsAddOpen] = useState(false);
      const [editUser, setEditUser] = useState<User | null>(null);
      const [deleteUserId, setDeleteUserId] = useState<string | null>(null);
      const [paginationModel, setPaginationModel] = useState({
        pageSize: 25,
        page: 0,
      });
    
      const handleEdit = (user: User) => {
        setEditUser(user);
      };
    
      const handleEditSubmit = (data: UserFormData) => {
        if (editUser) {
          dispatch(updateUser({ id: editUser.id, data }));
          setEditUser(null);
        }
      };
    
      const handleDeleteClick = (userId: string) => {
        setDeleteUserId(userId);
      };
    
      const handleDeleteConfirm = () => {
        if (deleteUserId) {
          dispatch(deleteUser(deleteUserId));
          setDeleteUserId(null);
        }
      };
    
      const handleAddUser = (data: UserFormData) => {
        dispatch(addUser(data));
        setIsAddOpen(false);
      };
    
      const columns = getUserColumns(handleEdit, handleDeleteClick);
      const userToDelete = users.find((a) => a.id === deleteUserId);
    
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
              rows={users}
              columns={columns}
              density="compact"
              components={{
                Toolbar: (props) => (
                  <CustomGridToolbar
                    {...props}
                    onAdd={() => setIsAddOpen(true)}
                    addButtonText="Add User"
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
    
          <UserForm
            open={isAddOpen}
            onClose={() => setIsAddOpen(false)}
            onSubmit={handleAddUser}
            title="Add New User"
          />
    
          {editUser && (
            <UserForm
              open={true}
              onClose={() => setEditUser(null)}
              onSubmit={handleEditSubmit}
              initialData={editUser}
              title="Edit User"
            />
          )}
    
          <ConfirmDialog
            open={!!deleteUserId}
            title="Delete User"
            message={
              userToDelete
                ? `Are you sure you want to delete user ${userToDelete.firstName} ${userToDelete.lastName}?`
                : ""
            }
            confirmLabel="Delete"
            onConfirm={handleDeleteConfirm}
            onCancel={() => setDeleteUserId(null)}
          />
        </Box>
      );
    }
