import { Draggable } from "react-beautiful-dnd";

export default function TaskList({ taskStore, columnId }) {

  const renderedTasks = taskStore[columnId]?.map((task,index) => {
    return (
      <Draggable key={task.id} draggableId={task.id} index={index}>
        {(provided) => (
          <div
            className="mt-10 ml-20 w-40 bg-white rounded-lg border-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50"
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            {task.name}
          </div>
        )}
      </Draggable>
    );
  });

  return <div>{renderedTasks}</div>;
}
