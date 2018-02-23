import React from 'react'
import { shallow } from 'enzyme'
import App from './App'
import Routes from './routes'
import Navigation from './components/UI/Navigation'

describe('<App />', () => {
  const app = shallow(<App />)
  const routes = <Routes />
  const nav = <Navigation />

  it('contains Routes', () => {
    expect(app).toContainReact(routes)
  })
})
