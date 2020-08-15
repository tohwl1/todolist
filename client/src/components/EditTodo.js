import React, { Fragment, useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ToastBody,
} from "reactstrap";

const EditTodo = ({ todo }) => {
  const { buttonLabel, className } = todo;

  const [modal, setModal] = useState(false);
  const [description, setDescription] = useState(todo.description);

  const updateDescription = async (e) => {
    e.preventDefault();
    try {
      const body = { description };
      const response = await fetch(
        `http://localhost:5000/todos/${todo.todo_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };
  const toggle = () => setModal(!modal);
  return (
    <Fragment>
      <div>
        <Button
          className="btn btn-warning"
          onClick={toggle}
          data-target={`#id${todo.todo_id}`}
        >
          Edit
        </Button>

        <Modal
          isOpen={modal}
          toggle={toggle}
          className={className}
          id={`id${todo.todo_id}`}
        >
          <ModalHeader
            onClick={() => setDescription(todo.description)}
            toggle={toggle}
          >
            Edit
          </ModalHeader>
          <ModalBody>
            <input
              type="text"
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></input>
          </ModalBody>
          <ModalFooter>
            <Button color="warning" onClick={(e) => updateDescription(e)}>
              Edit
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </Fragment>
  );
};

export default EditTodo;
