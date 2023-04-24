import { useState, useEffect, useRef } from "react";
import { IoIosMore } from "react-icons/io";
import { CirclePicker } from "react-color";
import { IoIosClose } from "react-icons/io";
import { MdDeleteOutline, MdOutlineCancel } from "react-icons/md";

function TaskCard({ task, taskStore, columnId, setTaskStore}) {
  const [showModal, setShowModal] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [color, setColor] = useState(task.color);

  const modalRef = useRef(null);


  const deleteTask = (taskId) => {
    let tempArray = [...taskStore];
    // pobieramy tablice z tempArray dla kolumny o danym Id, .filter(task) tworzy nowa tablice zawierajace tylko te elementy , nadpisuje poprzednia tablice
    tempArray[columnId] = tempArray[columnId].filter(
      (task) => task.id !== taskId
    );
    setTaskStore(tempArray);
  };

  const handleKeyPress = (event, taskId) => {
    if (event.key === "Enter") {
      handleEdit(event, taskId);
    }
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



  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setShowModal(false);
    }
  };

  useEffect(() => {
    if (showModal) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showModal]);


    return (
      <>
        {showModal && (
          <div className="absolute top-0 left-0 z-50 w-full h-full bg-gray-400 bg-opacity-50 flex justify-center items-center">
            <div  ref={modalRef} className="bg-white w-2/5 h-80 p-4 rounded-lg" >
              <div className="flex-wrap justify-between gap-2">
                <div className="flex justify-between mt-4">
                  <input
                    className="text-lg font-bold w-80 mb-4 border-b-2 border-gray-400 focus:outline-none focus:border-blue-400"
                    type="text"
                    value={task.name}
                    onChange={(event) => handleEdit(event, task.id)}
                    onKeyDown={(event) => handleKeyPress(event, task.id)}
                  />
                  <button
                    className="flex items-center rounded border-2 w-20 p-1.5 gap-1"
                    onClick={() => setShowModal(false)}
                  >
                    <MdOutlineCancel />
                    Close
                  </button>
                </div>
                <div className="flex-wrap items-center">
                  <div className="mb-4">
                    <button
                      className="bg-gray-200 rounded border-2 p-1.5 mr-4"
                      onClick={() => setShowColorPicker(true)}
                    >
                      <div
                        className="w-8 h-8 rounded-full bg-black"
                        style={{ backgroundColor: color }}
                      ></div>
                      Label Color
                    </button>
                    {showColorPicker && (
                      <div className="absolute z-50">
                        <div
                          className="fixed inset-0"
                          onClick={() => setShowColorPicker(false)}
                        ></div>
                        <div className="absolute top-10">
                          <CirclePicker
                            color={color}
                            onChangeComplete={(newColor) =>
                              handleColorChange(newColor, task.id)
                            }
                          />
                        </div>
                      </div>
                    )}
                    <button
                      className="border-2 rounded p-1.5"
                      onClick={() => deleteTask(task.id)}
                    >
                      <MdDeleteOutline size={32} />
                      Delete Task
                    </button>
                  </div>
                  <div className="text-sm">
                    Date created: {new Date(task.date).toLocaleString()}
                  </div>
                </div>
              </div>
              <div className="text-sm">{task.description}</div>
            </div>
          </div>
        )}
        <div>
          <IoIosMore onClick={() => setShowModal(true)} />
        </div>
        <div id="myModal" className="modal" style={{display: showModal ? 'block' : 'none'}}
        onClick={handleClickOutside}>
         
        </div>
      </>
    );
  }

export default TaskCard;
