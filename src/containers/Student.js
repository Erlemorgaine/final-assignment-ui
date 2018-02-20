import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchOneBatch, fetchPlayers } from '../actions/batches/fetch'
import { connect as subscribeToWebsocket } from '../actions/websocket'

const studentShape = PropTypes.shape({
  userId: PropTypes.string.isRequired,
  symbol: PropTypes.string,
  name: PropTypes.string
})

class Student extends PureComponent {
  static propTypes = {
    fetchOneBatch: PropTypes.func.isRequired,
    fetchPlayers: PropTypes.func.isRequired,
    subscribeToWebsocket: PropTypes.func.isRequired,
    batch: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      userId: PropTypes.string.isRequired,
      winnerId: PropTypes.string,
      students: PropTypes.arrayOf(studentShape).isRequired,
      draw: PropTypes.bool,
      updatedAt: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
    }),
    currentStudent: studentShape,
    isPlayer: PropTypes.bool,
    isJoinable: PropTypes.bool,
  }

  componentWillMount() {
    const { batch, fetchOneBatch, subscribeToWebsocket } = this.props
    const { batchId } = this.props.match.params

    if (!batch) { fetchOneBatch(batchId) }
    subscribeToWebsocket()
  }

  componentWillReceiveProps(nextProps) {
    const { batch } = nextProps

    if (batch) {
      this.props.fetchPlayers(batch)
    }
  }

  render() {
    const { batch } = this.props

    if (!batch) return null

    return (
      <div>Hello</div>
    )
  }
}

const mapStateToProps = ({ currentUser, batches }, { match }) => {
  const batch = batches.filter((b) => (b._id === match.params.batchId))[0]
  return {
    batch,
  }
}

export default connect(mapStateToProps, {
  subscribeToWebsocket,
  fetchOneBatch,
  fetchPlayers,
})(Student)
