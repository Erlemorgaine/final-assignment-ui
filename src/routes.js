// src/routes.js
import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import {
  BatchContainer,
  Batch,
  Student,
  SignIn,
  SignUp
} from './containers'

export default class Routes extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={BatchContainer} />
        <Route path="/showBatch/:batchId" component={Batch} />
        <Route path="/showStudent/:studentId" component={Student} />
        <Route path="/sign-in" component={SignIn} />
        <Route path="/sign-up" component={SignUp} />
      </div>
    )
  }
}
