import React, { Component } from 'react'
import ZZ5H from './ZZ5H.gif'

export class Spinner extends Component {
  render() {
    const imageSize = {
        width: '30px', // Specify your desired width
        height: '30px', // Specify your desired height
      };
    return (
      <div>
        <img className="img-fluid" src={ZZ5H} alt="loading" style={imageSize} />
      </div>
    )
  }
}

export default Spinner
