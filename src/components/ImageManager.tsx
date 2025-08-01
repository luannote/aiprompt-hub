import React, { useState } from 'react';
import { Plus, Search, Grid, List, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ImageUpload } from './ImageUpload';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ImageItem {
  id: string;
  url: string;
  name: string;
  size: string;
  type: string;
  uploadDate: string;
  category?: string;
}

export const ImageManager: React.FC = () => {
  const [images, setImages] = useState<ImageItem[]>([
    {
      id: '1',
      url: '/src/assets/hero-bg.jpg',
      name: 'hero-bg.jpg',
      size: '1.2 MB',
      type: 'JPG',
      uploadDate: '2024-01-15',
      category: 'hero'
    },
    {
      id: '2', 
      url: '/src/assets/hero-bg-new.jpg',
      name: 'hero-bg-new.jpg',
      size: '980 KB',
      type: 'JPG',
      uploadDate: '2024-01-16',
      category: 'hero'
    }
  ]);
  
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showUploader, setShowUploader] = useState(false);

  const categories = ['all', 'hero', 'tools', 'prompts', 'general'];

  const handleImageUpload = (file: File | null, url: string | null) => {
    if (file && url) {
      const newImage: ImageItem = {
        id: Date.now().toString(),
        url,
        name: file.name,
        size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
        type: file.type.split('/')[1].toUpperCase(),
        uploadDate: new Date().toISOString().split('T')[0],
        category: 'general'
      };
      
      setImages(prev => [newImage, ...prev]);
      setShowUploader(false);
    }
  };

  const filteredImages = images.filter(image => {
    const matchesSearch = image.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || image.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDeleteImage = (id: string) => {
    setImages(prev => prev.filter(img => img.id !== id));
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Image Manager
          </CardTitle>
          <Button onClick={() => setShowUploader(!showUploader)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Image
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {showUploader && (
          <div className="border rounded-lg p-4 bg-accent/20">
            <h3 className="text-sm font-medium mb-3">Upload New Image</h3>
            <ImageUpload
              onImageChange={handleImageUpload}
              placeholder="Upload image for your website"
              aspectRatio="auto"
            />
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search images..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex border rounded-md">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="rounded-r-none"
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="rounded-l-none"
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Images Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredImages.map(image => (
              <Card key={image.id} className="group overflow-hidden">
                <div className="aspect-square relative">
                  <img
                    src={image.url}
                    alt={image.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex gap-2">
                      <Button size="sm" variant="secondary">
                        Use
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => handleDeleteImage(image.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="p-3">
                  <p className="text-sm font-medium truncate">{image.name}</p>
                  <div className="flex items-center justify-between mt-2">
                    <Badge variant="outline" className="text-xs">{image.type}</Badge>
                    <span className="text-xs text-muted-foreground">{image.size}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {filteredImages.map(image => (
              <Card key={image.id} className="p-4">
                <div className="flex items-center gap-4">
                  <img
                    src={image.url}
                    alt={image.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <p className="font-medium">{image.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline">{image.type}</Badge>
                      <span className="text-sm text-muted-foreground">{image.size}</span>
                      <span className="text-sm text-muted-foreground">{image.uploadDate}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="secondary">
                      Use
                    </Button>
                    <Button 
                      size="sm" 
                      variant="destructive"
                      onClick={() => handleDeleteImage(image.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {filteredImages.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">No images found</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};