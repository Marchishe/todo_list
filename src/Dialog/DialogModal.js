import React from "react";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './DialogModal.css'

const DialogModal = (
    {
        handleOpenDialog,
        isOpen,
        handleSetFieldValue,
        formData,
        handleSetTodoOnSubmit
    }
) => {
    return(
        <Dialog open={isOpen} onClose={handleOpenDialog}>
            <DialogTitle>{formData.isEdit ? 'Edit todo' : 'Add new todo'}</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSetTodoOnSubmit}>
                    <TextField
                        label='name'
                        variant="filled"
                        onChange={(e)=>handleSetFieldValue('todoName', e.target.value)}
                        value={formData.todoName}
                    />

                    <TextField
                        label='description'
                        variant="filled"
                        onChange={(e)=>handleSetFieldValue('todoNote', e.target.value)}
                        value={formData.todoNote}
                        minRows={4}
                        multiline
                    />

                 <DialogActions>
                     <Button color='primary' onClick={handleOpenDialog}>Close</Button>
                     <Button disabled={!formData.todoName} type='submit' color='primary'>{formData.isEdit ? 'Edit' : 'Add'}</Button>
                 </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default DialogModal