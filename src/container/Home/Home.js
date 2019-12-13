import React, { useState, useEffect } from "react";
import Styles from "./Home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Todo from "../TodoCreate/TodoCreate";
import { Input, Button, Tooltip, Icon, DatePicker, Card } from "antd";
import { cloud } from "../../services/firebase/firebase";

const Home = props => {
  const moment = require("moment");

  const [isShowInput = false, setIsShowInput] = useState();
  const [displayTodos = [], setDisplayTodos] = useState();
  const [text = "", setText] = useState();
  const [date = moment().format("DD-MM-YYYY"), setDate] = useState();
  const [isDate = false, setIsDate] = useState();

  useEffect(() => {
    if (!props.fireUser.email) return;
    cloud
      .collection("Users")
      .doc(props.fireUser.email)
      .get()
      .then(snapshot => {
        console.log(snapshot.data().todos);
        setDisplayTodos(snapshot.data().todos);
      })
      .catch(error => {
        console.log("Error getting document:", error);
      });
  }, [props.fireUser.email]);

  const showInputHandler = () => {
    setIsShowInput(true);
  };

  const cancelHandler = () => {
    setIsShowInput(false);
  };

  const textChangeHandler = event => {
    setText(event.target.value);
  };

  const addTodoHandler = () => {
    let todos = [...displayTodos];
    if (text) {
      todos.push({ todo: text, date: date });
      setDisplayTodos(todos);
      cloud
        .collection("Users")
        .doc(props.fireUser.email)
        .set({ todos });
      setText("");
    }
  };

  const editTodoHandler = val => {
    setIsShowInput(val);
  };

  const dateHandler = (date, dateString) => {
    setDate(dateString);
    console.log(date, dateString);
    setIsDate(false);
  };

  const showDateHandler = () => {
    setIsDate(true);
  };
  console.log(date);

  const groupBy = () => {
    return displayTodos.reduce((accumulator, currentVal) => {
      let key = currentVal.date;
      if (!accumulator[key]) {
        accumulator[key] = [];
      }
      accumulator[key].push(currentVal.todo);
      return accumulator;
    }, {});
  };
  let todoObject = groupBy();
  const todoArray = Object.keys(todoObject).map((todoDate, index) => {
    return (
      <Card title={todoDate} style={{ width: 300, margin: "20px" }}>
        {todoObject[todoDate].map((todo, index) => {
          return <Todo key={index} todo={todo} editTodo={editTodoHandler} />;
        })}
      </Card>
    );
  });
  console.log(todoArray);
  return (
    <div className={Styles.Home}>
      {todoArray}
      {!isShowInput && (
        <div className={Styles.addTodo} onClick={showInputHandler}>
          <FontAwesomeIcon icon={["far", "calendar-plus"]} />
          <div>Add Todo</div>
        </div>
      )}
      {isShowInput && (
        <div>
          <Input
            size="small"
            value={text}
            onChange={textChangeHandler}
            onPressEnter={addTodoHandler}
            suffix={
              <Tooltip title="Set Date">
                <Icon
                  type="calendar"
                  style={{ color: "rgba(0,0,0,.45)" }}
                  onClick={showDateHandler}
                />
              </Tooltip>
            }
          />
          {isDate && <DatePicker onChange={dateHandler} format="DD-MM-YYYY" />}
        </div>
      )}
      {isShowInput && (
        <div className={Styles.todoButtons}>
          <Button className={Styles.button} onClick={addTodoHandler}>
            Add Todo
          </Button>
          <Button className={Styles.button} onClick={cancelHandler}>
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
};
export default Home;
