import { IoIosAdd } from "react-icons/io";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function AddTask({ columnId, setTaskStore, taskStore }) {
  const [showInput, setShowInput] = useState<JSX.Element | Boolean>(false);
  const [addTask, setAddTask] = useState<{ name: string }>({ name: "" });
  const [errorMessage, setErrorMessage] = useState("");

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
    if (event.key === "Enter") {
      handleAddTask();
    }
  };

  const handleAddTask = () => {
    if (addTask && addTask.name.trim() !== "") {
      const newObject = {
        id: uuidv4(),
        name: addTask.name.trim(),
        value: "",
      };
      let tempArray = [...taskStore];
      if (tempArray[columnId] === undefined) {
        tempArray[columnId] = [];
      }
      tempArray[columnId] = [...tempArray[columnId], newObject];
      setTaskStore(tempArray);
      setAddTask({ name: "" });
      setErrorMessage("");
    } else {
      setErrorMessage("Task name cannot be empty");
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
            {errorMessage && <div className="text-red-500">{errorMessage}</div>}
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


