import { useState } from "react";
import { IoIosMore } from "react-icons/io";
import { CirclePicker } from "react-color";
import { IoIosClose } from "react-icons/io";

function TaskCard({ task, taskStore, columnId, setTaskStore }) {
  const [showModal, setShowModal] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [color, setColor] = useState(task.color);

  const deleteTask = (taskId) => {
    let tempArray = [...taskStore];
    // pobieramy tablice z tempArray dla kolumny o danym Id, .filter(task) tworzy nowa tablice zawierajace tylko te elementy , nadpisuje poprzednia tablice
    tempArray[columnId] = tempArray[columnId].filter(
      (task) => task.id !== taskId
    );
    setTaskStore(tempArray);
  };

  const handleEdit = (event, taskId) => {
    const tempArray = [...taskStore];
    const updatedTask = { ...task, name: event.target.value };
    const taskIndex = tempArray[columnId].findIndex((t) => t.id === taskId);
    tempArray[columnId][taskIndex] = updatedTask;
    setTaskStore(tempArray);
  };

  const handleColorChange = (newColor, taskId) => {
    setColor(newColor.hex);
    const tempArray = [...taskStore];
    const updatedTask = { ...task, color: newColor.hex };
    const taskIndex = tempArray[columnId].findIndex((t) => t.id === taskId);
    tempArray[columnId][taskIndex] = updatedTask;
    setTaskStore(tempArray);
  };

  return (
    <>
      {showModal && (
        <div className="absolute top-0 left-0 z-50 w-full h-full bg-gray-400 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white w-80 h-80 p-4 rounded-lg">
            <div className="flex justify-between">
              <input
                className="text-lg font-bold w-60 mb-4 border-b-2 border-gray-400 focus:outline-none focus:border-blue-400"
                type="text"
                value={task.name}
                onChange={(event) => handleEdit(event, task.id)}
              />
              <button onClick={() => setShowColorPicker(true)}>
                <div
                  className="w-8 h-8 rounded-full"
                  style={{ backgroundColor: color }}
                ></div>
              </button>
              {showColorPicker && (
                <div className="absolute z-50">
                  <div
                    className="fixed inset-0"
                    onClick={() => setShowColorPicker(false)}
                  ></div>
                  <div className="absolute top-0 right-0">
                    <CirclePicker
                      color={color}
                      onChangeComplete={(newColor) =>
                        handleColorChange(newColor, task.id)
                      }
                    />
                  </div>
                </div>
              )}
              <button className="p-1" onClick={() => deleteTask(task.id)}>
                <IoIosClose size={24} />
              </button>
            </div>
            <div className="text-sm">{task.description}</div>
          </div>
        </div>
      )}
      <div>
        <IoIosMore onClick={() => setShowModal(true)} />
      </div>
    </>
  );
}

export default TaskCard;
