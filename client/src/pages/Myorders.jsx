import React, {  useEffect, useState } from 'react'
import {useAppContext} from '../context/AppContext'
import {  dummyOrders } from '../assets/assets';

const Myorders = () => {
  
  const [myOrders, setMyOrders] = useState([]);
  const {currency, user , axios} = useAppContext(); 
  

  const fetchMyOrders = async ()=>{
       
        try {
          const {data} = await axios.get('/api/order/user', { params: { userId: user._id } });
          if(data.success){
            setMyOrders(data.orders);
          }
        } catch (error) {
          console.log(error)
        }
        
  };

  useEffect(()=>{
    if(user){
      fetchMyOrders();
    }
  }, [user]);



  return (
   <div className='mt-16 pb-16'>
  <div className='flex flex-col items-start mb-10'>
    <p className='text-3xl font-semibold uppercase tracking-wide'>
      My Orders
    </p>
    <div className='w-20 h-1 bg-primary rounded-full mt-2'></div>
  </div>

  {myOrders.map((order, index) => (
    <div
      key={index}
      className='border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 rounded-xl mb-8 p-6 bg-white'
    >
      {/* Order Header */}
      <div className='flex flex-col md:flex-row md:justify-between md:items-center text-gray-600 text-sm font-medium gap-2 border-b pb-4 mb-4'>
        <span><span className='text-gray-400'>Order ID:</span> {order._id}</span>
        <span><span className='text-gray-400'>Payment:</span> {order.paymentType}</span>
        <span><span className='text-gray-400'>Total:</span> {currency}{order.amount}</span>
      </div>

      {/* Order Items */}
      {order.items.map((item, i) => (
        <div key={i} className='flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-6'>
          
          {/* Product Info */}
          <div className='flex items-center gap-4'>
            <div className='bg-primary/10 p-3 rounded-lg'>
              <img
                src={item.product.image[0]}
                alt=""
                className='w-20 h-20 object-cover rounded-md'
              />
            </div>

            <div>
              <h2 className='text-lg font-semibold text-gray-800'>
                {item.product.name}
              </h2>
              <p className='text-sm text-gray-500'>
                Category: {item.product.category}
              </p>
            </div>
          </div>

          {/* Order Details */}
          <div className='text-sm text-gray-600 space-y-1'>
            <p>Quantity: {item.quantity || 1}</p>
            <p>
              Status:
              <span className='ml-2 px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700'>
                {order.status}
              </span>
            </p>
            <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
          </div>

          {/* Price */}
          <div className='text-lg font-semibold text-primary'>
            {currency}{item.product.offerPrice * item.quantity}
          </div>
        </div>
      ))}
    </div>
  ))}
</div>
  )
}

export default Myorders
