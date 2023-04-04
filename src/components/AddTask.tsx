import { IoIosAdd } from "react-icons/io";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { MdOutlineCancel } from "react-icons/md";

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
      <div className="flex justify-start bg-gray-100 pt-4">
        {!showInput && (
          <button className="flex items-center border-2 p-2 rounded bg-blue-100" onClick={handleInputShow}>
            <IoIosAdd size={30}/>
            Create Card
          </button>
        )}
        {showInput && (
          <div>
            <input
              className="h-20 mt-3 w-72 border-4 mb-3"
              key={columnId}
              type="text"
              value={addTask.name}
              onChange={handleChange}
              onKeyDown={handleKeyPress}
            />
            {errorMessage && <div className="text-red-500">{errorMessage}</div>}
            <div className="flex flex-row justify-between">
              <button className="flex items-center w-20 border-2 rounded p-1.5 bg-blue-300" onClick={handleAddTask}>
                <IoIosAdd size={20}/>
                Add
              </button>
              <button className="flex items-center border-2 w-20 rounded p-1.5 bg-red-400" onClick={handleBackToInput}>
                <MdOutlineCancel/>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AddTask;


