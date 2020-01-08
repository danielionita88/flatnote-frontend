import React from 'react'
import { Button, Form } from 'semantic-ui-react'


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
        return <div className='form'>
            <Form onSubmit={this.handleSubmit}>
                <Form.Field>
                    <label>Username </label>
                    <input onChange={this.handleChange}type='text' value={this.state.username} placeholder='Username'/><br></br>
                </Form.Field>
                <Button type='submit'>Login</Button>
            </Form>
        </div>
    }
}

export default LoginForm