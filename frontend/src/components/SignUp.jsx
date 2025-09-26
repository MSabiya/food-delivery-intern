
import { Link } from 'react-router-dom'

const SignUp = () => {
   
  return (
    <>
     <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-96 h-130">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <form>
            <label htmlFor="name" className='font-bold' >Name</label>
          <input
            type="name"
            placeholder="Enter Name"
            className="w-full mb-4 px-4 py-2 border rounded"
          />
          <label htmlFor="name" className='font-bold'>Email</label>
          <input
            type="email"
            placeholder="Enter Email"
            className="w-full mb-4 px-4 py-2 border rounded"
          />
           <label htmlFor="name" className='font-bold'>Password</label>
          <input
            type="password"
            placeholder="Enter Password"
            className="w-full mb-4 px-4 py-2 border rounded"
          />
          <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
            Register
          </button>
        </form><br />
        <p className='flex justify-center items-center  '>Already Have an Account</p> <br />
       <button  className="w-full bg-gray-600 text-white py-2 rounded hover:bg-darkgrat-700  active:scale-95 transition"><Link to='/login'>Login</Link></button> 
      </div>
    </div>
    </>
  )
}

export default SignUp