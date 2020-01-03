import React from 'react'


class SignUpForm extends React.Component{

    state = {
        username: ''
    }


    handleChange =(e)=>{
        this.setState({
            username: e.target.value
        })
    }

    handleSubmit=e=>{
        e.preventDefault()
        const postObj={
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({name: this.state.username})
        }
        fetch('http://localhost:3000/users/', postObj)
        .then(resp => resp.json())
        .then(user=> {
            if(user.message){ alert(user.message)}
            else {this.props.userLogin(user)
            this.props.history.push('/dashboard')}
        })
    }

    render(){
        return <div>
            <form onSubmit={this.handleSubmit}>
                <input onChange={this.handleChange}type='text' value={this.state.username} placeholder='Username'/><br></br>
                <input type='submit' value='SignUp'/>
            </form>
        </div>
    }


}

export default SignUpForm