import { Draggable } from "react-beautiful-dnd";

export default function TaskList({ taskStore, columnId }) {

  const renderedTasks = taskStore.map((task) => {
    <Draggable key={task.id} draggableId={task.id} index={columnId}>
    {(provided, snapshot) => (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        style={{ ...provided.draggableProps.style }}
        className="mt-10 ml-20 w-40 bg-white rounded-lg border-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50"
      >
        {task.name}
      </div>
    )}
  </Draggable>
  })

  return (
    <div>
      {renderedTasks}
    </div>
  );
}
