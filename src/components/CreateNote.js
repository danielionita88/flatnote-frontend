import React from 'react'
import { Button, Form } from 'semantic-ui-react'


class CreateNote extends React.Component{

    state = {
        title: '',
        content: '',
        tags:''
    }

    handleChange= e =>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handleTagChange=e=>{
        this.setState({
            tags: e.target.value.split(',')
        })
    }

    handleSubmit= e =>{
        e.preventDefault()
        const postObj={
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept' : 'application/json'
            },
            body: JSON.stringify({
                title:this.state.title,
                content: this.state.content,
                user_id: this.props.user,
                tags: this.state.tags
            })
        }

        fetch('http://localhost:3000/notes/', postObj)
        .then(resp => resp.json())
        .then(data => {console.log(data)
            this.props.createNote(data)
            this.props.history.push('/dashboard')
        })
    }

    render(){
        return <div className='new-note'>
            <Form onSubmit={this.handleSubmit}>
                <h2>Create a note</h2>
                <br/>
                <Form.Field>
                    <span>Title</span>
                    <input onChange={this.handleChange} 
                        type='text' 
                        name='title'
                        value={this.state.title}
                    />
                <br></br>
                </Form.Field>
                <Form.Field>
                    <span>Notes</span>
                    <textarea onChange={this.handleChange}
                    name='content'
                    value={this.state.content}
                    />
                <br></br>
                </Form.Field>
                <Form.Field>
                    <span>Tags</span>
                    <input onChange={this.handleTagChange}type='text' name='tags' value={this.state.tags}/>
                </Form.Field>
                <Button type='submit'>Save</Button>

            </Form>
        </div>
    }
}

export default CreateNote