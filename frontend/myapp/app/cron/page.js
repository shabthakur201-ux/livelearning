"use client";

import { useEffect, useState } from "react";
import api from "../../src/axios";
import Sidebar from "../componets/Sidebar";

function App() {
  const [data, setData] = useState([]);

  console.log("1. COMPONENT RENDERED");

  useEffect(() => {
    console.log("2. USE EFFECT RUNNING");

    const fetchdata = async () => {
      console.log("3. FETCHDATA STARTED");

      try {
        console.log("4. BEFORE API");

        const res = await api.get("/cron/getcrondata");

        console.log("5. API SUCCESS");
        console.log("6. RESPONSE:", res);
        console.log("7. DATA:", res.data.data);

        setData(res.data.data.lastrun);
      } catch (error) {
        console.log("8. API ERROR:", error);
      }
    };

    fetchdata();
  }, []);

  return (
    <div className="ml-64 p-6">
      <Sidebar />

      <div>
          <p>CRON JOB RUNNING=== {data}</p>

      </div>
    </div>
  );
}

export default App; 