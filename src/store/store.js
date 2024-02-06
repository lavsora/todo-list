import { configureStore } from '@reduxjs/toolkit'

import todoReducer from './todoSlice'

export default configureStore({
  reducer: {
    data: todoReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
})
