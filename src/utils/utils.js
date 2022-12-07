export function getItemCount(cartItems) {
  return cartItems.reduce((count, cartItem) => cartItem.quantity + count, 0);
}

export function getCartSubTotal(cartItems) {
  return cartItems.reduce((sum, {product, quantity}) => product.price * quantity + sum, 0);
}