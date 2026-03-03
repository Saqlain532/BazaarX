import React from 'react'
import { useAppContext } from '../context/AppContext'
import axios from 'axios';
import toast from 'react-hot-toast';

const Login = () => {
  const {setShowUserLogin, setUser, axios, navigate}=useAppContext();  
  const [state, setState] = React.useState("login")

    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit =  async (e) => {
      try {
        e.preventDefault();
        const { name, email, password } = formData;
        const {data} = await axios.post(`/api/user/${state}`, {name, email, password});
        if(data.success){
          navigate('/');
          setUser(data.user);
          setShowUserLogin(false);
        }
        else{
          toast.error(data.message)
        }
      } catch (error) {
        toast.error(error.message)
      }

    }

    return (
  <div onClick={()=>setShowUserLogin(false)}
  className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">

    <form 
      onClick={(e)=>e.stopPropagation()}
      onSubmit={handleSubmit}
      className="w-95 bg-white rounded-2xl px-8 py-10 shadow-2xl"
    >
      <h1 className="text-3xl font-semibold text-primary text-center">
        {state === "login" ? "Login" : "Sign up"}
      </h1>

      <p className="text-primary-dull text-sm mt-2 text-center">
        Please sign in to continue
      </p>

      {state !== "login" && (
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="mt-6 w-full h-11 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-dull outline-none transition"
          value={formData.name}
          onChange={handleChange}
          required
        />
      )}

      <input
        type="email"
        name="email"
        placeholder="Email"
        className="mt-4 w-full h-11 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-dull outline-none transition"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        className="mt-4 w-full h-11 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-dull outline-none transition"
        value={formData.password}
        onChange={handleChange}
        required
      />

      <div className="mt-3 text-right">
        <button
          type="button"
          className="text-sm text-primary-dull hover:underline"
        >
          Forgot password?
        </button>
      </div>

      <button
        type="submit"
        className="mt-5 w-full h-11 rounded-lg text-white bg-primary hover:bg-primary-dull transition font-medium"
      >
        {state === "login" ? "Login" : "Sign up"}
      </button>

      <p
        onClick={() =>
          setState(prev => (prev === "login" ? "register" : "login"))
        }
        className="text-gray-500 text-sm mt-4 text-center cursor-pointer"
      >
        {state === "login"
          ? "Don't have an account?"
          : "Already have an account?"}
        <span className="text-shadow-primary-dull hover:underline ml-1">
          Click here
        </span>
      </p>
    </form>

  </div>
)

}

export default Login
