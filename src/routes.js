import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import {
  BatchContainer,
  Batch,
  Student,
  Evaluation,
  SignIn,
  SignUp
} from './containers'

export default class Routes extends Component {
  render() {
    return (
      <div className="wrapper">
        <Route exact path="/" component={BatchContainer} />
        <Route path="/showBatch/:batchId" component={Batch} />
        <Route path="/:batchId/showStudent/:studentId" component={Student} />
        <Route path="/:batchId/showEvaluation/:evaluationId}" component={Evaluation} />
        <Route path="/sign-in" component={SignIn} />
        <Route path="/sign-up" component={SignUp} />
      </div>
    )
  }
}
