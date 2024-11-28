import { createStore } from "redux";

const initialState = {
    darkmode: "off",
    postst: "off"
};

const reducer = (state = initialState, action) => {
    switch (action.type){
        case 'on': 
            return {...state, darkmode: 'on'};
        case 'off': 
            return {...state, darkmode: 'off'};
        case 'poston': 
            return {...state, postst: 'on'};
        case 'postoff': 
            return {...state, postst: 'off'};
        
        default:
            return state;
    }
}

export const store = createStore(reducer); 