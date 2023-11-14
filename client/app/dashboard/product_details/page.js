"use client"
import { Colors } from '@/components/Colors';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Img } from 'react-image';

const Page = () => {
  const [ProductDetails, setProductDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const query = useSearchParams();
  const id = query.get("id");

  useEffect(() => {
    axios.get(`http://localhost:5001/api/product/product_details/${id}`)
      .then(({ data }) => {
        setProductDetails(data.productDetails);
        setLoading(false); // Set loading to false when data is loaded
      })
      .catch((error) => {
        setError(error);
        setLoading(false); // Set loading to false on error
      });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const total_price=ProductDetails.price-ProductDetails.discount
  // Now, you can safely access ProductDetails.title
  const divStyle = {
    backgroundColor: 'red',
    // Add any other CSS properties you need here
  };

  return (
    <div>
      <div className='w-full grid grid-cols-2 gap-4'>
        {/* <h1>{ProductDetails.colors}</h1> */}
        <div className='col-span-1'>
          <Img src={ProductDetails.image}></Img>
        </div>
        <div className='col-span-1'>
          <span className='text-xs font-normal uppercase mb-2'>{ProductDetails.category}</span>
          <p className='text-xl font-medium mb-4'>{ProductDetails.title}</p>
          <span className='text-sm font-500 mt-6 text-gray line-through'>${ProductDetails.price}</span>
          <span className='text-2xl font-500 text-red-500'>${ProductDetails.price - ProductDetails.discount }</span>
          <p className='text-sm text-normal mb-[30px] leading-7 justify-around'>{ProductDetails.description}</p>
          <div>
            <span className='text-sm font-normal uppercase mb-[14px]'>Colors</span>
            <div className='flex flex-wrap space-x-3'>
      {ProductDetails.colors.map(color =>(
          <div key ={color.id} onClick={()=>deleteColor(color)} className='w-[30px] h-[30px] rounded-full cursor-pointer p-3 ' style={{background:color.color}}>
  
          </div>
      ))}
      </div>

      
      

      
        
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;