"use client";

import { useEffect, useState } from "react";
import Sidebar from "../componets/Sidebar";
import api from "../../src/axios";
import { toast } from "sonner";

function User() {
  const [data, setData] = useState([]);
  const [edit,setEdit]=useState(null)
const[form,setForm]=useState({
    name:"",
    email:""
})

  const fetchUsers = async () => {
      const res = await api.get("/user/get");
      setData(res.data.user);

 
    };
  useEffect(() => {
  

    fetchUsers();
  }, []);


  const payload={
    name:form.name,
    email:form.email
  }

  const handlechange=(e)=>{
    const{name,value}=e.target
    setForm({
        ...form,
        [name]:value
    })
  }

  const handlesave=async(id)=>{
    const res=await api.patch(`/user/update/${id}`,payload)
  toast.success("updated sucessfully")
   fetchUsers();
   setForm({
    name:"",
    email:""
   })

  }

  

  const handleedit=(item)=>{
    setEdit(item.id)
  }


  const handleDelete=async(id)=>{
  try {
    alert("are u sure to delete this user make sure it can't be recover again ")
      await api.delete(`/user/delete/${id}`)
    toast.success("deleted sucessfully")
    fetchUsers()
    
  } catch (error) {
    toast.error("error")
    
  }
  }


  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />

      <main className="ml-64 p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Users
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage and view all registered users
          </p>
        </div>

        {/* Users Card */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          {/* Card Header */}
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Users List
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                All registered users
              </p>
            </div>

            <div className="rounded-lg bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-600">
              {data.length} Users
            </div>
          </div>

          {/* User List */}
          <div className="divide-y divide-slate-100">
            {data.length > 0 ? (
              data.map((item, index) => (

               
                  <div
                  key={index}
                  className="flex items-center justify-between p-5 transition hover:bg-slate-50"
                >
                  {/* User Info */}
                  <div className="flex items-center gap-4">

                    {/* Avatar */}
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 font-bold text-white shadow-sm">
                      {item.name?.charAt(0)?.toUpperCase()}
                    </div>

                    <div>
                      <p className="font-semibold text-slate-900">
                        {item.name}
                      </p>

                      <p className="mt-1 text-sm text-slate-500">
                        {item.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">

                    {edit === item.id &&(
                        <>
                        <input className="border" type=" text" placeholder="enter email" value={form.email} name="email" onChange={handlechange} ></input>
                  <input  className="border" type=" text" placeholder="enter name" value={form.name} name="name" onChange={handlechange} ></input>

                  <button onClick={()=>handlesave(item.id)}>update</button>
                        
                        </>
                    )}

                  <button onClick={()=>handleedit(item)}>edit</button>
                  <button onClick={()=>handleDelete(item.id)}>delete</button>
                 
                </div>
                </div>
              ))
            ) : (
              <div className="px-6 py-16 text-center">

                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-2xl">
                  👤
                </div>

                <h3 className="font-semibold text-slate-800">
                  No users found
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  There are no registered users yet.
                </p>

              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default User;