"use client"
// pages/profile.tsx
import { useSession, signOut } from 'next-auth/react';
import { useState, useEffect } from 'react';
import Image from 'next/image';

interface Category {
  id: string;
  name: string;
  description?: string;
  channels: string[];
  userId: string;
}

export default function ProfilePage() {
  const { data: session } = useSession();
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [newCategory, setNewCategory] = useState({ name: '', description: '' });
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [newChannel, setNewChannel] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch('/api/categories');
      const data = await res.json();
      setCategories(data);
    };
    if (session?.user) fetchCategories();
  }, [session]);

  const filteredCategories = categories.filter(category => {
    const searchTerm = searchQuery.toLowerCase();
    const categoryName = category.name?.toLowerCase() || '';
    const hasMatchingChannel = category.channels?.some(channel => 
      channel?.toLowerCase()?.includes(searchTerm)
    );
    
    return categoryName.includes(searchTerm) || hasMatchingChannel;
  });

  // Category CRUD Operations
  const createCategory = async () => {
    const res = await fetch('/api/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        ...newCategory,
        channels: [] 
      }),
    });
    const data = await res.json();
    setCategories([...categories, data]);
    setNewCategory({ name: '', description: '' });
  };

  const updateCategory = async () => {
    if (!editingCategory) return;
    const res = await fetch(`/api/categories/${editingCategory.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editingCategory),
    });
    const data = await res.json();
    setCategories(categories.map(cat => cat.id === data.id ? data : cat));
    setEditingCategory(null);
  };

  const deleteCategory = async (id: string) => {
    await fetch(`/api/categories/${id}`, { method: 'DELETE' });
    setCategories(categories.filter(cat => cat.id !== id));
  };

  // Channel Operations
  const addChannel = async (categoryId: string) => {
    if (!newChannel.includes('youtube.com')) {
      alert('Please enter a valid YouTube URL');
      return;
    }

    const category = categories.find(c => c.id === categoryId);
    if (!category) return;

    const updatedCategory = {
      ...category,
      channels: [...category.channels, newChannel]
    };

    const res = await fetch(`/api/categories/${categoryId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedCategory),
    });

    if (res.ok) {
      setCategories(categories.map(c => c.id === categoryId ? updatedCategory : c));
      setNewChannel('');
    }
  };

  const removeChannel = async (categoryId: string, index: number) => {
    const category = categories.find(c => c.id === categoryId);
    if (!category) return;

    const updatedChannels = category.channels.filter((_, i) => i !== index);
    const updatedCategory = { ...category, channels: updatedChannels };

    const res = await fetch(`/api/categories/${categoryId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedCategory),
    });

    if (res.ok) {
      setCategories(categories.map(c => c.id === categoryId ? updatedCategory : c));
    }
  };

  if (!session) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      {/* User Info Section */}
      <div className="mb-8 p-4 bg-white rounded-lg shadow">
        <div className="flex items-center gap-4">
          <Image 
            src={session.user?.image || '/placeholder.png'} 
            alt="Profile" 
            className="w-16 h-16 rounded-full"
            width={64}
            height={64}
          />
          <div>
            <h1 className="text-2xl font-bold">{session.user?.name}</h1>
            <p className="text-gray-600">{session.user?.email}</p>
          </div>
        </div>
        <button 
          onClick={() => signOut({ callbackUrl: '/' })}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Sign Out
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search categories or channels..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Category Form */}
      <div className="mb-8 p-4 bg-white rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">
          {editingCategory ? 'Edit Category' : 'New Category'}
        </h2>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Category name"
            value={editingCategory ? editingCategory.name : newCategory.name}
            onChange={(e) => editingCategory 
              ? setEditingCategory({...editingCategory, name: e.target.value})
              : setNewCategory({...newCategory, name: e.target.value})
            }
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Description (optional)"
            value={editingCategory ? editingCategory.description : newCategory.description}
            onChange={(e) => editingCategory 
              ? setEditingCategory({...editingCategory, description: e.target.value})
              : setNewCategory({...newCategory, description: e.target.value})
            }
            className="p-2 border rounded"
          />
          <div className="flex gap-2">
            <button
              onClick={editingCategory ? updateCategory : createCategory}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {editingCategory ? 'Update' : 'Create'}
            </button>
            {editingCategory && (
              <button
                onClick={() => setEditingCategory(null)}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Categories List */}
      <div className="space-y-4">
        {filteredCategories.map(category => (
          <div key={category.id} className="p-4 bg-white rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="font-bold text-lg">{category.name}</h3>
                {category.description && (
                  <p className="text-gray-600">{category.description}</p>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setEditingCategory(category)}
                  className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteCategory(category.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>

            {/* Channels Section */}
            <div className="ml-4 space-y-2">
              <div className="flex gap-2 mb-2">
                <input
                  type="url"
                  placeholder="Add YouTube channel URL"
                  value={newChannel}
                  onChange={(e) => setNewChannel(e.target.value)}
                  className="flex-1 p-2 border rounded"
                />
                <button
                  onClick={() => addChannel(category.id)}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Add Channel
                </button>
              </div>

              {category?.channels?.map((channel, index) => (
                <div key={index} className="flex items-center gap-2">
                  <a
                    href={channel}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-blue-500 hover:underline"
                  >
                    {channel}
                  </a>
                  <button
                    onClick={() => removeChannel(category.id, index)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}