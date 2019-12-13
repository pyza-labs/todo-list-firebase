import React, { Fragment, useState } from "react";
import { Input, Button, Tooltip, Icon } from "antd";
import Styles from "./TodoCreate.module.css";

const TodoCreate = props => {
  const [text = "", setText] = useState();
  const [isEdit = false, setIsEdit] = useState();
  const [todo = props.todo, setTodo] = useState();

  const editClickHandler = () => {
    setIsEdit(true);
    props.editTodo(false);
  };

  const changeTextHandler = event => {
    setText(event.target.value);
  };

  const cancelHandler = () => {
    setIsEdit(false);
  };

  const saveTodoHandler = () => {
    if (text) {
      setTodo(text);
      setText("");
      setIsEdit(false);
    }
  };

  const createTodo = isEdit ? (
    <Fragment>
      <Input onChange={changeTextHandler} onPressEnter={saveTodoHandler} />
      <div className={Styles.todoButtons}>
        <Button className={Styles.button} onClick={saveTodoHandler}>
          Save
        </Button>
        <Button className={Styles.button} onClick={cancelHandler}>
          Cancel
        </Button>
      </div>
    </Fragment>
  ) : (
    <div className={Styles.todoItem} onClick={editClickHandler}>
      {todo}
      <div className={Styles.toolTip} onClick={editClickHandler}>
        <Tooltip title="Edit Todo">
          <Icon type="edit" style={{ color: "rgba(0,0,0,.45)" }} />
        </Tooltip>
      </div>
    </div>
  );

  return <Fragment>{createTodo}</Fragment>;
};
export default TodoCreate;

// <Input
//   size="small"

// />;
