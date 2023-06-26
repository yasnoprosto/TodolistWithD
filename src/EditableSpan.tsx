import React, {ChangeEvent, useState} from 'react';

type EditableSpanPropsType = {
    title: string
    onChange:(newValue:string)=>void
}
export const EditableSpan = (props: EditableSpanPropsType) => {

    let [editMode, setEditMode] = useState<boolean>(false);
    let [title, setTitle]=useState("")

    const activateEditeMode = () => {
        setEditMode(true);
        setTitle(props.title)
    };
    const activateViewMode = () => {
        setEditMode(false);
        props.onChange(title)
    };
const onChangeHandler=(e:ChangeEvent<HTMLInputElement>)=>setTitle(e.currentTarget.value)
    return (editMode ?
            <input  value={title} onBlur={activateViewMode} onChange={onChangeHandler} autoFocus/>
            : <span onDoubleClick={activateEditeMode}>{props.title}</span>
    );
};