import React, { useEffect, useState } from 'react'
import  { useFormik } from 'formik'
import { empValidation } from './validations/empValidation'
import { toast , ToastContainer } from 'react-toastify'
import axios from 'axios'


const Home = () => {

    const [valid , setValid] = useState(false)
    const [valid1 , setValid1] = useState(false)
    const [loading , setLoading ] = useState(false)
    const [data , setData] = useState([])
    const [check, setCheck] = useState('')
    
    const initialState = {
           empname: "",
           empdept:"",
           empdesignation:"",
           empmail:"",
           empphonenumber:""
    }
    
    const { values , errors , handleChange , handleSubmit } = useFormik({
          initialValues:initialState,
          validationSchema:empValidation,
          onSubmit:async (data)=>{
               console.log(data) 
               setLoading(true) 
               try{
                    const result = await axios.post(`${process.env.REACT_APP_HOST}/api/emp`, data)
                    if(result.status === 201){
                        setLoading(false)
                        setTimeout(()=>{
                            window.location.reload()
                        },500)
                        return toast.success("added success")
                    }
               }
               catch(err){
                   
                  if(err.response.status === 403){
                       setLoading(false)
                       return toast.error(err.response.data.message)
                  }
                   setLoading(false)
                   return toast.error(err.message)
               }
          }
    })
    
    const initialState1 = {
        empname: "",
        empdept:"",
        empdesignation:"",
        empmail:"",
        empphonenumber:""
 }

    const { values:values1 , errors:errors1 , handleChange:handleChange1 ,  handleSubmit:handleSubmit1} = useFormik({
           initialValues:initialState1,
           validationSchema:empValidation,
           onSubmit:async(data)=>{
              console.log(data , check) 
              const data1 = {
                 data,
                 check
              }
              setLoading(true)
              try{
                  const res= await axios.patch(`${process.env.REACT_APP_HOST}/api/emp` , data1)
                  console.log(res)
                  if(res.status === 201){

                        setTimeout(()=>{
                           window.location.reload()
                        },500)
                       return toast.success("Updated")
                  }
              }
              catch(err){
                   setLoading(false)
                   return toast.error(err.message)
              }
           }
    })


 const handleDelete = async(id)=>{
  
       try{
           const res = await axios.delete(`${process.env.REACT_APP_HOST}/api/emp/${id}`)
           if(res.status === 201){
                setTimeout(()=>{
                    window.location.reload() 
                },500)
                return toast.success("Deleted success")
           }
       }
       catch(err){
            return toast.error(err.message)
       }
 }

   
 useEffect(()=>{
     const res = async()=>{
       
        try{
            const output = await axios.get(`${process.env.REACT_APP_HOST}/api/emp`)
            if(output.status === 201){
                 setData(output.data.data)
            }
        }
        catch(err){
              return toast.error(err.message)  
        }
     }
     res()
 },[])
 
  return (
    <div className='container-fluid p-0'>
        <div className='container-fluid p-0'>
             <header className='container-fluid shadow border b-2 d-flex justify-content-center align-items-center' style={{height:'4rem'}}>
                  <h4>CRUD OPERATION</h4>
             </header>
             <div className='container-fluid  d-flex justify-content-center mt-4'>
                <div className='custom-css'>
                        <form className='d-flex flex-column gap-2' onSubmit={handleSubmit}>
                            <div>
                                <label className='form-label'>EmpName: </label>
                                <input type='text' placeholder='Emp Name' className='form-control'  name='empname' value={values.empname} onChange={handleChange} />
                                { valid && errors.empname  && <p className='m-0 p-0 text-danger fw-lighter'>{errors.empname}</p>} 
                            </div>
                            <div >
                                <label className='form-label'>Emp DeptName : </label>
                                <select className='form-select' name='empdept' value={values.empdept} onChange={handleChange}>
                                   <option value="" disabled defaultChecked>option</option>
                                   <option value="Finance">Finance</option>
                                   <option value="Marketing">Marketing</option>
                                   <option value="Information Technology">Information Technology</option>
                                </select>
                                { valid && errors.empdept && <p className='m-0 p-0 text-danger fw-lighter'>{errors.empdept}</p>}
                            </div>
                            <div >
                                <label className='form-label'>Emp designation: </label>
                                <input type='text' placeholder='Emp Name' className='form-control' name='empdesignation' value={values.empdesignation} onChange={handleChange} />
                                { valid && errors.empdesignation  && <p className='m-0 p-0 text-danger fw-lighter'>{errors.empdesignation}</p>}
                            </div>
                            <div>
                                <label className='form-label'>Emp mail: </label>
                                <input type='email' placeholder='Emp mail' className='form-control' name='empmail' value={values.empmail} onChange={handleChange}/>
                                { valid && errors.empmail  && <p className='m-0 p-0 text-danger fw-lighter'>{errors.empmail}</p>}
                            </div>
                            <div>
                                <label className='form-label'>Emp phonenumber: </label>
                                <input type='text' placeholder='Emp phonenumber' className='form-control' name='empphonenumber' value={values.empphonenumber} onChange={handleChange} />
                                { valid && errors.empphonenumber  && <p className='m-0 p-0 text-danger fw-lighter'>{errors.empphonenumber}</p>}
                            </div>

                            <button className='btn btn-primary' onClick={()=>setValid(true)}>
                                {
                                     loading ? <div class="d-flex justify-content-center">
                                     <div class="spinner-border" role="status">
                                        <span class="visually-hidden">Loading...</span>
                                     </div>
                                   </div> :
                                    <h6>Add</h6>
                                }
                            </button>  
                        </form>
                </div>
             </div>

             <div className='conatiner-fluid mt-4 p-4' style={{minHeight:"40vh"}}>
             <div className='table-responsive'>
                     <table class="table table-hover">
                            <thead>
                              <tr> 
                                <th scope="col">empname</th>
                                <th scope="col">emp dept</th>
                                <th scope="col">empdesignation</th>
                                <th scope="col">emp mail</th>
                                <th scope='col'>empphonenumber</th>
                                <th scope='col'>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                               {
                                  data?.map((i, index, arr)=>(
                                        <tr key={i._id}>
                                          <td>{i.empname}</td>
                                          <td>{i.empdept}</td>
                                          <td>{i.empdesignation}</td>
                                          <td>{i.empmail}</td>
                                          <td>{i.empphonenumber}</td>
                                          <td>
                                          {/* <!-- Button trigger modal --> */}
                                            <button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=> setCheck(i._id)}>
                                              Edit 
                                            </button>

                                            {/* <!-- Modal --> */}
                                            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div class="modal-dialog">
                                                <div class="modal-content">
                                                <div class="modal-header">
                                                    <h1 class="modal-title fs-5" id="exampleModalLabel">Update</h1>
                                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div class="modal-body">
                                                <form className='d-flex flex-column gap-2' onSubmit={handleSubmit1}>
                            <div>
                                <label className='form-label'>EmpName: </label>
                                <input type='text' placeholder='Emp Name' className='form-control'  name='empname' value={ values1.empname} onChange={handleChange1} />
                                { valid1 && errors1.empname  && <p className='m-0 p-0 text-danger fw-lighter'>{errors1.empname}</p>} 
                            </div>
                            <div >
                                <label className='form-label'>Emp DeptName : </label>
                                <select className='form-select' name='empdept' value={values.empdept} onChange={handleChange1}>
                                   <option value="" disabled defaultChecked>option</option>
                                   <option value="Finance">Finance</option>
                                   <option value="Marketing">Marketing</option>
                                   <option value="Information Technology">Information Technology</option>
                                </select>
                                { valid1 && errors1.empdept && <p className='m-0 p-0 text-danger fw-lighter'>{errors1.empdept}</p>}
                            </div>
                            <div >
                                <label className='form-label'>Emp designation: </label>
                                <input type='text' placeholder='Emp Name' className='form-control' name='empdesignation' value={values1.empdesignation} onChange={handleChange1} />
                                { valid1 && errors1.empdesignation  && <p className='m-0 p-0 text-danger fw-lighter'>{errors1.empdesignation}</p>}
                            </div>
                            <div>
                                <label className='form-label'>Emp mail: </label>
                                <input type='email' placeholder='Emp mail' className='form-control' name='empmail' value={values1.empmail} onChange={handleChange1}/>
                                { valid1 && errors1.empmail  && <p className='m-0 p-0 text-danger fw-lighter'>{errors1.empmail}</p>}
                            </div>
                            <div>
                                <label className='form-label'>Emp phonenumber: </label>
                                <input type='text' placeholder='Emp phonenumber' className='form-control' name='empphonenumber' value={values1.empphonenumber} onChange={handleChange1} />
                                { valid1 && errors1.empphonenumber  && <p className='m-0 p-0 text-danger fw-lighter'>{errors1.empphonenumber}</p>}
                            </div>

                            <button className='btn btn-primary' onClick={()=>setValid1(true)}>
                                {
                                     loading ? <div class="d-flex justify-content-center">
                                     <div class="spinner-border" role="status">
                                        <span class="visually-hidden">Loading...</span>
                                     </div>
                                   </div> :
                                    <h6>Update</h6>
                                }
                            </button>  
                        </form>
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                    
                                                </div>
                                                </div>
                                            </div>
                                            </div>
                                             
                                             
                                            <button className='btn btn-outline-danger' onClick={()=>handleDelete(i._id)}>Delete</button>
                                          </td>
                                        </tr>
                                  ))
                               }
                            </tbody>
                          </table>

                     </div>
             </div>
             <ToastContainer />
        </div>
    </div>
  )
}

export default Home
