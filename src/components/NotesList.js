import React from 'react'
import {connect} from 'react-redux'





class NotesList extends React.Component{

  
    handleClick=id=>{
        this.props.handleNoteClick(id)
        this.props.history.push(`/dashboard/note/${id}`)
    }

    renderNotes = ()=>{
       return this.props.notes.map(note => <li onClick={()=>this.handleClick(note.id)} key={note.id}>{note.title}</li>)
    }

    render(){
        return <div>
            {this.renderNotes()}
        </div>
    }

}

const mapStateToProps=state=>{
    return ({
        notes: state.notes
    })
}

export default connect(mapStateToProps)(NotesList)