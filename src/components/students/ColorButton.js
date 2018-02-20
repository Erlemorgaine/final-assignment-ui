import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import './ColorButton.css'

class ColorButton extends PureComponent {
  static propTypes = {
    //onClick: PropTypes.func.isRequired,
    color: PropTypes.string.isRequired
  }

  id() {
    switch(this.props.color) {
      case 'Red' :
        return 'red'

      case 'Yellow' :
        return 'yellow'

      case 'Green' :
        return 'green'
        
    }
  }

  render() {
    const { onClick } = this.props

    return (
      <div className="colorButton" id={ this.id() } onClick={onClick}>
        <div>{ this.props.color }</div>
      </div>
    )
  }
}

export default ColorButton
