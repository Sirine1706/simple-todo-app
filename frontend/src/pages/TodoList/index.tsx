const TodoList = () => {
  return (
    <div className='todo_container'>
      <h1>My todo list</h1>
      <div className='add-task'>
        <input
          type='text'
          name='task'
          id='task'
          placeholder='|create a new task'
        />
        <button>add</button>
      </div>
      <div className='tasks'>
        <div className='task'>
          <input
            type='text'
            name='added-task'
            id='added-task'
            value={"task"}
            disabled
          />
          <div className='buttons'>
            <button className="done">done</button>
            <button className="edit">edit</button>
            <button className="trash">trash</button>
          </div>
        </div>
        <button className="clear">clear all</button>
      </div>
    </div>
  );
};
export default TodoList