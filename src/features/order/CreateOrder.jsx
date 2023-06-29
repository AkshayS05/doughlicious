import { useState } from "react";
import { Form, redirect, useActionData, useNavigate, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import AnotherInput from "../../ui/AnotherInput";
import { useDispatch, useSelector } from "react-redux";
import EmptyCart from "../cart/EmptyCart";
import { clearCart, getCart, getTotalPrice } from "../cart/cartSlice";
import store from '../../store';
import { formatCurrency } from "../../utils/helpers";
import { fetchAddress } from "../user/userSlice";
// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

  function CreateOrder() {
    const navigation = useNavigation();
    const isSubmitting = navigation.state === 'submitting';
    const [withPriority, setWithPriority] = useState(false);
    const {username, status:addressStatus, position, address, error:errorAddress} = useSelector((state)=>state.user);
    const isLoadingAddress = addressStatus ==='loading';
    const cart = useSelector(getCart);
    const totalCartPrice = useSelector(getTotalPrice);
    const priorityPrice = withPriority?totalCartPrice*0.2:0;
    const totalToPay = totalCartPrice + priorityPrice;
    const dispatch= useDispatch();
    const formErrors = useActionData();

  if(!cart.length) return <EmptyCart />
  return (
    <div className="px-4 py-6">
      <h2 className="text-xl font-semibold mb-8">Ready to order? Let&apos;s go!</h2>
      {/* get method won;t work unlike patch,put, post,delete */}
      {/* <Form method="POST" action="/order/new"> */}
      <Form method="POST">
        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input type="text" name="customer" className="input" />
        </div>
        {formErrors?.phone && (<p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">{formErrors.phone}</p>)}
        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input type="tel" name="phone" className="input w-full" />
          </div>
        </div>
        <div className="relative mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input type="text" name="address" className="input w-full" defaultValue={address} disabled={isLoadingAddress} required/>
            {addressStatus==='error' && (<p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">{errorAddress}</p>)}
          </div>
      {!position.latitue &&!position.longitude&&
        <span className="absolute right-[3px] z-50 top-[3px] sm:right-[5px] md:top-[5px]">
        <Button type="small" 
        disabled={isLoadingAddress}
 
        onClick={(e)=>{
          e.preventDefault();
          dispatch(fetchAddress())}}>Get Position</Button>
        </span>
      }
        </div>

        <div className="mb-12 flex gap-5 items-center">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2 "
            value={withPriority} 
            onChange={(e) => setWithPriority(e.target.checked)}
           
          />
          <label className="font-medium" htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input type="hidden"name="position" value={position.longitude &&position.latitude?`${position.latitude},${position.longitude}`:''} />
          <Button disdabled={isLoadingAddress ||isSubmitting} type="primary">{isSubmitting?'Placing Order...':`Order now from ${formatCurrency(totalToPay)}`}</Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  //form submission will generate a request
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };
const errors = {  };
if(!isValidPhone(order.phone)) errors.phone="Please give us your correct phone number. We might need it to contact you.";

if(Object.keys(errors).length>0) return errors;

//if everything is okay, create new order and redirect
  const newOrder = await createOrder(order);
  store.dispatch(clearCart());
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
