import nodeCron from "node-cron";

 export  let lastrun=null
nodeCron.schedule(
  "*/100 * * * *",
  () => {
    lastrun = new Date();
    console.log("CRON JOB RUNNING");
    console.log("lastrun",lastrun)
  }
);
