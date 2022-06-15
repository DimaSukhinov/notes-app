import {v1} from 'uuid';

const initialState: NotesType[] = [
    {id: v1(), text: 'I go to #shop and #shop1 and #shop3', tags: ['#shop', '#shop1', '#shop3']},
    {id: v1(), text: 'I like to drink #water and #tea', tags: ['#water', '#tea']},
    {id: v1(), text: 'I go to #shop and #shop1 and', tags: ['#shop', '#shop1']},
]

export const notesReducer = (state: NotesType[] = initialState, action: AppActionsType): NotesType[] => {
    switch (action.type) {
        case 'DELETE-NOTE':
            return state.filter(n => n.id !== action.id)
        case 'ADD-NOTE':
            return [{
                id: v1(),
                text: action.text,
                tags: action.text.toLowerCase().match(/#[a-zA-Zа-яА-ЯёЁ0-9_]+/g)
            }, ...state]
        case 'CHANGE-NOTE':
            return state.map(n => n.id === action.id ? {
                ...n,
                text: action.newText,
                tags: action.newText.toLowerCase().match(/#[a-zA-Zа-яА-ЯёЁ0-9_]+/g)
            } : n)
        default:
            return state
    }
}

export const deleteNoteAC = (id: string) => {
    return {type: 'DELETE-NOTE', id} as const
}
export const addNoteAC = (text: string) => {
    return {type: 'ADD-NOTE', text} as const
}
export const changeNoteAC = (id: string, newText: string) => {
    return {type: 'CHANGE-NOTE', id, newText} as const
}

export type AppActionsType =
    ReturnType<typeof deleteNoteAC>
    | ReturnType<typeof addNoteAC>
    | ReturnType<typeof changeNoteAC>

export type NotesType = {
    id: string
    text: string
    tags: string[] | null
}
