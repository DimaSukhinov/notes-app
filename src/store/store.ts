import {combineReducers, createStore} from 'redux'
import {TypedUseSelectorHook, useSelector} from 'react-redux'
import {notesReducer} from './notes-reducer';

const rootReducer = combineReducers({
    notes: notesReducer,
})

export const store = createStore(rootReducer)

export type AppRootStateType = ReturnType<typeof rootReducer>

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

// @ts-ignore
window.store = store
