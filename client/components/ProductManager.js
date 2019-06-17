import React from 'react'
import {connect} from 'react-redux'
import {MaterialTable} from 'material-table'
import {getProductsThunk} from '../store'

class ProductManager extends React.Component {
  componentDidMount() {
    this.props.getAllProducts()
  }

  render() {
    return (
      <MaterialTable
        title="Product Manager"
        columns={[
          {title: 'Name', feild: 'name'},
          {title: 'Price', feild: 'price'},
          {title: 'Image Link', feild: 'imageUrl'},
          {title: 'Description', feild: 'description'}
        ]}
        data={this.props.productList}
        editable={{
          onRowAdd: async newdata => {},
          onRowUpdate: async (newData, oldData) => {},
          onRowDelete: async oldData => {}
        }}
      />
    )
  }
}

const mapState = state => ({
  productList: state.products.allProducts
})

const mapDispatch = () => ({
  getAllProducts: () => dispatch(getProductsThunk())
})

export default connect(mapState, mapDispatch)(ProductManager)
