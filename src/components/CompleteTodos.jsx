import React from "react";

export const CompleteTodos = (props) => {
  const { todos, onClick } = props;
  return (
    <div className="complete-area">
      <p className="title">完了したTODO</p>
      <ul>
        {todos.map((todo) => {
          return (
            <li key={todo.ID}>
              <div className="list-row">
                <p>{todo.CONTENTS}</p>
                <button onClick={() => onClick(todo.ID)}>戻す</button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
