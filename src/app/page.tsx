'use client'
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {APIResponse} from "../app/models/GetAllData"
export default function Home() {
  
  const [taskList,setTaskList]= useState<APIResponse|null>(null);
  const removeData = async(id:number) =>{
    try{
      const res = await axios.post("http://127.0.0.1:3000/delete",{
        id: id
      });
      const data = res.data
      console.log(res.data)
      if (data.ResponseCode == "200"){
        toast.success("Data Removed Succesfully")
        
      }
      fetchData();
    }catch (error){
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.ResponseMessage || "An error occurred");
        console.error(error.response?.data || error.message);
      } else if (error instanceof Error) {
        toast.error(error.message);
        console.error(error.message);
      } else {
        toast.error("An unexpected error occurred");
        console.error("Unknown error", error);
      }
    }
  }

  const updateStatus = async(id:number,status:boolean)=>{
    try{
      const res = await axios.post("http://127.0.0.1:3000/update-active",{
        id:id,
        is_active:status
      });
      const data = res.data
      console.log(res.data)
      if (data.ResponseCode == "200"){
        toast.success("Data Removed Succesfully")
      }
      fetchData();
    }catch (error){
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.ResponseMessage || "An error occurred");
        console.error(error.response?.data || error.message);
      } else if (error instanceof Error) {
        toast.error(error.message);
        console.error(error.message);
      } else {
        toast.error("An unexpected error occurred");
        console.error("Unknown error", error);
      }
    }
  }

  const getId = (id:number)=>{
    removeData(id);
  }
  const fetchData = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:3000/get-all-data");
      setTaskList(res.data);
      console.log("Response:", res.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.ResponseMessage || "An error occurred");
        console.error(error.response?.data || error.message);
      } else if (error instanceof Error) {
        toast.error(error.message);
        console.error(error.message);
      } else {
        toast.error("An unexpected error occurred");
        console.error("Unknown error", error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  

  return (
    <div>
      <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
        <div className="rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
          <div className="mb-4">
            <h1 className="text-grey-darkest">Todo List</h1>
            <div className="flex mt-4">
              <input className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker" placeholder="Add Todo" />
              <button className="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-white hover:bg-teal">Add</button>
            </div>
          </div>
          <div>
            {taskList ? (
              <div>
                {taskList.data.Result?.tasks?.map((task) => (
                  <div key={task.id} className="flex mb-4 items-center">
                    {task.is_active ? (
                      <>
                        <p className="w-full text-grey-darkest">{task.title}</p>
                        <p className="w-full text-xs">{task.description}</p>
                        <button className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green border-green hover:bg-green" onClick={()=>updateStatus(task.id,false)}>Done</button>
                      </>
                    ) : (
                      <>
                        <p className="w-full line-through text-grey-darkest">{task.title}</p>
                        <p className="w-full line-through text-xs">{task.description}</p>
                        <button className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green border-green hover:bg-green" onClick={()=>updateStatus(task.id,true)}>Undone</button>
                      </>
                    )}
                    <button className="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white hover:bg-red" onClick={()=>getId(task.id)}>Remove</button>
                  </div>
                ))}
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
