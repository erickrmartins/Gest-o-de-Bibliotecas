import React from 'react';

class SubCard extends React.Component {
  render() {
    return (
      <div className='card md-3 bg-white p-4 shadow br-12 curvatura'>
        <div>{this.props.children}</div>
      </div>
    );
  }
}

export default SubCard;