import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from 'react';
import s from './App.module.scss';
import {Notes} from './components/notes/Notes';
import {useAppSelector} from './store/store';
import {Form} from './components/form/Form';
import {useDispatch} from 'react-redux';
import {addNoteAC} from './store/notes-reducer';

export const App = React.memo(() => {

    const dispatch = useDispatch()
    const notes = useAppSelector(state => state.notes)

    const [note, setNote] = useState<string>('')
    const [tag, setTag] = useState<string>('')

    const changeNoteHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => setNote(e.currentTarget.value), [])
    const changeTagHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => setTag(e.currentTarget.value), [])

    const addNote = useCallback(() => {
        if (note.trim() !== '') {
            dispatch(addNoteAC(note))
        }
        setNote('')
    }, [dispatch, note])

    const onEnterPress = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addNote()
        }
    }, [addNote])

    const cancelSearch = useCallback(() => setTag(''), [])

    let filteredNotes = notes
    if (tag) {
        filteredNotes = notes.filter(t => t.tags?.join().includes(tag.toLowerCase()))
    }

    return (
        <div className={s.app}>
            <div className={s.forms}>
                <Form formTitle={'Add note'} buttonTitle={'Add'} value={note} onChangeValue={changeNoteHandler}
                      onClickHandler={addNote} onKeyPress={onEnterPress}/>
                <Form formTitle={'Search by tag'} buttonTitle={'Cancel'} value={tag} onChangeValue={changeTagHandler}
                      onClickHandler={cancelSearch}/>
            </div>
            <Notes notes={filteredNotes}/>
        </div>
    );
})
