import { useState } from 'react'  
import './TodoForm.css'

export function TodoForm({addTodo}) {
    const [newItem, setNewItem] = useState("");

    function handleSubmit(e) {
        e.preventDefault();    // prevent website from refreshing
    
        if (newItem === "") return;

        addTodo(newItem);
        setNewItem("");   // set the box into "" after clicking add button
    }
    
    return (
        <form className="new-item-form px-12 py-6 bg-white rounded-lg shadow-xl">
            <div className="form-row">
                <label htmlFor="item" className="text-black ml-2 tracking-[.025em] font-semibold">New Item</label>
                <input type="text" id="item" value={newItem} onChange={e => setNewItem(e.target.value)} placeholder="Create a new todo..." 
                    className='border-b border-violet-700 w-50 bg-black text-slate-700 focus:outline-none'>
                </input>
            </div>  

            <div className="flex justify-center mb-2">
                <button className="btn w-60 shadow-lg" onClick={handleSubmit}>Add</button>
            </div>
        </form>
    )
}