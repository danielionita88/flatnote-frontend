import React from 'react'


class CreateNote extends React.Component{

    state = {
        title: '',
        content: ''
    }

    handleChange= e =>{
        this.setState({
            [e.target.name] : e.target.value
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
                user_id: this.props.user
            })
        }

        fetch('http://localhost:3000/notes/', postObj)
        .then(resp => resp.json())
        .then(data => {
            this.props.createNote(data)
            this.setState({
                title: '',
                content: ''
            })
            this.props.history.push('/dashboard')
        })
    }

    render(){
        return <div>
            <form onSubmit={this.handleSubmit}>
                <span>Title</span>
                <input onChange={this.handleChange} type='text' name='title'value={this.state.title}/><br></br>
                <span>Notes</span>
                <textarea onChange={this.handleChange}name='content'value={this.state.content}/><br></br>
                <input type='submit' value='Save'/>

            </form>
        </div>
    }
}


export default CreateNote