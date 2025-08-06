import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Lock, User, LogOut, ShieldCheck, Users, MessageSquare, Calendar, Trash2, Edit, CheckCircle, XCircle, ImagePlus } from 'lucide-react';

// --- Helper to set admin token ---
const setAdminAuthToken = (token: string | null) => {
  if (token) axios.defaults.headers.common['x-admin-token'] = token;
  else delete axios.defaults.headers.common['x-admin-token'];
};

// --- Main Admin Component ---
const Admin = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loginData, setLoginData] = useState({ username: '', password: '' });
    const [activeTab, setActiveTab] = useState('Users');
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingRecord, setEditingRecord] = useState<any | null>(null);
    const [newImageData, setNewImageData] = useState({ alt: '', category: '' });
    const [newImageFile, setNewImageFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => { const token = localStorage.getItem('admin-token'); if (token) { setAdminAuthToken(token); setIsLoggedIn(true); } }, []);
    useEffect(() => { if (isLoggedIn) fetchData(activeTab); }, [isLoggedIn, activeTab]);

    const displayMessage = (setter: React.Dispatch<React.SetStateAction<string>>, message: string) => { setter(message); setTimeout(() => setter(''), 4000); };
    const fetchData = async (tab: string) => { setLoading(true); setError(''); try { const res = await axios.get(`/api/admin/${tab.toLowerCase()}`); setData(res.data); } catch (err) { displayMessage(setError, "Could not fetch data."); } finally { setLoading(false); } };

    const handleAddImage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newImageFile) { displayMessage(setError, 'Please select an image file to upload.'); return; }
        setIsUploading(true);
        const fileFormData = new FormData();
        fileFormData.append('galleryImage', newImageFile);
        try {
            const uploadRes = await axios.post('/api/admin/upload', fileFormData, { headers: { 'Content-Type': 'multipart/form-data' } });
            const { filePath } = uploadRes.data;
            const imageDetails = { src: filePath, alt: newImageData.alt, category: newImageData.category };
            await axios.post('/api/admin/gallery', imageDetails);
            displayMessage(setSuccess, 'Image added successfully!');
            setNewImageData({ alt: '', category: '' });
            setNewImageFile(null);
            const fileInput = document.getElementById('gallery-file-input') as HTMLInputElement;
            if (fileInput) fileInput.value = '';
            fetchData('Gallery');
        } catch (err: any) { displayMessage(setError, err.response?.data?.message || 'Failed to add image.');
        } finally { setIsUploading(false); }
    };

    const handleLogin = async (e: React.FormEvent) => { e.preventDefault(); setError(''); try { const res = await axios.post('/api/admin/login', loginData); const { token } = res.data; localStorage.setItem('admin-token', token); setAdminAuthToken(token); setIsLoggedIn(true); } catch (err: any) { displayMessage(setError, err.response?.data?.message || 'Login failed.'); } };
    const handleLogout = () => { localStorage.removeItem('admin-token'); setAdminAuthToken(null); setIsLoggedIn(false); setLoginData({ username: '', password: '' }); };
    const handleDelete = async (id: string, type: string) => { if (!window.confirm(`Are you sure you want to delete this ${type.slice(0, -1).toLowerCase()}?`)) return; try { await axios.delete(`/api/admin/${type.toLowerCase()}/${id}`); displayMessage(setSuccess, 'Record deleted successfully!'); fetchData(activeTab); } catch (err) { displayMessage(setError, 'Could not delete record.'); } };
    
    // --- New, more powerful update handler ---
    const handleUpdate = async (updatedData: any, newFile: File | null) => {
        let recordToUpdate = { ...updatedData };
        
        // If a new file was selected during update, upload it first
        if (newFile && activeTab === 'Gallery') {
            const fileFormData = new FormData();
            fileFormData.append('galleryImage', newFile);
            try {
                const uploadRes = await axios.post('/api/admin/upload', fileFormData);
                recordToUpdate.src = uploadRes.data.filePath; // Update the src to the new path
            } catch (err) {
                displayMessage(setError, 'New image upload failed. Update cancelled.');
                return;
            }
        }

        // Proceed to update the record in the database
        try {
            const { _id, ...dataToUpdate } = recordToUpdate;
            await axios.put(`/api/admin/${activeTab.toLowerCase()}/${_id}`, dataToUpdate);
            displayMessage(setSuccess, 'Record updated successfully!');
            fetchData(activeTab);
            setIsModalOpen(false);
            setEditingRecord(null);
        } catch (err) {
            displayMessage(setError, 'Could not update record.');
        }
    };

    const openUpdateModal = (record: any) => { setEditingRecord(record); setIsModalOpen(true); };

    if (!isLoggedIn) { return <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4"><div className="max-w-md w-full"><div className="bg-white rounded-xl shadow-lg p-8"><div className="text-center mb-8"><ShieldCheck className="h-12 w-12 text-blue-600 mx-auto mb-4" /><h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1><p className="text-gray-600 mt-2">Please login to continue</p></div><form onSubmit={handleLogin} className="space-y-6"><div><label className="block text-sm font-medium text-gray-700 mb-2">Username</label><input type="text" value={loginData.username} onChange={(e) => setLoginData(prev => ({ ...prev, username: e.target.value }))} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600" placeholder="admin" required /></div><div><label className="block text-sm font-medium text-gray-700 mb-2">Password</label><input type="password" value={loginData.password} onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600" placeholder="admin" required /></div>{error && <p className="text-red-500 text-sm text-center">{error}</p>}<button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">Login</button></form></div></div></div>; }

    const tabs = ['Users', 'Contacts', 'Bookings', 'Gallery'];
    const columns: { [key: string]: string[] } = { Users: ['Full Name', 'Email', 'Phone Number', 'Joined On'], Contacts: ['Name', 'Email', 'Phone', 'Subject', 'Submitted On'], Bookings: ['Event For', 'Event Date', 'Package', 'Guests', 'Phone', 'Booked By'], Gallery: ['Image', 'Alt Text', 'Category', 'Uploaded On'], };
    const renderGalleryManagement = () => (<div className="p-6"><h3 className="text-xl font-semibold mb-4">Add New Gallery Image</h3><form onSubmit={handleAddImage} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end mb-8 p-4 border rounded-lg bg-gray-50"><div><label className="block text-sm font-medium">Image File*</label><input id="gallery-file-input" type="file" onChange={e => setNewImageFile(e.target.files ? e.target.files[0] : null)} required className="mt-1 w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/></div><div><label className="block text-sm font-medium">Alt Text*</label><input type="text" value={newImageData.alt} onChange={e => setNewImageData({...newImageData, alt: e.target.value})} required className="mt-1 w-full p-2 border rounded-md"/></div><div><label className="block text-sm font-medium">Category*</label><input type="text" value={newImageData.category} onChange={e => setNewImageData({...newImageData, category: e.target.value})} required className="mt-1 w-full p-2 border rounded-md"/></div><button type="submit" disabled={isUploading} className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 flex items-center justify-center h-10 disabled:bg-gray-400"><ImagePlus className="h-5 w-5 mr-2"/>{isUploading ? 'Uploading...' : 'Add Image'}</button></form><h3 className="text-xl font-semibold mb-4">Manage Existing Images</h3><DataTable columns={columns.Gallery} data={data} type="Gallery" onDelete={handleDelete} onUpdate={openUpdateModal} /></div>);

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow-md"><div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8"><div className="flex justify-between items-center py-4"><div className="flex items-center space-x-3"><User className="h-8 w-8 text-blue-600" /><h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1></div><button onClick={handleLogout} className="flex items-center bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"><LogOut className="h-5 w-5 mr-2" /> Logout</button></div></div></header>
            <main className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {success && <div className="mb-4 flex items-center p-4 text-sm text-green-800 rounded-lg bg-green-100"><CheckCircle className="h-5 w-5 mr-3" /><span>{success}</span></div>}
                {error && <div className="mb-4 flex items-center p-4 text-sm text-red-800 rounded-lg bg-red-100"><XCircle className="h-5 w-5 mr-3" /><span>{error}</span></div>}
                <div className="border-b border-gray-200 mb-6"><nav className="-mb-px flex space-x-8" aria-label="Tabs">{tabs.map(tab => <button key={tab} onClick={() => setActiveTab(tab)} className={`${activeTab === tab ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}>{tab}</button>)}</nav></div>
                <div className="bg-white rounded-lg shadow-md overflow-hidden">{loading ? <div className="text-center p-8">Loading data...</div> : ( activeTab === 'Gallery' ? renderGalleryManagement() : <DataTable columns={columns[activeTab]} data={data} type={activeTab} onDelete={handleDelete} onUpdate={openUpdateModal} /> )}</div>
            </main>
            {isModalOpen && <UpdateModal record={editingRecord} type={activeTab} onUpdate={handleUpdate} onClose={() => setIsModalOpen(false)} />}
        </div>
    );
};

const DataTable = ({ columns, data, type, onDelete, onUpdate }: { columns: string[], data: any[], type: string, onDelete: (id: string, type: string) => void, onUpdate: (record: any) => void }) => {
    if (data.length === 0) return <div className="p-8 text-center text-gray-500">No {type.toLowerCase()} found.</div>;
    const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString();
    
    // FIX: This function now correctly gets all data fields, including email.
    const getDisplayValue = (item: any, column: string): React.ReactNode => {
        if (column === 'Image') return <img src={`${import.meta.env.VITE_API_BASE_URL}${item.src}`} alt={item.alt} className="h-16 w-24 object-cover rounded-md"/>;
        const value = {
            'Full Name': item.fullName, 'Email': item.email, 'Phone Number': item.phoneNumber, 'Joined On': formatDate(item.createdAt),
            'Name': item.name, 'Phone': item.phone, 'Subject': item.subject, 'Submitted On': formatDate(item.submittedAt),
            'Event For': item.name, 'Event Date': formatDate(item.eventDate), 'Package': item.packageType, 'Guests': item.guestCount,
            'Booked By': item.user?.fullName || 'User Deleted', 'Alt Text': item.alt, 'Category': item.category, 'Uploaded On': formatDate(item.createdAt)
        }[column] ?? 'N/A';
        return value;
    };

    return ( <div className="overflow-x-auto"><table className="w-full text-sm text-left text-gray-500"><thead className="text-xs text-gray-700 uppercase bg-gray-50"><tr>{columns.map(col => <th key={col} scope="col" className="px-6 py-3">{col}</th>)}<th scope="col" className="px-6 py-3 text-right">Actions</th></tr></thead><tbody>{data.map((item) => ( <tr key={item._id} className="bg-white border-b hover:bg-gray-50">{columns.map(col => <td key={col} className="px-6 py-4 whitespace-nowrap">{getDisplayValue(item, col)}</td>)}<td className="px-6 py-4 text-right flex justify-end space-x-4"><button onClick={() => onUpdate(item)} className="text-blue-500 hover:text-blue-700" title="Edit"><Edit className="h-5 w-5" /></button><button onClick={() => onDelete(item._id, type)} className="text-red-500 hover:text-red-700" title="Delete"><Trash2 className="h-5 w-5" /></button></td></tr>))}</tbody></table></div>);
};

// --- UpdateModal Component (with Image Update Capability) ---
const UpdateModal = ({ record, type, onUpdate, onClose }: { record: any, type: string, onUpdate: (data: any, file: File | null) => void, onClose: () => void }) => {
    const formatDateForInput = (dateString: string) => dateString ? new Date(dateString).toISOString().split('T')[0] : '';
    const initialRecord = { ...record, eventDate: record.eventDate ? formatDateForInput(record.eventDate) : '', };
    const [formData, setFormData] = useState(initialRecord);
    const [formError, setFormError] = useState('');
    const [newImageFile, setNewImageFile] = useState<File | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => { setFormData({ ...formData, [e.target.name]: e.target.value }); };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        if (!form.checkValidity()) { setFormError('Please fill out all required fields correctly.'); return; }
        setFormError('');
        onUpdate(formData, newImageFile); // Pass the new file (or null) to the handler
    };

    const renderFormFields = () => {
        switch (type) {
            case 'Gallery': 
                return (<>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Current Image</label>
                        <img src={`${import.meta.env.VITE_API_BASE_URL}${record.src}`} alt={record.alt} className="mt-1 h-32 w-auto object-cover rounded-md"/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Upload New Image (Optional)</label>
                        <input type="file" onChange={e => setNewImageFile(e.target.files ? e.target.files[0] : null)} className="mt-1 w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/>
                    </div>
                    <div><label className="block text-sm font-medium text-gray-700">Alt Text</label><input type="text" name="alt" value={formData.alt} onChange={handleChange} required className="mt-1 block w-full p-2 border rounded-md"/></div>
                    <div><label className="block text-sm font-medium text-gray-700">Category</label><input type="text" name="category" value={formData.category} onChange={handleChange} required className="mt-1 block w-full p-2 border rounded-md"/></div>
                </>);
            
            case 'Users': return (<><div><label className="block text-sm font-medium text-gray-700">Full Name</label><input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required className="mt-1 block w-full p-2 border rounded-md"/></div><div><label className="block text-sm font-medium text-gray-700">Email</label><input type="email" name="email" value={formData.email} onChange={handleChange} required className="mt-1 block w-full p-2 border rounded-md"/></div><div><label className="block text-sm font-medium text-gray-700">Phone Number</label><input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required className="mt-1 block w-full p-2 border rounded-md"/></div></>);
            case 'Contacts': return (<><div><label className="block text-sm font-medium text-gray-700">Name</label><input type="text" name="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full p-2 border rounded-md"/></div><div><label className="block text-sm font-medium text-gray-700">Email</label><input type="email" name="email" value={formData.email} onChange={handleChange} required className="mt-1 block w-full p-2 border rounded-md"/></div><div><label className="block text-sm font-medium text-gray-700">Subject</label><input type="text" name="subject" value={formData.subject} onChange={handleChange} required className="mt-1 block w-full p-2 border rounded-md"/></div></>);
            case 'Bookings': return (<><div><label className="block text-sm font-medium text-gray-700">Event Name</label><input type="text" name="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full p-2 border rounded-md"/></div><div><label className="block text-sm font-medium text-gray-700">Event Date</label><input type="date" name="eventDate" value={formData.eventDate} onChange={handleChange} required className="mt-1 block w-full p-2 border rounded-md"/></div><div><label className="block text-sm font-medium text-gray-700">Package</label><input type="text" name="packageType" value={formData.packageType} onChange={handleChange} required className="mt-1 block w-full p-2 border rounded-md"/></div></>);
            default: return <p>No editable fields.</p>;
        }
    };
    return ( <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4"><div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg"><h2 className="text-2xl font-bold mb-4">Edit {type.slice(0, -1)}</h2><form onSubmit={handleSubmit} noValidate><div className="space-y-4 max-h-96 overflow-y-auto pr-2">{renderFormFields()}</div>{formError && <p className="text-red-500 text-sm mt-4">{formError}</p>}<div className="mt-6 flex justify-end space-x-4"><button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Cancel</button><button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Save Changes</button></div></form></div></div>);
};

export default Admin;
