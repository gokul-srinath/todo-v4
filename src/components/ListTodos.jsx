import React, { useState } from "react";

import "./todos.css";

import Loading from "./Loading";
import Todo from "./Todo";
const ListTodos = ({ categories, toggleMark, data, isLoading, deleteHandler }) => {
  if (isLoading) return <Loading />;
  // if (isError) return <div>Error fetching data</div>;

  if (categories !== "todos") {
    const key = categories;
    const map = {};

    data.forEach((d) => {
      if (!map[d[key]]) map[d[key]] = [];

      map[d[key]].push(d);
    });

    return (
      <>
        <div className="todos">
          {Object.keys(map).map((category, inx) => {
            return (
              <div className="category-container" key={inx}>
                <div className="header">
                  <h4>{category}</h4>
                  <div className="line"></div>
                </div>
                <div className="category">
                  {map[category] &&
                    map[category].map((todo) => (
                      <Todo key={todo.id} todo={todo} toggleMark={toggleMark} deleteHandler={deleteHandler} />
                    ))}
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
  }

  return (
    <>
      <div className="todos">
        {data.map((todo) => (
          <Todo key={todo.id} todo={todo} toggleMark={toggleMark} deleteHandler={deleteHandler} />
        ))}
      </div>
    </>
  );
};

export default ListTodos;
