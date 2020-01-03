import React from 'react'
import { Button, Form } from 'semantic-ui-react'



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
        return <div className='form'>
         <Form onSubmit={this.handleSubmit}>
             <Form.Field>
                 <label>Username </label>
                 <input onChange={this.handleChange}type='text' value={this.state.username} placeholder='Username'/><br></br>
             </Form.Field>
             <Button type='submit'>Sign-up</Button>
         </Form>
     </div>
    }


}

export default SignUpForm