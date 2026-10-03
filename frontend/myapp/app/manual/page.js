  "use client"

  import { useState } from "react";


  function Ordermanagemant(){


  const orders = [
    // Pending - 8
    {
      name: "order1",
      status: "Pending",
      customer: "rohtt",
      driver: "rahul",
      Action: "view"
    },
    {
      name: "order2",
      status: "Pending",
      customer: "amit",
      driver: "raj",
      Action: "view"
    },
    {
      name: "order3",
      status: "Pending",
      customer: "neha",
      driver: "vikas",
      Action: "view"
    },
    {
      name: "order4",
      status: "Pending",
      customer: "rohit",
      driver: "aman",
      Action: "view"
    },
    {
      name: "order5",
      status: "Pending",
      customer: "priya",
      driver: "karan",
      Action: "view"
    },
    {
      name: "order6",
      status: "Pending",
      customer: "sumit",
      driver: "mohit",
      Action: "view"
    },
    {
      name: "order7",
      status: "Pending",
      customer: "ankit",
      driver: "deepak",
      Action: "view"
    },
    {
      name: "order8",
      status: "Pending",
      customer: "pooja",
      driver: "arjun",
      Action: "view"
    },

    // In Progress - 6
    {
      name: "order9",
      status: "In Progress",
      customer: "rahul",
      driver: "vishal",
      Action: "view"
    },
    {
      name: "order10",
      status: "In Progress",
      customer: "simran",
      driver: "rohan",
      Action: "view"
    },
    {
      name: "order11",
      status: "In Progress",
      customer: "karan",
      driver: "manish",
      Action: "view"
    },
    {
      name: "order12",
      status: "In Progress",
      customer: "nikhil",
      driver: "sachin",
      Action: "view"
    },
    {
      name: "order13",
      status: "In Progress",
      customer: "divya",
      driver: "ashish",
      Action: "view"
    },
    {
      name: "order14",
      status: "In Progress",
      customer: "tanya",
      driver: "sumit",
      Action: "view"
    },

    // Delivered - 10
    {
      name: "order15",
      status: "Delivered",
      customer: "mohit",
      driver: "raj",
      Action: "view"
    },
    {
      name: "order16",
      status: "Delivered",
      customer: "anjali",
      driver: "rahul",
      Action: "view"
    },
    {
      name: "order17",
      status: "Delivered",
      customer: "varun",
      driver: "vikas",
      Action: "view"
    },
    {
      name: "order18",
      status: "Delivered",
      customer: "kavita",
      driver: "aman",
      Action: "view"
    },
    {
      name: "order19",
      status: "Delivered",
      customer: "deepak",
      driver: "karan",
      Action: "view"
    },
    {
      name: "order20",
      status: "Delivered",
      customer: "megha",
      driver: "mohit",
      Action: "view"
    },
    {
      name: "order21",
      status: "Delivered",
      customer: "sahil",
      driver: "arjun",
      Action: "view"
    },
    {
      name: "order22",
      status: "Delivered",
      customer: "riya",
      driver: "manish",
      Action: "view"
    },
    {
      name: "order23",
      status: "Delivered",
      customer: "vivek",
      driver: "rohan",
      Action: "view"
    },
    {
      name: "order24",
      status: "Delivered",
      customer: "sonam",
      driver: "ashish",
      Action: "view"
    }
  ];

const [search,setSearch]=useState("")
const [filtrstatus,setFilterStatus]=useState("All")
const [view,setView]=useState(null)


const handleSearch=(e)=>{
  const {value}=e.target
  setSearch(value)
}
  

const handleFilter=(e)=>{
  const {value}=e.target
  setFilterStatus(value)
}




     return(


      <>
      <p>total orders {orders.length}</p>

      <input className="border w-40"  type="text" placeholder="search..." value={search} onChange={handleSearch}/>

<select onChange={handleFilter}>
  <option value="All">All</option>
  <option value="Pending">Pending</option>
  <option value="In Progress">In Progress</option>
  <option value="Delivered">Delivered</option>
</select>

     {orders.filter(
      f=>
       ( f.customer.includes(search)||f.driver.includes(search))&& 
         (filtrstatus === "All" || f.status === filtrstatus))

     
     .map((item,i)=>(
        <li className="flex gap-2" key={i}>
          <p>{item.name}</p>
          <p>{item.status}</p>
          <p>{item.customer}</p>
          <p>{item.driver}</p>
<button className="border bg-gray" onClick={()=>setView(item)}>view</button>
        </li>
        
      ))}

     

{view && (
  <div>
     <p>order:{view.name}</p>
    <p>status:{view.status}</p>
    <p>customer:{view.customer}</p>
    <p>driver:{view.driver}</p>


    <button onClick={()=>setView(null)}>close</button>
  </div>

)}
      
      
      </>

     )
    }

  export default Ordermanagemant