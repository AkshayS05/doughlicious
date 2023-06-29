import { Link } from "react-router-dom"

const LinkButton = ({children, to}) => {
  const className= 'text-sm text-blue-500 hover:text-blue-600 hover:underline'
  return (
    <Link to={to} className={className}>{children}</Link>
  )
}

export default LinkButton