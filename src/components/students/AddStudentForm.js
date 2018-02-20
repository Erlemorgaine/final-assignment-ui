// src/components/batches/CreateBatchButton.js
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
//import createStudent from '../../actions/batches/create'

class AddStudentForm extends PureComponent {
  static propTypes = {
    signedIn: PropTypes.bool,
  }

  saveStudent = () => {
    let newStudent = {
      name: this.refs.firstName.value + " " + this.refs.lastName.value,
      picture: this.refs.picture.value,
    }

    //this.props.createStudent(newStudent)
  }

  render() {
    if (!this.props.signedIn) return null

    return (
      <div className="CreateBatchForm">
        <h3>Add new student</h3>
        <div>
          First name:
          <input
            type="text"
            ref="firstName"/>
        </div>
        Last name:
        <div>
          <input
            type="text"
            ref="lastName"/>
        </div>
        <div>
          Picture url:
          <input
            type="text"
            ref="picture"/>
        </div>
        <RaisedButton
          label="Add student to class"
          primary={true}
          onClick={this.saveStudent} />
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser }) => ({
  signedIn: !!currentUser && !!currentUser._id,
})

export default connect(mapStateToProps, { /*createStudent*/ })(AddStudentForm)
