import { IoIosAdd } from "react-icons/io";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";




function AddTask({columnId, setTaskStore, taskStore}) {
  const [showInput, setShowInput] = useState<JSX.Element | Boolean>(false);
  const [addTask, setAddTask] = useState<{ name: string }>({ name: "" });


  const handleInputShow = (e) => {
    e.preventDefault();
    setShowInput(true);
  };

  const handleBackToInput = () => {
    setShowInput(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddTask({ name: event.target.value });
  };

  const handleKeyPress = (event) => {
    if(event.key === 'Enter'){
      handleAddTask()
    }
  }

  const handleAddTask = () => {
    if (addTask) {
      const newObject = {
        id: uuidv4(),
        name: addTask.name
      };
      let tempArray = [...taskStore]
        if (tempArray[columnId] === undefined) {
          tempArray[columnId] = []
        }
        tempArray[columnId].push(newObject)
        console.log(taskStore)
      setTaskStore(tempArray)
      setAddTask({ name: "" });
    }
  };


  return (
    <div>
      <div className="flex justify-center bg-slate-50">
        {!showInput && (
          <button className="flex items-center" onClick={handleInputShow}>
            <IoIosAdd />
            Create
          </button>
        )}
        {showInput && (
          <div>
            <input
              className="h-20 mt-10"
              key={columnId}
              type="text"
              value={addTask.name}
              onChange={handleChange}
              onKeyDown={handleKeyPress}
            />
            <div className="flex flex-row justify-between">
              <button className="flex items-center" onClick={handleAddTask}>
                <IoIosAdd />
                Add
              </button>
              <button onClick={handleBackToInput}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AddTask;
