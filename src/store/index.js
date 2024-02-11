import { configureStore } from '@reduxjs/toolkit'

import todoReducer from './slice/todo.slice'

export default configureStore({
  reducer: {
    data: todoReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
})
