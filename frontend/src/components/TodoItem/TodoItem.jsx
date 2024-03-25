import './TodoItem.css'
 
export function TodoItem({completed, id, title, toggleTodo, deleteTodo}) {
    return (
        <li className="mb-1">
            <label className='w-full flex'>
                <input type="checkbox" checked={completed} onChange={(e) => toggleTodo(id, e.target.checked)} className="flex-none"/>
                <div className="grow text-black text-base ml-5">{title}</div>
                <button className="flex-none px-3 py-1.5 rounded-lg cursor-pointer focus:outline-none text-red-500 hover:text-white border border-red-500 hover:bg-red-600 focus:ring-red-800 me-1 text-sm border-2" onClick={() => deleteTodo(id)}>Delete</button>
            </label>
        </li>
    );
}