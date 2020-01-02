import React from 'react'
import { connect } from 'react-redux'
import {withRouter} from 'react-router-dom'

class Note extends React.Component{

    state={
        title: this.props.note.title,
        content: this.props.note.content,
        tags: this.props.note.tags,
        isInEditMode: false
    }

    handleDelete= id=>{
        fetch(`http://localhost:3000/notes/${id}`, {method: 'DELETE'})
        .then(resp => resp.json())
        .then(data => {
            this.props.history.push('/dashboard')
            this.props.deleteNote(id)
            this.setState({
                isInEditMode: false
            })
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

    handleTagChange= e =>{
        this.setState({
            tags: e.target.value.split(' ')
        })
    }

    editMode =()=>{
        const tags = this.state.tags.map(tag => tag.name)
        return <div>
            <form onSubmit={this.handleSave}>
                <span>Title:</span>
                <input 
                    onChange={this.handleChange}
                    name='title'
                    type='text'
                    value={this.state.title}
                /><br></br>
                <span>Content:</span>
                <textarea  
                    onChange={this.handleChange}
                    name='content'
                    value={this.state.content}
                /><br></br>
                <span>Tags:</span>
                <input 
                onChange={this.handleTagChange}
                type='text' 
                name='tags' 
                value={tags.join(' ')}/>
                <input type='submit' value='Save'/>
            </form>
        </div>
    }

    handleEdit=()=>{
        this.setState({
            isInEditMode: !this.state.isInEditMode
        })
    }

    showMode = ()=>{
        return <div>
            <h3>{this.state.title}</h3>
            <p>{this.state.content}</p>
            <ul>Tags:
                {this.state.tags.map(tag => <li key={tag.id}>{tag.name}</li>)}
            </ul>
            <button onClick={()=>this.handleDelete(this.props.note.id)}>Delete</button>
            <button onClick={this.handleEdit}>Edit</button>
        </div>
    }
    render(){ 
        return this.state.isInEditMode ? 
        this.editMode()
        :
        this.showMode()
    }
}

const mapDispatchToProps=dispatch=>{
    return{
        deleteNote: id =>dispatch({type: 'DELETE_NOTE', id}),
        editNote: note => dispatch({type:'EDIT_NOTE', note})
    }
}


export default withRouter(connect(null,mapDispatchToProps)(Note))