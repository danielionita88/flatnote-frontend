import React from 'react'


class LoginForm extends React.Component{

    state = {
        username: 'Daniel'
    }


    handleChange =(e)=>{
        this.setState({
            username: e.target.value
        })
    }

    handleSubmit = e=>{
        e.preventDefault()
        fetch('http://localhost:3000/users/')
        .then(resp =>resp.json())
        .then(data=>{
            const user=data.filter(user => user.name === this.state.username)
            if(user.length > 0){
            this.props.userLogin(user[0])
            this.props.history.push('/dashboard')
            }
            else 
                alert("This user doesn't exist!Sign-up first!")
            
        })
        
    }

    render(){
        return <div>
            <form onSubmit={this.handleSubmit}>
                <input onChange={this.handleChange}type='text' value={this.state.username} placeholder='Username'/><br></br>
                <input type='submit' value='Login'/>
            </form>
        </div>
    }


}

export default LoginForm