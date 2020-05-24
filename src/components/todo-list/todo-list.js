import React from 'react';
import ToDoListItem from '../todo-list-item';
import './todo-list.css'

const TodoList = ({todoData, onDeleted, onToggleImportant, onToggleDone}) => {

  const elements = todoData.map(item => {

    const {id, ...itemProps} = item;

    return(
      <li key={id} className='list-group-item'>
      <ToDoListItem{...itemProps}
      onDeleted={() => onDeleted(id)}
      onToggleImportant={() => onToggleImportant(id)}
      onToggleDone={() => onToggleDone(id)}
      />
      </li>
    )
  })

  return(
  <ul className='list-group todo-list'>
    {elements}
  </ul>)
};

export default TodoList;
