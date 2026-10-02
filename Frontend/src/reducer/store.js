
import { configureStore} from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import profileReducer from './slices/profileSlice'
import cartReducer from './slices/cartSlice'
import courseReduer from './slices/courseSlice'
import viewCourseReducer from './slices/viewCourseSlice'

export const  store = configureStore({

    reducer:{
        auth : authReducer,
        profile : profileReducer,
        cart: cartReducer,
        course : courseReduer,
        viewCourse:viewCourseReducer
    }
})