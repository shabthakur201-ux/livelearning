    "use client"

    import { useState } from "react"
    import Sidebar from "../componets/Sidebar"
    import api from "../../src/axios";
    // import Mappicker from "../MapPicker";
   import dynamic from "next/dynamic";

const MapPicker = dynamic(() => import("../MapPicker"), {
  ssr: false,
});


    function Order(){
        console.log("start")



        // const[data,setData]=useState({
        //     pickup:"",
            
        //     dropoff:"",
        // })


        const [pickup, setPickup] = useState(null);
    const [dropoff, setDropoff] = useState(null);

    const payload = {
    pickup: pickup?.address,
    pickupLatitude: pickup?.lat,
    pickupLongitude: pickup?.lng,

    dropoff: dropoff?.address,
    dropoffLatitude: dropoff?.lat,
    dropoffLongitude: dropoff?.lng,
    };
        console.log("payload",payload)

        // const handleChange=(e)=>{
        //     const{name,value}=e.target
        //     setData({
        //         ...data,
        //         [name]:value
        //     })
        // }

    const handleSubmit = async (e) => {
    

    e.preventDefault();

    try {

        if (!pickup) {
    alert("Please select pickup location");
    return;
    }

    if (!dropoff) {
    alert("Please select dropoff location");
    return;
    }
        const res = await api.post("/externalorder/create", payload,
            {
                headers:{
                    "domain":"Google.com",
                    "apikey":"helo"
                }
            }
        );

        console.log("response:", res.data);

        alert("order placed");
    } catch (error) {
        console.log("error:", error);
    }
    };








        return(
            <>
            <div className="ml-64 p-6">

                {pickup && (
    <p>
        Pickup: {pickup.address}
    </p>
    )}

    {dropoff && (
    <p>
        Dropoff: {dropoff.address}
    </p>
    )}


            <Sidebar/>

            <div>
                <form onSubmit={handleSubmit}>
        {/* <input  type="text" placeholder="enter pickup" name="pickup" value={data.pickup} onChange={handleChange}/>
        <input  type="text" placeholder="enter dropoff" name="dropoff" value={data.dropoff} onChange={handleChange}/> */}

     <MapPicker
  pickup={pickup}
  setPickup={setPickup}
  dropoff={dropoff}
  setDropoff={setDropoff}
/>

        <button type="submit">proceed order</button>

                </form>

            </div>
        
            
            </div>
            
            </>
        )
    }

    export default Order