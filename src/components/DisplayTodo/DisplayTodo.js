import React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";

import formatDate from "../../helpers/formatDate";
import "./DisplayTodo.css";

const DisplayTodo = ({
  isOpen,
  formData,
  handleCloseButton,
  handleEditTodo,
  handleRemoveTodo,
  handleOpenDialog,
}) => {
  return (
    <Dialog open={isOpen} onClose={handleOpenDialog}>
      <DialogTitle>
        <h1 className="task-modal-title">{formData.todoName}</h1>
      </DialogTitle>
      <DialogContent>
        <div>
          <div>{formData.todoNote}</div>
          <div>Created at: {formatDate(formData.timeCreated)}</div>
          <div>Start at: {formatDate(formData.timeEdited)}</div>
          <div>Finished at: {formatDate(formData.timeFinished)}</div>
        </div>
      </DialogContent>

      <DialogActions>
        <div className="task-modal-buttons">
          <div>
            <Button color="primary" onClick={handleCloseButton}>
              Close
            </Button>
            <Button color="primary" onClick={handleEditTodo}>
              Edit
            </Button>
          </div>
          <Button color="error" onClick={handleRemoveTodo}>
            Remove
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  );
};

export default DisplayTodo;
