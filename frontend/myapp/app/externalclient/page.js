"use client"
import Link from "next/link";
import api from "../../src/axios";
import { useEffect, useState } from "react"
import { toast } from "sonner";
import Sidebar from "../componets/Sidebar";

const App = () => {
    const [form, setForm] = useState({
        allowedDomain: "",
        companyName: "",
    })

    const [data, setData] = useState([])
    const[editid,setEditid]=useState(null)
    


    const fetchClients = async () => {

        try {
            const res = await api.get("/externalclient/get")
       
            setData(res.data.data || res.data)


            // console.log("data",res.data.data)


        } catch (error) {
            console.error("Error fetching clients:", error)
        }
    }

    useEffect(() => {
        fetchClients()
        // console.log("fetchClients",fetchClients)
    }, [])

    const handlechange = (e) => {
        const { name, value } = e.target
        setForm({
            ...form,
            [name]: value
        })
    }

    const payload = {
        allowedDomain: form.allowedDomain,
        companyName: form.companyName
    }

    const handlesubmit = async (e) => {
        e.preventDefault()

        try {
            if(editid){
                await api.patch(`/externalclient/update/${editid}`,payload)
                // fetchClients()
                toast.success("sucessfully updated")
            }
           else{

               await api.post("/externalclient/create", payload)
               toast.success("Successfully created")
          


           }

          
           
            


            fetchClients()

            setForm({
                companyName: "",
                allowedDomain: ""
            })
        } catch (error) {
          toast.error(
        error.response?.data?.message || "Something went wrong"
    );
        }
    }

 

    const handledelete = async (id) => {
        try {
            await api.delete(`/externalclient/delete/${id}`)
            toast.success("Successfully deleted")
            fetchClients()
        } catch (error) {
            console.error("Error deleting client:", error)
            alert("An error occurred while deleting.")
        }
    }


    const handleEdit=(item)=>{
        setEditid(item.id)
        setForm({
            companyName:item.companyName,
            allowedDomain:item.allowedDomain
        })
    }

   return (
     <div className="min-h-screen bg-slate-50 ml-64 p-6" >
    <Sidebar/>
    {/* Header */}
    <div className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:bg-slate-100 hover:text-slate-900"
          >
            ←
          </Link>

          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              External Clients
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Manage your external client integrations
            </p>
          </div>
        </div>

        <div className="hidden rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 sm:block">
          Client Management
        </div>
      </div>
    </div>

    {/* Main Content */}
    <main className="mx-auto max-w-7xl px-6 py-8">
      <div className="grid gap-8 lg:grid-cols-3">

        {/* Form Section */}
        <div className="lg:col-span-1">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            
            {/* Form Header */}
            <div className="border-b border-slate-100 bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-5">
              <h2 className="text-lg font-semibold text-white">
                {editid ? "Update Client" : "Add New Client"}
              </h2>

              <p className="mt-1 text-sm text-blue-100">
                {editid
                  ? "Update the client information below"
                  : "Enter the client details below"}
              </p>
            </div>

            {/* Form */}
            <div className="p-6">
              <form
                onSubmit={handlesubmit}
                className="space-y-5"
              >
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Company Name
                  </label>

                  <input
                    type="text"
                    placeholder="Enter company name"
                    name="companyName"
                    value={form.companyName}
                    onChange={handlechange}
                    required
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Allowed Domain
                  </label>

                  <input
                    type="text"
                    placeholder="example.com"
                    name="allowedDomain"
                    value={form.allowedDomain}
                    onChange={handlechange}
                    required
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md active:scale-[0.98]"
                >
                  {editid ? "Update Client" : "Create Client"}
                </button>

                {editid && (
                  <p className="text-center text-xs text-slate-500">
                    You are currently editing an existing client
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* Client List */}
        <div className="lg:col-span-2">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

            {/* List Header */}
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Clients List
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  All registered external clients
                </p>
              </div>

              <div className="rounded-lg bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-600">
                {data.length} Clients
              </div>
            </div>

            {/* List */}
            <div className="divide-y divide-slate-100">
              {data && data.length > 0 ? (
                data.map((item, index) => (
                  <div
                    key={item.id || index}
                    className="group flex flex-col gap-4 p-6 transition hover:bg-slate-50 sm:flex-row sm:items-center sm:justify-between"
                  >
                    {/* Client Info */}
                    <div className="flex items-center gap-4">
                      
                      {/* Avatar */}
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-lg font-bold text-white shadow-sm">
                        {item.companyName?.charAt(0)?.toUpperCase()}
                      </div>

                      <div>
                        <h3 className="font-semibold text-slate-900">
                          {item.companyName}
                        </h3>

                        <div className="mt-1 flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-emerald-500"></span>

                          <p className="text-sm text-slate-500">
                            {item.allowedDomain}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handledelete(item.id)}
                        className="rounded-lg bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="px-6 py-16 text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-2xl">
                    👥
                  </div>

                  <h3 className="font-semibold text-slate-800">
                    No clients found
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Add your first external client using the form.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </main>
  </div>
);
}

export default App