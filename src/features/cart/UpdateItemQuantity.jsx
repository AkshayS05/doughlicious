import { useDispatch, useSelector } from "react-redux"
import Button from "../../ui/Button"
import { decreaseQuantity, increaseQuantity} from "./cartSlice";
const UpdateItemQuantity = ({ pizzaId, currentQuantity}) => {
  const dispatch = useDispatch();

  const handleIncrement=()=>{
    dispatch(increaseQuantity(pizzaId))
  }
  const handleDecrement=()=>{
    dispatch( decreaseQuantity(pizzaId))
  }

  return (
    <div className="flex gap-1 items-center md:gap-3">
    <Button onClick={handleIncrement} type="round">+</Button>
    <span className="text-sm font-medium">{currentQuantity}</span>
  <Button onClick={handleDecrement} type="round">-</Button>
    </div>
  )
}

export default UpdateItemQuantity;