import React from 'react'
import NotesList from '../components/NotesList'
import { connect } from 'react-redux'
import {Route} from 'react-router-dom'
import Note from '../components/Note'



class Dashboard extends React.Component {

    state={
        note: ''
    }

    componentDidMount(){
        fetch(`http://localhost:3000/users/${this.props.user}/notes`)
        .then(resp => resp.json())
        .then(notesData => {
            this.props.getNotes(notesData)})
    }


    handleNoteClick= id =>{
        this.setState({
            note: id
        })
        
    }



    setNote = () =>{
        
        const clickedNote=this.props.notes.find(note => note.id === this.state.note)
        
        return clickedNote
    }


    render(){
        
      return  <div>
  
        <Route path='/dashboard' component={()=><NotesList 
        handleNoteClick={this.handleNoteClick}
        history={this.props.history}
        />}/>
        <Route path='/dashboard/note/:noteId' component={()=><Note note={this.setNote()}/>}/>
        
        
        </div>
    }
}

const mapStateToProps=state=>{
    return ({
        notes: state.notes
    })
}

const mapDispatchToProps=dispatch=>{
    return ({
        getNotes: notes => dispatch({type: 'FETCH_NOTES', notes})
    })
}

export default connect(mapStateToProps,mapDispatchToProps)(Dashboard)