import * as ActionTypes from './actionTypes';


export const onChanged=(form)=>{
    return {
        type:ActionTypes.ON_CHANGED,
        form:form
    }
}


export const onClicked=(data)=>{
    return {
        type:ActionTypes.ON_CLICKED,
        data:data
    }
}

export const onAddUser=()=>{
    return{
        type:ActionTypes.ONADD_USER,
    }
}

export const onCancel=()=>{
    return{
        type:ActionTypes.ON_CANCEL
    }
}
export const onEdit=(value,id)=>{
    return{
        type:ActionTypes.ON_EDIT,
        edit:value,
        id:id
    }
}