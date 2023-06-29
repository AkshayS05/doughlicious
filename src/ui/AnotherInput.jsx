const AnotherInput = ({ type, name}) => {
  return (
    <input className="rounded-full border border-stone-200 px-4 py-2 text-sm transition-all duration-300 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-yellow-400 w-full md:px-6 md:py-3" type={type} name={name} required>
    </input>
  )
}

export default AnotherInput;