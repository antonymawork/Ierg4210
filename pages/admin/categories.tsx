import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faFileUpload } from "@fortawesome/free-solid-svg-icons";
import DragDropFileUpload from '../../components/admin/DragDropFileUpload';
import Image from 'next/image';
import axios from 'axios';


export default function Categories() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [csrfToken, setCsrfToken] = useState('');

  useEffect(() => {
    fetchCategories(); // Fetch categories on component mount
  }, []);

  useEffect(() => {
    // Fetch the CSRF token when the component mounts
    const fetchCsrfToken = async () => {
        try {
            const { data } = await axios.get('/api/csrf-token');
            setCsrfToken(data.csrfToken);
        } catch (error) {
            console.error('Error fetching CSRF token:', error);
        }
    };
    fetchCsrfToken();
}, []);


  const fetchCategories = () => {
    fetch('/api/categories')
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.error('There was a problem with your fetch operation:', error));
  };

  const handleAddCategory = () => {
    setShowAddForm(true); // Show the add category form
  };

  const handleDeleteCategory = () => {
    setShowDeleteForm(true); // Show the add category form
  };

  const handleLeaveForm = () => {
    setShowAddForm(false); // Hide the form
    setShowDeleteForm(false);
  };

  const handleAddCategorySubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target); // Assuming 'event.target' is your form

    if (selectedFile) {
      // Check if formData already has an 'Image' field
      if (formData.has('Image')) {
        // If it does, delete the existing 'Image'
        formData.delete('Image');
      }
    }
    formData.append('Image', selectedFile);

    // Client-side validation example
    if (!formData.get('categoryName').trim()) {
      alert('Category name is required');
      return;
    }

    formData.append('csrfToken', csrfToken); // Append CSRF token to the form data

    try {
      const response = await fetch('/api/categories/add', { // Adjust the URL to match your API route
        method: 'POST',
        body: formData, // Send the form data as the request body
      });

      if (!response.ok) throw new Error('Network response was not ok');


      alert('Category added successfully');
      fetchCategories();
      setShowAddForm(false); // Hide the form
      setSelectedFile(null); // Reset the file state
    } catch (error) {
      console.error('Failed to add category', error);
      alert('Failed to add category');
    }
  };

  const handleDeleteCategorySubmit = async (event) => {
    event.preventDefault();
  
    const categoryID = event.target.elements.categoryID.value; // Assuming your select name is 'categoryID'
  
    if (!categoryID) {
      alert('Please select a category to delete');
      return;
    }

    try {
      const response = await fetch('/api/categories/delete', {
        method: 'POST', // Using POST for simplicity, but ideally should be DELETE with body or use query parameters
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ categoryID, csrfToken }), // Send the category ID to delete
      });
  
      if (!response.ok) throw new Error('Problem deleting category');
  
      alert('Category deleted successfully');
      fetchCategories(); // Refresh the categories list
      setShowDeleteForm(false); // Close the form
    } catch (error) {
      console.error('Failed to delete category', error);
      alert('Failed to delete category');
    }
  };

  const handleFileSelect = (file) => {
    setSelectedFile(file);
  };

  return (
    <div className="text-slate-800">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-700">Categories</h1>
        <div className="space-x-4 flex items-center">
          <button onClick={handleAddCategory} className="transition hover:scale-105 bg-slate-800 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-lg">Add Category</button>
          <button onClick={handleDeleteCategory} className="transition hover:scale-105 bg-slate-800 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-lg">Delete Category</button>
        </div>
      </div>
      {showAddForm && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow w-96">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold mb-4">Add Category</h2>
              <button onClick={handleLeaveForm} className="transition hover:scale-105 text-black text-xl mb-3">
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <form onSubmit={handleAddCategorySubmit}>
              <div className="mb-4">
                <input type="text" name="categoryName" placeholder="Category Name" className="w-full px-3 py-2 border border-gray-300 rounded" required />
              </div>
              <div className="mb-4">
                <DragDropFileUpload onFileSelect={handleFileSelect} />
              </div>
              <div className="flex justify-end">
                <button type="submit" className="transition hover:scale-105 border border-gray-300 text-gray hover:bg-slate-800 hover:text-white px-4 py-2 rounded-lg">Add Category</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {showDeleteForm && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50">
            <div className="bg-white p-4 rounded-lg shadow w-96">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold mb-4">Delete Category</h2>
                <button onClick={handleLeaveForm} className="transition hover:scale-105 text-black text-xl mb-3">
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
              <form onSubmit={handleDeleteCategorySubmit}>
                <div className="mb-4">
                  <select name="categoryID" className="w-full px-3 py-2 border border-gray-300 rounded">
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category.categoryID} value={category.categoryID}>{category.categoryName}</option>
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
      <div className="overflow-x-auto mt-6 rounded-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-slate-700 text-white">
            <tr>
              <th className="text-left px-4 py-2">Image</th>
              <th className="text-left px-4 py-2">Name</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.categoryID} className="bg-white border-b">
                <td className="px-4 py-2">
                  <Image src={`/${category.categoryImagePath}`} alt={category.categoryName} layout="responsive" width={50} height={50} style={{ maxWidth: '50px' }}/>
                </td>
                <td className="px-4 py-2">{category.categoryName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
