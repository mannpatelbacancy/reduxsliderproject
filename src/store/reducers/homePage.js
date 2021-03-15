import React from 'react';
import * as ActionTypes from '../actions/actionTypes';
import Input from '../../Input/Input';
const initialState={
     form:{
         id:'',
         name:'',
         email:'',
         address:'',
         mobileno:''
     },
     data:[],
     modal:false,
     edit:false,
     editId:'',
}

const reducer=(state=initialState,action)=>{
    switch(action.type){
        case ActionTypes.ON_CHANGED:{
            return{
                ...state,
                form:action.form
            }
        }
        case ActionTypes.ON_CLICKED:{
            return{
                ...state,
                data:action.data,
            }
        }
        case ActionTypes.ONADD_USER:{
            return{
                ...state,
                modal:true
            }
        }
        case ActionTypes.ON_CANCEL:{
            return{
                ...state,
                modal:false
            }
        }
        case ActionTypes.ON_EDIT:{
            return{
                ...state,
                edit:!action.edit,
                editId:action.id
            }
        }
        default:
            return state;

    }

}


export default reducer;