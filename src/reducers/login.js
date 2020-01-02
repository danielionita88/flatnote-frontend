const login=(state='', action)=>{
    switch(action.type){
        case 'LOGIN':{
            return state= action.user.id
        }
        case 'LOGOUT':
            return state= ''
        default:
            return state
    }
}

export default login