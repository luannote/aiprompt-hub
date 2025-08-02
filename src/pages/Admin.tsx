// src/pages/Admin.tsx
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://saovvpejndlngwvcgqrc.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhb3Z2cGVqbmRsbmd3dmNncXJjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQxMDE3NjksImV4cCI6MjA2OTY3Nzc2OX0.rtkXelWJnEqfx5JQNM6qmy8c_UxBb3IPPcp6V2-eI4w'
);

export default function Admin() {
  const [prompts, setPrompts] = useState<any[]>([]);
  const [form, setForm] = useState({ title: '', description: '', image_url: '', tags: '' });

  const fetchPrompts = async () => {
    const { data, error } = await supabase.from('promt').select('*').order('created_at', { ascending: false });
    if (error) console.error('Fetch error:', error);
    else setPrompts(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const tagsArray = form.tags.split(',').map((t) => t.trim());
    const { error } = await supabase.from('promt').insert({
      title: form.title,
      description: form.description,
      image_url: form.image_url,
      tags: tagsArray,
    });
    if (error) console.error('Insert error:', error);
    else {
      setForm({ title: '', description: '', image_url: '', tags: '' });
      fetchPrompts();
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('promt').delete().eq('id', id);
    if (error) console.error('Delete error:', error);
    else fetchPrompts();
  };

  useEffect(() => {
    fetchPrompts();
  }, []);

  return (
    <div style={{ padding: '2rem', fontSize: '16px' }}>
      <h1 style={{ fontSize: '22px' }}>🧠 Quản lý Prompt</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <br />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />
        <br />
        <input
          type="url"
          placeholder="Image URL"
          value={form.image_url}
          onChange={(e) => setForm({ ...form, image_url: e.target.value })}
        />
        <br />
        <input
          type="text"
          placeholder="Tags (phân cách bằng dấu phẩy)"
          value={form.tags}
          onChange={(e) => setForm({ ...form, tags: e.target.value })}
        />
        <br />
        <button type="submit">➕ Thêm Prompt</button>
      </form>

      {prompts.length === 0 ? (
        <p>Chưa có prompt nào.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {prompts.map((p) => (
            <li
              key={p.id}
              style={{ border: '1px solid #ddd', padding: '1rem', marginBottom: '1rem' }}
            >
              <strong>{p.title}</strong>
              <p>{p.description}</p>
              {p.tags && <p>📌 Tags: {p.tags.join(', ')}</p>}
              {p.image_url && <img src={p.image_url} alt={p.title} width={100} />}
              <button onClick={() => handleDelete(p.id)}>🗑 Xóa</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
