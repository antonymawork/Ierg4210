// Utility function to add a product to the cart
export const addToCart = (productToAdd) => {
  // Retrieve the cart from local storage or initialize as an empty array if not found
  const existingCart = JSON.parse(localStorage.getItem('shoppingCart') || '[]');
  
  // Check if the product already exists in the cart
  const existingItem = existingCart.find(item => item.productId === productToAdd.productID);

  if (existingItem) {
    // If the product exists, increment its quantity
    existingItem.quantity += 1;
  } else {
    // If the product doesn't exist, add it to the cart with a quantity of 1
    existingCart.push({
      productId: productToAdd.productID,
      name: productToAdd.productName,
      price: productToAdd.productPrice,
      quantity: 1,
    });
  }

  // Update the cart in local storage
  localStorage.setItem('shoppingCart', JSON.stringify(existingCart));
  // Dispatch a custom event to notify other components of the cart update
  window.dispatchEvent(new Event('storage'));
  alert("Successfully added to cart")

};
