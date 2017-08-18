const messageReducer = (state = [], action) => {
    switch(action.type)
    {
        case "UPDATE_MESSAGE":
            state = [...state, action.newMessage];
            break;
     }

    return state;
};

export default messageReducer;