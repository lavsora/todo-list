import { createSlice } from '@reduxjs/toolkit'

const todoSlice = createSlice({
  name: 'data',
  initialState: {
    todos: [
      {
        id: 1,
        description: 'Completed task',
        done: true,
        status: 'completed',
        createDate: new Date(),
        playTimer: false,
        milisec: 3550000,
      },
      {
        id: 2,
        description: 'Editing task',
        done: false,
        status: 'active',
        createDate: new Date(),
        playTimer: false,
        milisec: 350000,
      },
      {
        id: 3,
        description: 'Active task',
        done: false,
        status: 'active',
        createDate: new Date(),
        playTimer: false,
        milisec: 168000,
      },
    ],
    todosFilter: [],
    todosId: Math.floor(Math.random() * 1001),
    keyFilter: 'All',
  },
  reducers: {
    onRemoveItem(state, action) {
      state.todos = state.todos.filter((item) => item.id !== action.payload.id)
    },

    onRemoveCompleted(state) {
      state.todos = state.todos.filter((item) => item.status !== 'completed')
    },

    onToggleStatus(state, action) {
      state.todos = state.todos.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, done: !item.done, status: item.done ? 'active ' : 'completed', playTimer: false }
        }

        return item
      })
    },

    onFilterSelect(state, action) {
      state.keyFilter = action.payload.label
    },

    onAddItem(state, action) {
      state.todos.push({
        id: state.todosId,
        description: action.payload.description,
        done: false,
        status: 'active',
        createDate: new Date(),
        playTimer: false,
        milisec: (+action.payload.min * 60 + +action.payload.sec) * 1000,
      })

      state.todosId += Math.floor(Math.random() * 1001)
    },

    onEditItem(state, action) {
      const findItem = state.todos.find((item) => item.id === action.payload.id)

      findItem.status = 'editing'
    },

    onEditDescriptionItem(state, action) {
      const findItem = state.todos.find((item) => item.id === action.payload.id)

      findItem.description = action.payload.editDescription
      findItem.status = 'active'
    },

    onCloseEdit(state, action) {
      if (action.payload.keyCode === 27 || !action.payload.target.classList.contains('edit')) {
        state.todos = state.todos.map((item) => {
          if (item.status === 'editing') {
            return { ...item, status: 'active' }
          }

          return item
        })
      }
    },

    onTimerChange(state, action) {
      const timerItem = state.todos.find((timer) => timer.id === action.payload.id)

      timerItem.playTimer = action.payload.playTimer
      timerItem.milisec = action.payload.milisec
      timerItem.status = action.payload.status || timerItem.status
      timerItem.done = action.payload.done || timerItem.done
    },
  },
})

export const {
  onRemoveItem,
  onRemoveCompleted,
  onToggleStatus,
  onFilterSelect,
  onAddItem,
  onEditItem,
  onEditDescriptionItem,
  onCloseEdit,
  onTimerChange,
} = todoSlice.actions

export default todoSlice.reducer
