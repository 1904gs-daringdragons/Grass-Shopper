import React from 'react'
import Carousel from 'nuka-carousel'
import FeaturedCard from './FeaturedCard'
import {connect} from 'react-redux'
import {getFeaturedThunk} from '../store'

class ProductCarousel extends React.Component {
  componentDidMount() {
    this.props.getFeatured()
  }

  render() {
    const {featured} = this.props
    console.log(featured)
    return (
      <div style={{width: '80%', margin: 'auto'}}>
        <Carousel
          heightMode="first"
          style={{height: '400px'}}
          autoplay
          wrapAround={true}
        >
          {featured[0]
            ? featured.map(p => <FeaturedCard key={p.id} product={p} />)
            : [].map(p => <FeaturedCard product={p} />)}
        </Carousel>
      </div>
    )
  }
}

const mapState = state => ({
  featured: state.products.featuredProducts
})

const mapDispatch = dispatch => ({
  getFeatured: () => dispatch(getFeaturedThunk())
})

export default connect(mapState, mapDispatch)(ProductCarousel)

/*
 *           <img src="/toomuchpurple.jpeg" />

          <img src="https://media.npr.org/assets/img/2015/05/19/marijuana-promo_wide-3960c528d4a1a56cddb3d8602e7cd85da5a19bae-s900.jpg" />

          <img src="https://nextshark.com/wp-content/uploads/2015/04/Screen-Shot-2015-04-30-at-5.04.02-PM-e1430438711773.png" />
 */
