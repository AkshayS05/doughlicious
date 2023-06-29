import { useSelector } from "react-redux"

const Input = ({ type, name}) => {
  const username = useSelector(state=>state.user.userName);
  return (
    <input className="rounded-full border border-stone-200 px-4 py-2 text-sm transition-all duration-300 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-yellow-400 md:px-6 md:py-3" type={type} name={name} defaultValue= {username} required>
    </input>
  )
}

export default Input