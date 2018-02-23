import React from 'react'
import { shallow } from 'enzyme'
import ColorButton from './ColorButton'

describe('<ColorButton />', () => {
  const button = shallow(<ColorButton />)

  it('has a red button', () => {
    expect(button.find('#red')).toHaveLength(1)
  })

})
