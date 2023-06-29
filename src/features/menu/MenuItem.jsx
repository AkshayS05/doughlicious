import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import { additem, getcurrentPizzaQuantity } from "../cart/cartSlice";
import DeleteItem from "../cart/DeleteItem";
import UpdateItemQuantity from "../cart/UpdateItemQuantity";

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  const currentQuantity = useSelector(getcurrentPizzaQuantity(id));
  const isInCart = currentQuantity > 0;
  const dispatch = useDispatch();

  const handleSubmit=()=>{
    const newItem = {
      pizzaId:id,
      name,
      unitPrice,
      quantity:1,
      totalPrice:unitPrice*1
    }
   
    dispatch(additem(newItem))    
  } 

  return (
    <li className="flex gap-4 py-2">
      <img src={imageUrl} alt={name} className={`h-24 ${soldOut ? 'grayscale opacity-70':''}`}/>
      <div className="flex flex-col grow pt-0.5">
        <p className="font-medium">{name}</p>
        <p className="text-sm italic text-stone-500 capitalize">{ingredients.join(", ")}</p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? <p className="text-sm">{formatCurrency(unitPrice)}</p> : <p className="uppercase text-sm font-medium text-stone-500">Sold out</p>}
         {isInCart && <div className="flex item-center gap-3 sm:gap-8">
          <UpdateItemQuantity pizzaId={id} currentQuantity={currentQuantity}/>
         <DeleteItem pizzaId={id}/> </div>}
          {!soldOut && !isInCart&&
          <Button type="small" onClick={handleSubmit}>Add to cart</Button>
          }
          </div>
      </div>
    </li>
  );
}

export default MenuItem;
