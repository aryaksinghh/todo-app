import { useEffect, useState } from 'react'
import Navbar from "./components/navbar"
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showfinish, setshowfininsh] = useState(true)

  useEffect(() => {
    let todostring = localStorage.getItem("todos")
    if (todostring) {
      let todos = JSON.parse(todostring);
      setTodos(todos)
    }
  }, [])

  const savetols = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, iscompleted: false }])
    setTodo("")
  }
  const handleChange = (e) => {
    setTodo(e.target.value)
  }
  const handleCheckbox = (item) => {
    let id = item.target.name
    let index = todos.findIndex((todo) => todo.id === id)
    let newtodos = [...todos]
    newtodos[index].iscompleted = !newtodos[index].iscompleted
    setTodos(newtodos)
    savetols()
  }
  const handleDelete = (e, id) => {
    let newtodoss = todos.filter((todo) => todo.id !== id)
    setTodos(newtodoss)
    savetols()
  }
  const handleEdit = (e, id) => {
    let todo = todos.find((todo) => todo.id === id)
    setTodo(todo.todo)
    let newtodoss = todos.filter((todo) => todo.id !== id)
    setTodos(newtodoss)
    savetols()
  }
  const togglechange = () => {
    setshowfininsh(!showfinish)
  }


  return (
    <>
      <Navbar />
      <div className='flex justify-center mt-6 p-4 md:p-0'>
        <div className='bg-violet-100 w-full md:w-[50vw] min-h-[80vh] rounded-lg p-5 flex flex-col gap-9'>
          <div className="addsec flex flex-col items-center gap-3">
            <h1 className='text-xl font-extrabold mr-7'>Add your todo</h1>
            <div className="addtodo flex gap-3">
              <input onChange={handleChange} value={todo} className=' px-3 border-[3px] py-1 w-full md:w-[20vw] rounded-3xl border-violet-600' type="text" placeholder='Write your task' />
              <button onClick={handleAdd} disabled={todo.length < 3} className='bg-violet-600 py-1 px-2 font-bold text-white rounded-md hover:bg-violet-800'>Save</button>
            </div>
          </div>
          <div className="todos flex flex-col gap-3">
            <div>
              <input className='finish self-start' onChange={togglechange} checked={showfinish} type="checkbox" /> Show Finished
            </div>
            <h1 className='text-xl font-extrabold mb-2'>Your todos</h1>
            {todos.length === 0 && <div className='mx-5 text-red-700'>Todo list is empty</div>}
            {todos.map(items => {
              return (showfinish || !items.iscompleted) && <div key={items.id} className="todo flex items-center justify-between">
                <div className='flex gap-4 w-52 md:w-full'>
                  <input onChange={handleCheckbox} type="checkbox" name={items.id} checked={items.iscompleted} />
                  <h3 className={items.iscompleted ? "line-through" : ""}>{items.todo}</h3>
                </div>
                <div className="buttons flex gap-4">
                  <button onClick={(e) => handleEdit(e, items.id)} className='bg-violet-600 py-1 px-2 font-bold text-white rounded-md hover:bg-violet-800'><FaEdit /></button>
                  <button onClick={(e) => handleDelete(e, items.id)} className='bg-violet-600 py-1 px-2 font-bold text-white rounded-md hover:bg-violet-800'><MdDelete /></button>
                </div>
              </div>
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default App

