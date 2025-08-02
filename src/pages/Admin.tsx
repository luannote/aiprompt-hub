// src/pages/Admin.tsx
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://saovvpejndlngwvcgqrc.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhb3Z2cGVqbmRsbmd3dmNncXJjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQxMDE3NjksImV4cCI6MjA2OTY3Nzc2OX0.rtkXelWJnEqfx5JQNM6qmy8c_UxBb3IPPcp6V2-eI4w'
);

export default function Admin() {
  const [prompts, setPrompts] = useState<any[]>([]);

  useEffect(() => {
    const fetchPrompts = async () => {
      const { data, error } = await supabase.from('promt').select('*');
      if (error) {
        console.error('Lỗi khi fetch dữ liệu:', error);
      } else {
        setPrompts(data);
      }
    };
    fetchPrompts();
  }, []);

  return (
    <div style={{ padding: '2rem', fontSize: '18px', color: '#333' }}>
      <h1 style={{ fontSize: '24px', marginBottom: '1rem' }}>🧠 Danh sách Prompt</h1>
      {prompts.length === 0 ? (
        <p>Không có prompt nào.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {prompts.map((p) => (
            <li
              key={p.id}
              style={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '1rem',
                marginBottom: '1rem',
              }}
            >
              <strong>{p.title}</strong>
              <p>{p.description}</p>
              {p.tags && <p>📌 Tags: {p.tags.join(', ')}</p>}
              {p.image_url && <img src={p.image_url} alt={p.title} width={100} />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
