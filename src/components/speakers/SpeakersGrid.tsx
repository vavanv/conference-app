import React, { useState } from 'react';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Speaker, SpeakerFormData } from '../../types/speaker';
import SpeakerForm from './SpeakerForm';
import { ConfirmDialog } from '../common/ConfirmDialog';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { addSpeaker, updateSpeaker, deleteSpeaker } from '../../store/slices/speakersSlice';
import { getSpeakerColumns } from './columns';
import { CustomGridToolbar } from '../common/CustomGridToolbar';

export default function SpeakersGrid() {
  const dispatch = useAppDispatch();
  const speakers = useAppSelector(state => state.speakers.items);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editSpeaker, setEditSpeaker] = useState<Speaker | null>(null);
  const [deleteSpeakerId, setDeleteSpeakerId] = useState<string | null>(null);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 25,
    page: 0,
  });

  const handleEdit = (speaker: Speaker) => {
    setEditSpeaker(speaker);
  };

  const handleEditSubmit = (data: SpeakerFormData) => {
    if (editSpeaker) {
      dispatch(updateSpeaker({ id: editSpeaker.id, data }));
      setEditSpeaker(null);
    }
  };

  const handleDeleteClick = (speakerId: string) => {
    setDeleteSpeakerId(speakerId);
  };

  const handleDeleteConfirm = () => {
    if (deleteSpeakerId) {
      dispatch(deleteSpeaker(deleteSpeakerId));
      setDeleteSpeakerId(null);
    }
  };

  const handleAddSpeaker = (data: SpeakerFormData) => {
    dispatch(addSpeaker(data));
    setIsAddOpen(false);
  };

  const columns = getSpeakerColumns(handleEdit, handleDeleteClick);
  const speakerToDelete = speakers.find(s => s.id === deleteSpeakerId);

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column',
      height: 'calc(100vh - 140px)'
    }}>      
      <Box sx={{ flex: 1, width: '100%', overflow: 'hidden' }}>
        <DataGrid
          rows={speakers}
          columns={columns}
          density="compact"
          components={{
            Toolbar: (props) => (
              <CustomGridToolbar {...props} onAdd={() => setIsAddOpen(true)} addButtonText="Add Speaker" />
            ),
          }}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[10, 25, 50]}
          disableRowSelectionOnClick
          sx={{
            height: '100%',
            border: 'none',
            '& .MuiDataGrid-cell': {
              borderColor: 'divider',
            },
            '& .MuiDataGrid-columnHeaders': {
              bgcolor: 'background.default',
              borderColor: 'divider',
            },
            '& .MuiDataGrid-footerContainer': {
              borderColor: 'divider',
            },
          }}
        />
      </Box>

      <SpeakerForm
        open={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSubmit={handleAddSpeaker}
        title="Add New Speaker"
      />

      {editSpeaker && (
        <SpeakerForm
          open={true}
          onClose={() => setEditSpeaker(null)}
          onSubmit={handleEditSubmit}
          initialData={editSpeaker}
          title="Edit Speaker"
        />
      )}

      <ConfirmDialog
        open={!!deleteSpeakerId}
        title="Delete Speaker"
        message={speakerToDelete ? `Are you sure you want to delete ${speakerToDelete.firstName} ${speakerToDelete.lastName}?` : ''}
        confirmLabel="Delete"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteSpeakerId(null)}
      />
    </Box>
  );
}
