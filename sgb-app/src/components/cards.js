import React from 'react';

class Card extends React.Component {
  render() {
    return (
      <div className='card md-3 bg-transparent'>
        <div className='pb-3 pt-5'>
          <h1>{this.props.title}</h1>
          <p>{this.props.subtitle}</p>
        </div>
        <div>{this.props.children}</div>
      </div>
    );
  }
}

export default Card;