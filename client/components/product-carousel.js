import React from 'react'
import Carousel from 'nuka-carousel'

export default class ProductCarousel extends React.Component {
  render() {
    return (
      <div style={{width: '80%', margin: 'auto'}}>
        <Carousel
          heightMode="first"
          style={{height: '400px'}}
          autoplay
          wrapAround={true}
        >
          <img src="/toomuchpurple.jpeg" />
          <img src="https://media.npr.org/assets/img/2015/05/19/marijuana-promo_wide-3960c528d4a1a56cddb3d8602e7cd85da5a19bae-s900.jpg" />
          <img src="https://nextshark.com/wp-content/uploads/2015/04/Screen-Shot-2015-04-30-at-5.04.02-PM-e1430438711773.png" />
        </Carousel>
      </div>
    )
  }
}
