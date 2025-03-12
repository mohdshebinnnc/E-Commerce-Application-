import React, { useEffect, useState } from 'react'

const MyOrder = () => {

    const [orders,setOrders]=useState(null)

    useEffect(()=>{
        setOrders()
    })

    return (
        <div className='order-continer'>
            {orders?.map((order) =>{
                return <div>
                    <img src={order.ProductImage}/>
                    <h2>{order.productName}</h2>
                    
                </div>
            })}
            
        </div>
    )
}

export default MyOrder
