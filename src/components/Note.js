import React from 'react'
import { connect } from 'react-redux'
import {withRouter} from 'react-router-dom'
import { Card, Button, Form} from 'semantic-ui-react'



class Note extends React.Component{

    state={
        title: this.props.note.title,
        content: this.props.note.content,
        tags: this.props.note.tags.map(tag=>tag.name),
        isInEditMode: false
    }
    
   
    handleDelete= id=>{
        fetch(`http://localhost:3000/notes/${id}`, {method: 'DELETE'})
        .then(resp => resp.json())
        .then(data => {
            this.props.history.push('/dashboard')
            this.props.deleteNote(id)
        })
        .catch(err => console.log(err))
    }

    handleChange=e=>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSave = e =>{
        e.preventDefault()
        const reqObj={
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                title: this.state.title,
                content: this.state.content,
                tags: this.state.tags
            })
        }

        fetch(`http://localhost:3000/notes/${this.props.note.id}`, reqObj)
        .then(resp=>resp.json())
        .then(note => {
            this.props.editNote(note)
        })

        this.setState({
            isInEditMode: false
        })
    }

    handleTagChange=e=>{
        this.setState({
            tags: e.target.value.split(', ')
        })
    }

    editMode =()=>{
        return <div>
            <Form onSubmit={this.handleSave}>
                <Form.Field>
                    <span>Title:</span>
                    <input 
                        onChange={this.handleChange}
                        name='title'
                        type='text'
                        value={this.state.title}
                    />
                </Form.Field>
                <br></br>
                <Form.Field>
                    <span>Content:</span>
                    <textarea  
                        onChange={this.handleChange}
                        name='content'
                        value={this.state.content}
                    />
                </Form.Field>
                <br></br>
                <Form.Field>
                    <span>Tags:</span>
                    <input 
                    onChange={this.handleTagChange}
                    type='text' 
                    name='tags' 
                    value={this.state.tags.join(', ')}/>
                </Form.Field>
                <Button type='submit'> Save </Button>
            </Form>
        </div>
    }

    handleEdit=()=>{
        this.setState({
            isInEditMode: !this.state.isInEditMode
        })
    }

    showMode = ()=>{
        return <div>
            <Card style={{minWidth:400}}header={this.state.title}
                description={this.state.content}
                extra={ this.state.tags.length > 0 ? this.state.tags.join(', ') : this.state.tags[0]}
            />
            <Button onClick={()=>this.handleDelete(this.props.note.id)}>Delete</Button>
            <Button onClick={this.handleEdit}>Edit</Button>
        </div>
        
    }
    render(){ 
        return <div>
       { this.state.isInEditMode ? 
        this.editMode()
        :
        this.showMode()
       }
       </div>
    }
}

const mapDispatchToProps=dispatch=>{
    return{
        deleteNote: id =>dispatch({type: 'DELETE_NOTE', id}),
        editNote: note => dispatch({type:'EDIT_NOTE', note})
    }
}


export default withRouter(connect(null,mapDispatchToProps)(Note))