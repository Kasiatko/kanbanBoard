import { IoIosAdd } from "react-icons/io";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Droppable, Draggable } from "react-beautiful-dnd";

function AddTask() {
  const [showInput, setShowInput] = useState<JSX.Element | Boolean>(false);
  const [addTask, setAddTask] = useState<{ name: string }>({ name: "" });
  const [tasks, setTasks] = useState<{ id: string; name: String }[]>([]);

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

  const handleAddTask = () => {
    if (addTask) {
      const newObject = {
        id: uuidv4(),
        name: addTask.name,
      };
      setTasks((prevArray) => [...prevArray, newObject]);
      setAddTask({ name: "" });
    }
  };

  // const handleDragEnd = (result) => {
  //   if (!result.destination) return;

  //   const items = Array.from(tasks);
  //   const [reorderedItem] = items.splice(result.source.index, 1);
  //   items.splice(result.destination.index, 0, reorderedItem);

  //   setTasks(items);
  // };

  const renderedTasks = tasks.map((task, index) => {
    return (
      <Draggable key={task.id} draggableId={task.id} index={index}>
        {(provided, snapshot) => (
          <div
            // key={task.id}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{...provided.draggableProps.style}}
            className="mt-10 ml-20 w-40 bg-white rounded-lg border-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50"
          >
            {task.name}
          </div>
        )}
      </Draggable>
    );
  });

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
          <form onSubmit={handleInputShow}>
            <input
              className="h-20 mt-10"
              type="text"
              value={addTask.name}
              onChange={handleChange}
            />
            <div className="flex flex-row justify-between">
              <button className="flex items-center" onClick={handleAddTask}>
                <IoIosAdd />
                Add
              </button>
              <button onClick={handleBackToInput}>Cancel</button>
            </div>
          </form>
        )}
      </div>
      <Droppable droppableId="test">
        {(provided, snapshot) => (
          <div ref={provided.innerRef} className="pb-10" {...provided.droppableProps}>
            {renderedTasks}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default AddTask;
