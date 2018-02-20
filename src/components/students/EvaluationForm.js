import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ColorButton from './ColorButton'

let colorEvaluation = ""

class EvaluationForm extends PureComponent {

  createEvaluation = () => {

    let newEvaluation = {
      date: this.refs.date.value,
      remarks: this.refs.remarks.value,
    }
  }

  pickColor = (color) => {
    colorEvaluation = color
  }

  render() {

    return (
      <form>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', flexFlow: 'row wrap' }}>
            <ColorButton color="Red" onClick={this.pickColor}/>
            <ColorButton color="Yellow" onClick={this.pickColor}/>
            <ColorButton color="Green" onClick={this.pickColor}/>
            <br/>
          </div>
          <span>
            <p>Remarks:</p>
            <textarea
              name="textarea"
              id=""
              cols="30"
              rows="10"
              ref="remarks">
            </textarea>
          </span>
          <span>
            <p>Evaluation date:</p>
            <input
              type="date"
              ref="date"/>
          </span>
          <br/>
          <input type="submit" value="Submit"/>
        </div>
      </form>
    )
  }
}

export default EvaluationForm
