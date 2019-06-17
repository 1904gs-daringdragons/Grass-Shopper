import React from 'react'
import {connect} from 'react-redux'
import MaterialTable from 'material-table'
import {addProductThunk, updateProductThunk, deleteProductThunk} from '../store'
import axios from 'axios'

class ProductManager extends React.Component {
  render() {
    return (
      <MaterialTable
        title="Product Manager"
        columns={[
          {title: 'Name', field: 'name'},
          {title: 'Price', field: 'price', type: 'numeric'},
          {title: 'Description', field: 'description'}
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
            data: renderData,
            page: page,
            totalCount: tableRowCt
          }
        }}
        editable={{
          onRowAdd: async newData => {
            this.props.addProduct(newData)
          },
          onRowUpdate: async (newData, oldData) => {
            const {id} = oldData
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
  productList: state.products.allProducts
})

const mapDispatch = dispatch => ({
  addProduct: () => dispatch(addProductThunk()),
  updateProduct: (pId, newData) => dispatch(updateProductThunk(pId, newData)),
  deleteProduct: pId => dispatch(deleteProductThunk(pId))
})

export default connect(mapState, mapDispatch)(ProductManager)
