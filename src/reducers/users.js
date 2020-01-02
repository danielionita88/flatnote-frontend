const users= (state=[], action) =>{
    
    switch(action.type){
        case 'CREATE_USER':
            return {
                ...state,
                users: [...state.users, {}]
            }
        default:
        return state
    }
}

export default users