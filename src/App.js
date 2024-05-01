import React, { useState } from 'react';
import './App.css';

function Index() {
  const [list, setList] = useState([]);
  const [message, setMessage] = useState({ text: "", id: "" });
  const [editingItem, setEditingItem] = useState({ id: "", isEditing: false });

  const changeMessage = (event) => {
    setMessage({
      ...message,
      text: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (message.text === "") {
      alert("Enter some text");
      return; // Added missing return statement
    }
    let newTodo = {
      text: message.text,
      id: new Date().getTime().toString(),
    };
    setList([...list, newTodo]);
    setMessage({ text: "", id: "" });
  };

  const handleDelete = (id) => {
    let newlist = list.filter((eachitem) => {
      return eachitem.id !== id;
    });
    setList(newlist);
  };

  const changeEditState = (id) => {
    setEditingItem({
      ...editingItem,
      id: id,
      isEditing: true,
    });
    let editableItem = list.find((eachitem) => eachitem.id === id);
    setMessage({
      ...message,
      text: editableItem.text,
      id: editableItem.id,
    });
  };

  const handleEdit = (event) => {
    event.preventDefault();
    let newTodo = list.map((eachitem) => {
      if (eachitem.id === editingItem.id) {
        return {
          id: eachitem.id,
          text: message.text,
        };
      } else {
        return eachitem;
      }
    });
    setList(newTodo);
    setMessage({ text: "", id: "" });
    setEditingItem({
      ...editingItem,
      isEditing: false,
    });
  };

  return (
    <div className="row">
    <div className="col-12">
    <div className='boody d-flex flex-row justify-content-center'>
      <div>
        <form>
          <div class="ggroup">
          <input
            type="text"
            name="message"
            id="message"
            placeholder="Enter Message"
            value={message.text}
            onChange={changeMessage}
          />
          {editingItem.isEditing ? (
            <button className='edit-button' onClick={handleEdit} type="submit">
              Edit
            </button>
          ) : (
            <button className='add-button' onClick={handleSubmit} type="submit">
              Add
            </button>
          )}
          </div>
        </form>
        <hr />
        <div class="list-container">
        {list.length === 0 && <h4>No Item Added</h4>}
        {list.length !== 0 && <h4>Task Remaining to Do : {list.length}</h4>}
        <ul>
          {list.map((eachitem) => {
            const { text, id } = eachitem;
            return (
              <li key={id}>
                <div class= "todo-container d-flex flex-row justify-content-between">
                <span>{text}</span>
                <button className='edit-button' onClick={() => changeEditState(id)}>Edit</button>
                <button className='delete-button' onClick={() => handleDelete(id)}>Delete</button>
                </div>
              </li>
             
            );
          })}
        </ul>
      </div>
    </div>
    </div>
    </div>
    </div>
  );
}

export default Index;
