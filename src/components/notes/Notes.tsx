import React, {useCallback} from 'react';
import s from './Notes.module.scss';
import DeleteIcon from '@material-ui/icons/Delete';
import {useDispatch} from 'react-redux';
import {changeNoteAC, deleteNoteAC, NotesType} from '../../store/notes-reducer';
import {EditableSpan} from '../editableSpan/EditableSpan';

type NotesPropsType = {
    notes: NotesType[]
}

export const Notes = React.memo((props: NotesPropsType) => {

    const dispatch = useDispatch()

    const deleteNote = useCallback((id: string) => () => dispatch(deleteNoteAC(id)), [dispatch])
    const onChangeNoteTitle = useCallback((id: string, newText: string) => dispatch(changeNoteAC(id, newText)), [dispatch])

    return (
        <div className={s.notes}>
            {
                props.notes.length > 0
                    ? props.notes.map(n => <div key={n.id} className={s.note}>
                        <EditableSpan id={n.id} value={n.text} onChange={onChangeNoteTitle}/>
                        {n.tags && <div className={s.tags}>
                            {n.tags.map(t => <span className={s.tag}>{t}</span>)}
                        </div>}
                        <DeleteIcon onClick={deleteNote(n.id)} className={s.deleteIcon}/>
                    </div>)
                    : <h3>There are no notes with this tag!</h3>
            }
        </div>
    );
})
