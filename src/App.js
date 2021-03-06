
import React, {useState, useEffect} from 'react'
import {isEmpty, size, update } from 'lodash'
//import shortid from 'shortid'
import { addDocument, deleteDocument, getCollection, updateDocument } from './actions'

function App() {
  const [task, setTask] = useState("")
  const [tasks, setTasks] = useState([])
  const [editMode, setEditMode] = useState(false)
  const [id, setId] = useState("")
  const [error, setError] = useState(null)


  useEffect(()=> {
    (async () => {
      const result = await getCollection("tasks")
      if (result.statusResponse){
      setTasks(result.data)
      }
    })()

  }, [])


const validForm = () =>{
  let isValid = true
  setError(null)
  if (isEmpty(task)){
    setError("You must enter a task.")
    isValid = false
    
  }
  return isValid
}

  const addTask = async (e) => {
    //Event.preventDefault()
    e.preventDefault()    
    if (!validForm()){
      return
    }

    const result = await addDocument("tasks", {name: task})
    if (!result.statusResponse){
      setError(result.error)
      return
    }
     
    
    setTasks([...tasks, {id: result.data.id, name: task}])
    setTask("")
  }
  const saveTask = async(e) => {    
    e.preventDefault()
    if (!validForm()){
      return
    }
    const result = await updateDocument("tasks", id, {name: task})
    if (!result.statusResponse){
      setError(result.error)
      return
    }
    
    const editedTasks = tasks.map(item => item.id === id ? {id, name: task} : item)
    setTasks(editedTasks)
    setEditMode(false)
    setTask("")
    setId("")
  }
  const deleterTask = async (id) => {
    const result = await deleteDocument("tasks", id)
    if(!result.statusResponse){
      setError(result.error)
      return
    }
    const filteredTask = tasks.filter(task => task.id !== id)
    setTasks(filteredTask)
  }
  const editTask = (theTask) => {
    setTask(theTask.name)
    setEditMode(true)
    setId(theTask.id)
  }
  
  return (
    <div className= "container mt-5">
      <h1>HOMEWORK!!</h1>
      <hr/>
      <div className="row">
        <div className="col-8">
          <h4 className="text-center">List Homework</h4>
          {
            size(tasks) === 0 ? (
              <li className="list-group-item">There are no tasks yet</li>
            ):(

            <ul className="list-group">
            {
              tasks.map((task)=>(
                <li className="list-group-item" key={task.id}>
                <span className="lead">{task.name}</span>

                <button 
                className="btn btn-danger btn-sm float-right mx-2"
                onClick={()=> deleterTask(task.id) }
                >
                Deleter
                </button>

                <button 
                className="btn btn-warning btn-sm float-right mx-2"
                onClick={()=> editTask(task)}
                >
                Edit
                </button>
              </li>

              ))
              
            }
          </ul>
            )
          }
          

        </div>
        <div className="col-4">
          <h4 className="text-center">{ 
          editMode ? "Edit Task" : "Add tasks"}
          </h4>
          <form onSubmit={editMode ? saveTask : addTask}>
            <input
            type="text"
            className="form-control mb-2"
            placeholder="Insert homework"
            onChange={(text)=> setTask(text.target.value)}
            value={task}
            />
            {
              error && <span className="text-danger">{error}</span>
            }
            <button
            className={editMode ? 
              "btn btn-warning btn-block" : "btn btn-dark btn-block"
            }
            type="submit"
            >
            {editMode ? "Save": "Add"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default App
