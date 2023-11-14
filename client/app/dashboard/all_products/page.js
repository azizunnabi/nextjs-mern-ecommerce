"use client"
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { data } from 'autoprefixer';
import axios from 'axios';
import { useQuery } from 'react-query';
import TableSkeleton from '@/components/Skeleton/TableSkeleton';
import CustomImage from '@/components/Global/CustomImage';
import currencyformatter from "currency-formatter"
import Link from 'next/link';
import { useRouter } from 'next/router';

const columns = [
  { field: 'title', headerName: 'Title', width: 70 },
  { field: 'price', headerName: 'Price', width: 130
  
  ,renderCell:(row)=>{
    return(
    <span className="w-10 h-10">
    {currencyformatter.format(row.row.price, { code: 'USD' })} 
    </span>
  )} 
},
  { field: 'category', headerName: 'Category', width: 130 },
  { field: 'description', headerName: 'Description', width: 130 },
  { field: 'discount', headerName: 'Discount', width: 130,
  renderCell:(row)=>{
    return(
    <span className="w-10 h-10">
    %{row.row.discount} 
    </span>
  )} 
 },
  { field: 'stock', headerName: 'Stock', width: 130 },
  { field: 'image', headerName: 'Image', width: 130,renderCell:(params)=>{
    return(
    <div className="w-10 h-10">
      <CustomImage url={params.row.image} fallback={'/fallback.png'}/>
    </div>
  )} },
  
  { field: 'edit', headerName: 'Edit', width: 130,renderCell:(row)=>{
    return(
    <Link href={{
      pathname:"/dashboard/edit_product",
      query :{
        id:row.row._id,
      },
     }}>
    <button type="button" class="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-gray-800 text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 transition-all text-sm dark:focus:ring-gray-900 dark:focus:ring-offset-gray-800">
  Edit
</button>
    </Link>
  )} },

  { field: 'delete', headerName: 'Delete', width: 130,renderCell:(row)=>{
    return(
    <Link href={{
      pathname:"/dashboard/delete_product",
      query :{
        id:row.row._id,
      },
     }}>
       <button type="button" class="py-3 my-1 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">
  Delete
</button>
    </Link>
  )} },

  { field: 'details', headerName: 'Details', width: 130,renderCell:(row)=>{
    return(
    <Link href={{
      pathname:"/dashboard/product_details",
      query :{
        id:row.row._id,
      },
     }}>
    <button type="button" class="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-yellow-500 text-white hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">
  Details
</button>
    </Link>
  )} },

  
];



export default function DataTable() {
  const [products, setProducts]=React.useState([])
  const getproducts=async()=>{

    const {data}= await axios.get(`http://localhost:5001/api/product/get_products`)
    return data
  }
  const {data, isError, isFetching} = useQuery('products', getproducts)
  React.useEffect(() => {
if(!isError && !isFetching) {
setProducts(data)
}
  },[data, isError, isFetching])
 console.log(products)



 
  return (
    <div style={{ height: 400, width: '100%' }}>
    {isFetching ? <TableSkeleton />: <DataGrid
        rows={products}
        columns={columns}
        getRowId={(row)=>row._id}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />}
      
    </div>
  );
}