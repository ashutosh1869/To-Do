import {createSlice, nanoid} from '@reduxjs/toolkit'
const loadFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem('todos');
        // Check if the value is not null, "undefined", or "null" (string format)
        if (serializedState && serializedState !== "undefined" && serializedState !== "null") {
            return JSON.parse(serializedState);
        }
        return []; // Return an empty array if nothing is found or if it's invalid
    } catch (e) {
        console.warn("Could not load todos from local storage", e);
        return [];
    }
}

export const initialState = {
    todos: loadFromLocalStorage()
}
export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers:{
        addTodo: (state,action)=>{
            if(action.payload){
            const todo = {
                id:nanoid(),
                text: action.payload,
                completed:false
            }
            state.todos.unshift(todo)
        } else alert("please enter a value")
        },
        removeTodo: (state, action)=>{
            state.todos = state.todos.filter((todo)=>todo.id!==action.payload)
        },
        updateTodo:(state,action)=>{
            const index = state.todos.findIndex((todo)=>todo.id===action.payload.id)
            if(index!==-1)
            {
                state.todos[index].text = action.payload.text;
            }
        },
        toggleComplete: (state,action)=>{
            const index = state.todos.findIndex((todo)=>todo.id===action.payload)
            if(index!==-1)
                {
                    state.todos[index].completed = !state.todos[index].completed
                    }
        }
    }
})
export const saveToLocalStorage = (todos) => {
    try {
        const serializedState = JSON.stringify(todos);
        localStorage.setItem('todos', serializedState);
    } catch (e) {
        console.warn("Could not save todos to local storage", e);
    }
};
export const {addTodo,removeTodo,updateTodo,toggleComplete}= todoSlice.actions
export default todoSlice.reducer