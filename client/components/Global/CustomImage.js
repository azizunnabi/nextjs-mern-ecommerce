"use client"
import { Img } from "react-image"
import {RotatingLines} from "react-loader-spinner"
const CustomImage = ({url,fallback}) => 
{
return(
    <Img 
      src={[url, fallback]}
      loader={
      <div className="flex items-center justify-center h-[200px]">
        <RotatingLines
  strokeColor="black"
  strokeWidth="5"
  animationDuration="0.75"
  width="70"
  visible={true}
/>
      </div>
      }
      className="w-full h-full object-contain"
    />
)}
  export default CustomImage