import React from 'react'
import {connect} from 'react-redux'
import MaterialTable from 'material-table'
import {newProductThunk, updateProductThunk, deleteProductThunk} from '../store'
import {Redirect} from 'react-router-dom'
import axios from 'axios'

class ProductManager extends React.Component {
  render() {
    if (!this.props.isAdmin) return <Redirect to="/home" />
    return (
      <MaterialTable
        title="Product Manager"
        columns={[
          {title: 'Name', field: 'name'},
          {title: 'Price', field: 'price', type: 'numeric'},
          {title: 'Quantity', field: 'quantity', type: 'numeric'},
          {title: 'Description', field: 'description'},
          {title: 'Featured', field: 'isFeatured', type: 'boolean'}
        ]}
        data={async query => {
          const res = await axios.get('/api/products')
          const tableData = res.data
          const tableRowCt = tableData.length
          const {pageSize, page} = query
          const renderData = tableData.slice(
            page * pageSize,
            page * pageSize + pageSize
          )
          return {
            data: renderData.map(product => {
              return {...product, price: (product.price / 100).toFixed(2)}
            }),
            page: page,
            totalCount: tableRowCt
          }
        }}
        options={{search: false}}
        editable={{
          onRowAdd: async newData => {
            newData.price = parseInt(newData.price * 100, 10)
            this.props.addProduct(newData)
          },
          onRowUpdate: async (newData, oldData) => {
            const {id} = oldData
            console.log(newData)

            newData.price = parseInt(newData.price * 100, 10)
            this.props.updateProduct(id, newData)
          },
          onRowDelete: async oldData => {
            const {id} = oldData
            this.props.deleteProduct(id)
          }
        }}
      />
    )
  }
}

const mapState = state => ({
  productList: state.products.allProducts,
  isAdmin: state.user.isAdmin
})

const mapDispatch = dispatch => ({
  addProduct: newData => dispatch(newProductThunk(newData)),
  updateProduct: (pId, newData) => dispatch(updateProductThunk(pId, newData)),
  deleteProduct: pId => dispatch(deleteProductThunk(pId))
})

export default connect(mapState, mapDispatch)(ProductManager)
