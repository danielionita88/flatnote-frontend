import React from 'react'
import NotesList from '../components/NotesList'
import { connect } from 'react-redux'
import {Route} from 'react-router-dom'
import Note from '../components/Note'
import { Grid } from 'semantic-ui-react'




class Dashboard extends React.Component {

    state={
        note: ''
    }

    componentDidMount(){
        if(this.props.user){
        fetch(`http://localhost:3000/users/${this.props.user}/notes`)
        .then(resp => resp.json())
        .then(notesData => {
            this.props.getNotes(notesData)})
        }
        else this.props.history.push('/login')
        
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
        
      return  <Grid>
            <div className='notes-list left'>
                <Grid.Column floated='right' width={5}>
                    <Route path='/dashboard' component={()=><NotesList 
                    handleNoteClick={this.handleNoteClick}
                    history={this.props.history}
                    />}/>
                </Grid.Column>
            </div>
            <div className="note right">
            <Grid.Column floated='right' width={10}>
                <Route path='/dashboard/note/:noteId' component={()=><Note 
                note={this.setNote()}
                />}/>
            </Grid.Column>
            </div>
        </Grid>
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