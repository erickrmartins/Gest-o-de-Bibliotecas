import React from 'react';

class SubCard extends React.Component {
  render() {
    return (
      <div className='mb-4 card md-3 p-4 br-12 curvatura border'>
        <div>{this.props.children}</div>
      </div>
    );
  }
}

export default SubCard;