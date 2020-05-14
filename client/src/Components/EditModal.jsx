import React from 'react'
import ReactModal from 'react-modal'
import {fetchNote} from '../Services/ApiMethods'
import "../Style/AboutModal.scss"


class EditModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal : false,
            content: ''
        };

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    componentDidMount() {
        this.getNote()
    }


    getNote = async () => {
        console.log("got note!" + this.props.note_id)
        let note = await fetchNote(this.props.note_id)
        console.log(note)
        this.setState(state => ({
       content: note.data.content
     }));
    }

handleChange = e => this.setState({ [e.target.name]: e.target.value })

handleSubmit= async (event) => {
    event.preventDefault();
    const obj = {
     content: this.state.content
    };
    console.log(obj)
//     updateNote()
//     this.getNote()
//     this.setState({
//       formInputs: {
//         name: ""
//       }
//     });
  }

    handleOpenModal () {
        this.setState({ showModal: true });
    }

    handleCloseModal () {
        this.setState({ showModal: false});
    }

    render() {
        return (
            <div>
                <button
                    className="update-btn "
                    onClick={this.updateClick}
                    value={this.props.userId}
                    name={this.props.note_id}
                    onClick={this.handleOpenModal}
                    >
                 update
                 </button> 
                <ReactModal 
                    isOpen={this.state.showModal} 
                    ariaHideApp={false}
                    transparent={true} 
                    contentLabel="Minimal Modal Example" 
                    className={` Modal ${this.props.color}`}
                    overlayClassName="edit-overlay" 
                    onRequestClose={this.handleCloseModal}
                    >
            <form className="create-form" onSubmit={this.handleSubmit}>
            <textarea
              type="text"
              onChange={this.handleChange}
              name="content"
              value={this.state.content}
            //   placeholder="Write thoughts and ideas here..."
              className={`input  ${this.props.color}`}
              required
            ></textarea>
            <div className="post-cont">

            <button
              type="submit"
              id="submit"
              className="btn btn-default"
            >
              Update
                  </button>
                  </div>
          </form>
                    <button 
                    id="close-button"
                    className="btn btn-default"
                    onClick={this.handleCloseModal}>Close</button>
                    </ReactModal> 
                
            </div>
        )
    }
}
export default EditModal


// export default class EditFood extends Component {
//   constructor() {
//     super()
//     this.state = {
//       name: '',
//       description: '',
//       image_url: '',
//       rating: '',
//       errorMsg: '',
//     }
//   }

//   handleChange = e => this.setState({ [e.target.name]: e.target.value })

//   render() {
//     const { name, description, image_url, rating } = this.state
//     return (
//       <div >
//         <h3>edit your post</h3>

//         {this.state.errorMsg ? (
//           <p className="error-text">{this.state.errorMsg}</p>
//         ) : null}
//       </div>
//     )
//   }
// }