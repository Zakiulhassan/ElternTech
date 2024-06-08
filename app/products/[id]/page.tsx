import React from 'react'

const Products = ({params} : {params: {id: string}}) => {
  return (
    <div>
        <h1>Product {params.id}</h1>
    </div>
  )
}

export default Products