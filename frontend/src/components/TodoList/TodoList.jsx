import { TodoItem } from "../TodoItem/TodoItem"
import './TodoList.css'

export function TodoList ({ todos, toggleTodo, deleteTodo}) {
    return (
        <div className="px-12 py-6 bg-white rounded-lg shadow-xl mt-8">
            <h1 className="header tracking-[.025em] text-black font-semibold"> Todo List</h1>
            <div className="mt-4">
                <ul className="list text-black">
                    {todos.length === 0 && "No todos"}
                    {todos.map((todo, id) => {
                        return (
                            <TodoItem
                                {...todo}
                                key={todo.id}
                                toggleTodo={toggleTodo}
                                deleteTodo={deleteTodo}
                            />
                        );
                    })}
                </ul>
            </div> 
        </div>
    )
}