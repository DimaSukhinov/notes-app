import React, {ChangeEvent, KeyboardEvent} from 'react';
import s from './Form.module.scss';

type FormPropsType = {
    formTitle: string
    buttonTitle: string
    value: string
    onClickHandler: () => void
    onChangeValue: (e: ChangeEvent<HTMLInputElement>) => void
    onKeyPress?: (e: KeyboardEvent<HTMLInputElement>) => void
}

export const Form = React.memo((props: FormPropsType) => {
    return (
        <div className={s.form}>
            <h3>{props.formTitle}</h3>
            <div className={s.formGroup}>
                <input type="text" className={s.input} onChange={props.onChangeValue} value={props.value}
                       onKeyPress={props.onKeyPress}/>
                <button className={s.button} onClick={props.onClickHandler}>{props.buttonTitle}</button>
            </div>
        </div>
    );
})
