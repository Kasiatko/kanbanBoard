import { Draggable } from "react-beautiful-dnd";
import TaskCard from "./TaskCard";

export default function TaskList({ taskStore, columnId, setTaskStore}) {
   

  const renderedTasks = taskStore[columnId]?.map((task, index) => {
    return (
      <Draggable key={task.id} draggableId={task.id} index={index}>
        {(provided) => (
          <div
            className="flex justify-between gap-1 mt-3 w-72 p-7 bg-white rounded border-2 font-normal text-neutral-600 dark:text-neutral-50 break-all"
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            {task.name}
            <TaskCard task={task} taskStore={taskStore} columnId={columnId} setTaskStore={setTaskStore} />
          </div>
        )}
      </Draggable>
    );
  });

  return (
    <div>{renderedTasks}</div>
  )
}
