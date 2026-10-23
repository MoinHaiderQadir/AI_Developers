import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEye, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Staff = () => {
  const [staff, setStaff] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [previewPhoto, setPreviewPhoto] = useState(null); // store File or null
  const [newStaff, setNewStaff] = useState({
    name: "",
    email: "",
    phone: "",
    staffId: "",
    address: "",
  });

  const Navigate = useNavigate();

  // Fetch staff list from backend
  const fetchStaff = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/staff/get");
      setStaff(res.data.staff);
    } catch (error) {
      console.error("Failed to fetch staff", error.message);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/staff/staffdelete/${id}`
      );
      if (res.data.success) {
        alert("Staff Deleted Successfully");
        setStaff(staff.filter((member) => member._id !== id));
      }
    } catch (error) {
      console.error("Failed to delete staff", error.message);
      alert("Error deleting staff");
    }
  };

  // Create new staff with form data and photo upload
  const handleCreate = async () => {
    if (
      !newStaff.name ||
      !newStaff.email ||
      !newStaff.phone ||
      !newStaff.staffId ||
      !newStaff.address
    ) {
      alert("Please fill in all fields");
      return;
    }

    const formData = new FormData();
    formData.append("name", newStaff.name);
    formData.append("email", newStaff.email);
    formData.append("phone", newStaff.phone);
    formData.append("staffId", newStaff.staffId);
    formData.append("address", newStaff.address);
    if (previewPhoto) {
      formData.append("photo", previewPhoto);
    }

    try {
      await axios.post("http://localhost:5000/api/staff/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      fetchStaff(); // refresh list after adding
      setShowForm(false);
      setNewStaff({ name: "", email: "", phone: "", staffId: "", address: "" });
      setPreviewPhoto(null);
    } catch (error) {
      console.error("Failed to create staff:", error.message);
      alert("Failed to create staff, please try again.");
    }
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewPhoto(file);
    }
  };

  return (
    <div className="min-h-screen bg-green-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-emerald-900">Staff Directory</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700"
        >
          + Add Staff
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-emerald-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-emerald-900 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-emerald-900 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-emerald-900 uppercase tracking-wider">
                Phone
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-emerald-900 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {staff.length > 0 ? (
              staff.map((member) => (
                <tr
                  key={member._id || member.id}
                  className="hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {member.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {member.email}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {member.phone}
                  </td>
                  <td className="px-6 py-4 text-sm text-center space-x-4">
                    <button
                      title="View"
                      onClick={() => Navigate(`/staff/${member._id}`)}
                      className="text-emerald-600 hover:text-emerald-900"
                    >
                      <FaEye className="inline h-5 w-5" />
                    </button>
                    <button
                      title="Delete"
                      onClick={() => handleDelete(member._id || member.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrash className="inline h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center p-6 text-gray-500">
                  No staff found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* View Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl text-center">
            <h3 className="text-lg font-semibold text-emerald-800 mb-4">
              Staff Details
            </h3>
            <img
              src={selected.photo || "https://via.placeholder.com/150"}
              alt="Staff"
              className="w-28 h-28 mx-auto mb-4 rounded-full object-cover border"
            />
            <p>
              <strong>Name:</strong> {selected.name}
            </p>
            <p>
              <strong>Email:</strong> {selected.email}
            </p>
            <p>
              <strong>Phone:</strong> {selected.phone}
            </p>
            <p>
              <strong>Staff ID:</strong> {selected.staffId}
            </p>
            <p>
              <strong>Address:</strong> {selected.address}
            </p>
            <button
              onClick={() => setSelected(null)}
              className="mt-6 bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Add Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-emerald-100 bg-opacity-60 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
            <h3 className="text-lg font-semibold text-emerald-800 mb-4">
              Add New Staff
            </h3>
            {["name", "email", "phone", "staffId", "address"].map((field) => (
              <input
                key={field}
                type="text"
                name={field}
                value={newStaff[field]}
                onChange={(e) =>
                  setNewStaff({ ...newStaff, [field]: e.target.value })
                }
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                className="w-full mb-3 px-3 py-2 border border-gray-300 rounded-md"
              />
            ))}
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Upload Photo
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="mb-3"
            />
            {previewPhoto && (
              <img
                src={URL.createObjectURL(previewPhoto)}
                alt="Preview"
                className="w-20 h-20 rounded-full mx-auto mb-3 object-cover border"
              />
            )}
            <div className="flex justify-between mt-4">
              <button
                onClick={handleCreate}
                className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setShowForm(false);
                  setPreviewPhoto(null);
                }}
                className="text-red-500 hover:text-red-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Staff;
