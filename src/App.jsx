import { useState, useEffect } from 'react'
import { FaEdit } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';
import { v4 as uuidv4 } from 'uuid';
import './App.css'
import Navbar from './components/Navbar'

function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(false)

  // Load from localStorage (only once)
  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(todoString)
      setTodos(todos)
    }
  }, [])

  // Save to localStorage
  const saveToLS = (updatedTodos) => {
    localStorage.setItem("todos", JSON.stringify(updatedTodos))
  }

  const handleEdit = (e) => {
    const id = e.target.name;
    let todoEdit = todos.find(item => item.id === id);
    setTodo(todoEdit.todo);
    const updatedTodos = todos.filter(item => item.id !== id);
    setTodos(updatedTodos)
    saveToLS(updatedTodos)
  };

  const handleDelete = (e) => {
    const id = e.target.name;
    const updatedTodos = todos.filter(item => item.id !== id);
    setTodos(updatedTodos);
    saveToLS(updatedTodos)
  };

  const handleAdd = () => {
    if (todo !== "") {
      const newTodos = [...todos, { id: uuidv4(), todo, isCompleted: false }];
      setTodos(newTodos);
      setTodo("")
      saveToLS(newTodos)
    }
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => item.id === id);
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLS(newTodos)
  }

  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  }
  

  return (
    <>
      <Navbar />

      <div className="container">
        <div className="first-heading">
          <h1 className='manage'>TaskBook - Manage your Todos at one place</h1>
        </div>
        <div className="addTodo">
          <h2>Add a Todo</h2>
          <input onChange={handleChange} value={todo} type="text" />
          <button onClick={handleAdd} className='btn'>Save</button>
        </div>
        <input style={{margin: "10px 10px"}} type="checkbox" checked={showFinished} name="" id="" onChange={toggleFinished} />Show Finished
        <div style={{height: "2px", backgroundColor: "black", width: "95%", margin: "15px auto"}}></div>
        <h2 className='your-todos'>Your Todos</h2>

        <div className="todos">
          {todos.length === 0 && <div className='noTodos'>No todos to display</div>}

          {todos.map(item => {

            return(showFinished || !item.isCompleted) && <div className="todo" key={item.id}>
              <div className="todoText">
                <input className='checkbox' name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} />
                <div className={`text ${item.isCompleted ? "line-through" : ""}`}>
                  {item.todo}
                </div>
              </div>
              <div className="buttons">
                <button name={item.id} onClick={handleEdit} className='btn'><FaEdit /></button>
                <button name={item.id} onClick={handleDelete} className='btn'><AiFillDelete /></button>
              </div>
            </div>
})}
        </div>
      </div>
    </>
  )
}

export default App
