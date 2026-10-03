"use client"
import { useEffect, useState } from "react";
    import api from "../../src/axios";


function Reviewpage(){

    const [review,setReview]=useState({
        name:"",
        rating:"",
        // email:"",
        userId:""
    })

    const[data,setData]=useState([])
    const[edit,setEdit]=useState(null)

    const payload={
        name:review.name,
        rating:review.rating,
        // email:review.email,
        userId:review.userId
    }


    console.log("payload",payload)

       useEffect(()=>{
        const fetchreview=async()=>{
            const res=await api.get("/review/getall")
            setData(res.data.allreviews)
            
            
        }
        fetchreview()
    },[])
    
    console.log("data",data)

    const handlechange=(e)=>{
        const{name,value}=e.target
        setReview({
            ...review,
[name]: name === "rating" || name==="userId"? parseInt(value,10) : value
        })
    }

    const handlSubmit=async(e)=>{
        e.preventDefault()
try {
    if(edit){
        const ress=await api.patch(`/review/update/${edit}`,payload)
        

    }
    else{
  
        const res=await api.post("/review/create",payload)
       
    }

    
} catch (error) {
    console.log(error.response.data.message)
    
}
    
    }

    
    
    
 
    
    
    
    const handledelete=async(id)=>{
        await api.delete(`/review/delete/${id}`)
        alert("deleted sucessfully")
        fetch()
    }
    
    const handleEdit=(item)=>{
        setEdit(item.id)
          setReview({
        name: item.name,
        rating: Number(item.rating),
        userId: Number(item.userId)
    });
        
    }
    console.log("iuytf",edit)

    return(
        <>
<form onSubmit={handlSubmit}>

    <input type="text" placeholder="enter review" name="name" value={review.name} onChange={handlechange} />
    <input type="text" placeholder="enter rating" name="rating" value={review.rating} onChange={handlechange} />
    {/* <input type="text" placeholder="enter email" name="email" value={review.email} onChange={handlechange} /> */}
    <input type="text" placeholder="enter email" name="userId" value={review.userId} onChange={handlechange} />

<button type="submit">submit review</button>

</form>



{data.map((item,i)=>(
    <li key={i} className="flex gap-2">
        <p>{item.name}</p>
        <p>{item.rating}</p>

<div className="flex gap-2">
<button onClick={()=>handleEdit(item)} className="border w-10">edit</button>
<button onClick={()=>handledelete(item.id)} className="border w-12">delete</button>
</div>
    </li>

))}

        </>
    )

}
export default Reviewpage