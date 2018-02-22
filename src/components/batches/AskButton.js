import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import askStudent from '../../actions/batches/askStudent'

class AskButton extends PureComponent {
  static propTypes = {
    signedIn: PropTypes.bool,
  }

  calculateAskedPercentage(color) {
    const askedStudents = this.props.batch.askedStudents.filter((s) => {
      return s.evaluations[s.evaluations.length-1].color === color
    })

    if (askedStudents.length === 0) {
      return 0
    }
    return Math.round((askedStudents.length / this.props.batch.askedStudents.length) * 100)
  }

  render() {
    const { batch } = this.props
    let pickedStudent = {firstName: '', lastName: '',}

    if (batch.askedStudents.length > 0) {
      pickedStudent = batch.askedStudents[batch.askedStudents.length-1]
    }

    if (!this.props.signedIn) return null

    return (
      <div className="AskButton">
        <RaisedButton
          label="Ask a question to ... :"
          primary={true}
          onClick={() => this.props.askStudent(batch._id)} />
        <div>
          <br/>
          <img src={ pickedStudent.picture } style={{ width: 200, height: 200, backgroundSize: 'cover' }} alt={ pickedStudent.firstName }/>
          <div>{ `${pickedStudent.firstName} ${pickedStudent.lastName}` }</div>
        </div>
        <br/>
        <br/>
        <div>
          <div>{this.calculateAskedPercentage('red')}% of red students were asked</div>
          <div>{this.calculateAskedPercentage('yellow')}% of yellow students were asked</div>
          <div>{this.calculateAskedPercentage('green')}% of green students were asked</div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser }) => ({
  signedIn: !!currentUser && !!currentUser._id,
})

export default connect(mapStateToProps, {
  askStudent,
})(AskButton)
