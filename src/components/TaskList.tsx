import { Draggable } from "react-beautiful-dnd";

export default function TaskList({ taskStore, columnId }) {

  const renderedTasks = taskStore[columnId]?.map((task) => {
       return (
        <div key={task.id}
        className="mt-10 ml-20 w-40 bg-white rounded-lg border-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50"
      >
      {task.name} 
      </div>
       )
  })

  return (
    <Draggable key={taskStore.id} draggableId={taskStore.id} index={taskStore.id}>  
    {(provided) => (
      <div {...provided.draggableProps}
      {...provided.dragHandleProps}
      ref={provided.innerRef}>
      {renderedTasks} 
    </div>
    )}
    </Draggable>
    
  );
}
