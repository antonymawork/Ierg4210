  import { useState, useEffect, useRef } from "react";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import { faTimes, faFileUpload, faPhotoVideo } from "@fortawesome/free-solid-svg-icons";
  import DragDropFileUpload from '../../components/admin/DragDropFileUpload';
  import Image from 'next/image';
  import axios from 'axios';
  import validator from 'validator';

  export default function Products() {
    const [showAddForm, setShowAddForm] = useState(false);
    const [showDeleteForm, setShowDeleteForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [categories, setCategories] = useState<any[]>([]);
    const [products, setProducts] = useState<any[]>([]);
    const [csrfToken, setCsrfToken] = useState('');

    const [selectedFile, setSelectedFile] = useState(null); // To store the selected file

    const [selectedProduct, setSelectedProduct] = useState({
      productID: "", // Initialize with default empty values
      productName: "",
      productPrice: "",
      productInventory: "",
      productDescription: "",
      categoryID: "",
    });

    const handleAddProduct = () => {
      setShowAddForm(true);
      setShowDeleteForm(false);
      setShowEditForm(false);
    };

    const handleDeleteProduct = () => {
      setShowAddForm(false);
      setShowDeleteForm(true);
      setShowEditForm(false);
    };

    const handleEditProduct = (productID) => {
      setShowAddForm(false);
      setShowDeleteForm(false);
      setShowEditForm(true);
      const productToEdit = products.find(product => product.productID === productID);
      if (productToEdit) {
        setSelectedProduct(productToEdit);
      } else {
        setSelectedProduct({
          productID: "", // Default values
          productName: "",
          productPrice: "",
          productInventory: "",
          productDescription: "",
          categoryID: "",
        });
      }
    };
    
    useEffect(() => {
      const fetchCsrfToken = async () => {
        try {
          const { data } = await axios.get('/api/csrf-token');
          setCsrfToken(data.csrfToken); // Assume you have a state variable for this
        } catch (error) {
          console.error('Error fetching CSRF token:', error);
        }
      };
      fetchCsrfToken();
    }, []);

    useEffect(() => {
      // Fetch categories from the API and set state
      fetch('/api/categories')
        .then(response => response.json())
        .then(data => setCategories(data));
    }, []);

    
    const fetchProducts = () => {
      fetch('/api/products')
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          console.log("Fetched products:", data); // Debug log
          setProducts(data);
        })
        .catch(error => console.error('There was a problem with your fetch operation:', error));
    };
    
    useEffect(() => {
      fetchProducts(); // Initial fetch of products
    }, []);


    async function handleAddProductSubmit(event) {
      event.preventDefault();

      const formData = new FormData(event.target); // Assuming 'event.target' is your form

       // Extract form data
      const productName = formData.get('productName').toString();
      const categoryID = formData.get('categoryID').toString();
      const productPrice = formData.get('productPrice').toString();
      const productInventory = formData.get('productInventory').toString();

      // Client-side validation checks
      if (validator.isEmpty(productName)) {
        alert('Product name cannot be empty');
        return;
      }

      if (!validator.isNumeric(categoryID) || validator.isEmpty(categoryID)) {
        alert('Please select a valid category');
        return;
      }

      if (!validator.isDecimal(productPrice, { decimal_digits: '0,2' })) {
        alert('Please enter a valid price');
        return;
      }

      if (!validator.isInt(productInventory, { min: 0 })) {
        alert('Inventory must be a non-negative integer');
        return;
      }

      if (selectedFile) {
        // Check if formData already has an 'Image' field
        if (formData.has('Image')) {
          // If it does, delete the existing 'Image'
          formData.delete('Image');
        }
      }
      formData.append('Image', selectedFile);
      
      formData.append('csrfToken', csrfToken); 

      try {
        const response = await fetch('/api/products/add', { // Adjust the URL to match your API route
          method: 'POST',
          body: formData, // Send the form data as the request body
        });

        const result = await response.json();

        if (response.ok) {
          alert(`Product added successfully`);
          fetchProducts();
          setShowAddForm(false);
        } else if (response.status === 409) { // Check if the response status is 409
          alert(`Error adding product: ${result.message}`);
        }
      } catch (error) {
        console.error('Failed to add product', error);
        alert('Failed to add product');
      }
    }

    const handleDeleteProductSubmit = async (event) => {
      event.preventDefault();
    
      const productID = event.target.elements.productID.value; // Assuming your select name is 'productID'
    
      // Client-side validation checks
      if (validator.isEmpty(productID)) {
        alert('Please select a product to delete.');
        return;
      }

      // Additional validation to ensure productID is a numeric value
      if (!validator.isNumeric(productID)) {
        alert('Invalid product selected.');
        return;
      }
      try {
        const response = await fetch('/api/products/delete', {
          method: 'POST', // Using POST for simplicity, but ideally should be DELETE with body or use query parameters
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ productID, csrfToken }), // Send the product ID to delete
        });
    
        if (!response.ok) throw new Error('Problem deleting product');
    
        alert('Product deleted successfully');
        fetchProducts(); // Refresh the products list
        setShowDeleteForm(false); // Close the form
      } catch (error) {
        console.error('Failed to delete product', error);
        alert('Failed to delete product');
      }
    };
    

    const handleEditProductSubmit = async (event) => {
      event.preventDefault();
    
      const formData = new FormData(event.currentTarget); // Assuming 'event.currentTarget' is your form
      const productName = formData.get('productName');
      const categoryID = formData.get('categoryID');
      const productPrice = formData.get('productPrice');
      const productInventory = formData.get('productInventory');
      const productDescription = formData.get('productDescription');
      
     // Client-side validations
      let errorMessage = '';
      if (!validator.isNumeric(categoryID ? categoryID.toString() : '')) {
      errorMessage = 'Invalid category selected.';
      } else if (!validator.isDecimal(productPrice ? productPrice.toString() : '', { decimal_digits: '0,2' })) {
      errorMessage = 'Invalid product price format.';
      } else if (!validator.isInt(productInventory ? productInventory.toString() : '', { min: 0 })) {
      errorMessage = 'Invalid product inventory.';
      } else if (!validator.isLength(productDescription ? productDescription.toString() : '', { min: 1 })) {
      errorMessage = 'Product description cannot be empty.';
      }



      if (errorMessage) {
          alert(errorMessage); // Show the error message
          return; // Stop the function execution
      }

      formData.append('csrfToken', csrfToken);

      try {
        const response = await fetch('/api/products/edit', {
          method: 'POST',
          body: JSON.stringify(Object.fromEntries(formData)),
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        if (!response.ok) throw new Error('Network response was not ok');
    
        alert('Product updated successfully');
        fetchProducts(); // Refresh the list of products
        setShowEditForm(false); // Hide the form
      } catch (error) {
        console.error('Failed to update product', error);
        alert('Failed to update product');
      }
    };

    const handleInputChange = (event) => {
      const { name, value } = event.target;
    
      // When the productID is changed, update the selectedProduct state
      if (name === "productID") {
        const productToEdit = products.find((product) => product.productID.toString() === value);
        if (productToEdit) {
          setSelectedProduct({
            productID: productToEdit.productID,
            productName: productToEdit.productName,
            productPrice: productToEdit.productPrice,
            productInventory: productToEdit.productInventory,
            productDescription: productToEdit.productDescription,
            categoryID: productToEdit.categoryID,
          });
        } else {
          // Reset the selectedProduct if no product is found (e.g., when "Select Product" option is chosen)
          setSelectedProduct({
            productID: "",
            productName: "",
            productPrice: "",
            productInventory: "",
            productDescription: "",
            categoryID: "",
          });
        }
      } else {
        // For all other inputs, update the corresponding property in the selectedProduct state
        setSelectedProduct((prevSelectedProduct) => ({
          ...prevSelectedProduct,
          [name]: value,
        }));
      }
    };
    
    

    const handleLeaveForm = () => {
      setShowAddForm(false);
      setShowDeleteForm(false);
      setShowEditForm(false);
    };

    const handleFileSelect = (file) => {
      setSelectedFile(file);
    };

    return (
      <div className="text-slate-800">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-slate-700">Products</h1>
          <div className="space-x-4 flex items-center">
            <button onClick={handleAddProduct} className="transition hover:scale-105 bg-slate-800 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-lg">Add Product</button>
            <button onClick={handleDeleteProduct} className="transition hover:scale-105 bg-slate-800 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-lg">Delete Product</button>
            <button onClick={handleEditProduct} className="transition hover:scale-105 bg-slate-800 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-lg">Edit Product</button>
          </div>
        </div>
        {showAddForm && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50">
            <div className="bg-white p-4 rounded-lg shadow w-96">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold mb-4">Add Product</h2>
                <button onClick={handleLeaveForm} className="transition hover:scale-105 text-black text-xl mb-3">
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
              <form onSubmit={handleAddProductSubmit}>
                {/* Product Name */}
                <div className="mb-4">
                  <input type="text" name="productName" placeholder="Product Name" className="w-full px-3 py-2 border border-gray-300 rounded" required />
                </div>
                {/* Category Selection */}
                <div className="mb-4">
                  <select name="categoryID" className="w-full px-3 py-2 border border-gray-300 rounded" required>
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category.categoryID} value={category.categoryID}>{category.categoryName}</option>
                    ))}
                  </select>
                </div>
                {/* Product Price */}
                <div className="mb-4">
                  <input type="number" name="productPrice" step="any" placeholder="Product Price" min="0" className="w-full px-3 py-2 border border-gray-300 rounded" required />
                </div>
                {/* Product Inventory */}
                <div className="mb-4">
                  <input type="number" name="productInventory" placeholder="Product Inventory" min="0" className="w-full px-3 py-2 border border-gray-300 rounded" required />
                </div>
                {/* Product Description */}
                <div className="mb-4">
                  <textarea name="productDescription" placeholder="Product Description" className="w-full px-3 py-2 border border-gray-300 rounded" required />
                </div>
                {/* Product Image Upload */}
                <div className="mb-4">
                  <DragDropFileUpload onFileSelect={handleFileSelect} />
                </div>
                <div className="flex justify-end">
                  <button type="submit" className="transition hover:scale-105 border border-gray-300 text-gray hover:bg-slate-800 hover:text-white px-4 py-2 rounded-lg">Add Product</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {showDeleteForm && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50">
            <div className="bg-white p-4 rounded-lg shadow w-96">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold mb-4">Delete Product</h2>
                <button onClick={handleLeaveForm} className="transition hover:scale-105 text-black text-xl mb-3">
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
              <form onSubmit={handleDeleteProductSubmit}>
                <div className="mb-4">
                  <select name="productID" className="w-full px-3 py-2 border border-gray-300 rounded">
                    <option value="">Select Product</option>
                    {products.map((product) => (
                      <option key={product.productID} value={product.productID}>{product.productName}</option>
                    ))}
                  </select>
                </div>
                <div className="flex justify-end">
                  <button type="submit" className="transition hover:scale-105 border border-gray-300 text-gray hover:bg-black hover:text-white px-4 py-2 rounded-lg">Delete</button>
                </div>
              </form>
            </div>
          </div>
        )}
        {showEditForm && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50">
            <div className="bg-white p-4 rounded-lg shadow w-96">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
                <button onClick={handleLeaveForm} className="transition hover:scale-105 text-black text-xl mb-3">
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
              <form onSubmit={handleEditProductSubmit}>
                {/* Select Product */}
                <div className="mb-4">
                  <select name="productID" value={selectedProduct.productID} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded">
                    <option value="">Select Product</option>
                    {products.map((product) => (
                      <option key={product.productID} value={product.productID}>{product.productName}</option>
                    ))}
                  </select>
                </div>
                {/* Category Selection */}
                <div className="mb-4">
                  <select name="categoryID" value={selectedProduct.categoryID} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded" required>
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category.categoryID} value={category.categoryID}>{category.categoryName}</option>
                    ))}
                  </select>
                </div>
                {/* Product Price */}
                <div className="mb-4">
                  <input type="number" name="productPrice" value={selectedProduct.productPrice} onChange={handleInputChange} step="any" placeholder="Product Price" min="0" className="w-full px-3 py-2 border border-gray-300 rounded" required />
                </div>
                {/* Product Inventory */}
                <div className="mb-4">
                  <input type="number" name="productInventory" value={selectedProduct.productInventory} onChange={handleInputChange} placeholder="Product Inventory" min="0" className="w-full px-3 py-2 border border-gray-300 rounded" required />
                </div>
                {/* Product Description */}
                <div className="mb-4">
                  <textarea name="productDescription" value={selectedProduct.productDescription} onChange={handleInputChange} placeholder="Product Description" className="w-full px-3 py-2 border border-gray-300 rounded" required />
                </div>
                <div className="flex justify-end">
                  <button type="submit" className="transition hover:scale-105 border border-gray-300 text-gray hover:bg-black hover:text-white px-4 py-2 rounded-lg">Save Changes</button>
                </div>
              </form>
            </div>
          </div>
        )}
        <div className="overflow-x-auto mt-6 rounded-lg shadow-md">
          <table className="min-w-full table-auto">
            <thead className="bg-slate-700 text-white">
              <tr>
                <th className="text-left px-4 py-2">Image</th>
                <th className="text-left px-4 py-2">Name</th>
                <th className="text-left px-4 py-2">Price</th>
                <th className="text-left px-4 py-2">Inventory</th>
                <th className="text-left px-4 py-2">Category</th>
                <th className="text-left px-4 py-2">Description</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.productID} className="bg-white border-b">
                  <td className="px-4 py-2">
                    <Image src={`/${product.productImagePath}`} alt={product.productName} layout="responsive" width={50} height={50} style={{ maxWidth: '50px' }}/>
                  </td>
                  <td className="px-4 py-2">{product.productName}</td>
                  <td className="px-4 py-2">{`$${product.productPrice}`}</td>
                  <td className="px-4 py-2">{product.productInventory}</td>
                  <td className="px-4 py-2">{categories.find(category => category.categoryID === product.categoryID)?.categoryName || 'Unknown Category'}</td>
                  <td className="px-4 py-2">{product.productDescription}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }