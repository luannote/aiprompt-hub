import React, { useState } from 'react';
import { Settings, Image, FileText, Palette, Globe } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ImageManager } from '@/components/ImageManager';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function Admin() {
  const [activeTab, setActiveTab] = useState('images');

  const stats = [
    { label: 'Total Images', value: '12', icon: Image },
    { label: 'AI Tools', value: '24', icon: Settings },
    { label: 'Prompts', value: '48', icon: FileText },
    { label: 'Languages', value: '2', icon: Globe },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Website Admin
            </h1>
            <p className="text-muted-foreground mt-2">
              Manage your website content, images, and settings
            </p>
          </div>
          <Badge variant="secondary" className="px-3 py-1">
            Draft Mode
          </Badge>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/70 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-primary">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-96">
            <TabsTrigger value="images" className="flex items-center gap-2">
              <Image className="w-4 h-4" />
              <span className="hidden sm:inline">Images</span>
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Content</span>
            </TabsTrigger>
            <TabsTrigger value="design" className="flex items-center gap-2">
              <Palette className="w-4 h-4" />
              <span className="hidden sm:inline">Design</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="images" className="space-y-6">
            <ImageManager />
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Content Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <Card className="p-4 border-dashed border-2 hover:border-primary transition-colors cursor-pointer">
                    <div className="text-center">
                      <FileText className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm font-medium">Manage AI Tools</p>
                      <p className="text-xs text-muted-foreground">Add, edit, or remove AI tools from your collection</p>
                    </div>
                  </Card>

                  <Card className="p-4 border-dashed border-2 hover:border-primary transition-colors cursor-pointer">
                    <div className="text-center">
                      <FileText className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm font-medium">Manage Prompts</p>
                      <p className="text-xs text-muted-foreground">Add, edit, or organize prompt examples</p>
                    </div>
                  </Card>

                  <Card className="p-4 border-dashed border-2 hover:border-primary transition-colors cursor-pointer">
                    <div className="text-center">
                      <Globe className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm font-medium">Translations</p>
                      <p className="text-xs text-muted-foreground">Manage Vietnamese and English content</p>
                    </div>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="design" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Design Customization</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <Card className="p-4 border-dashed border-2 hover:border-primary transition-colors cursor-pointer">
                    <div className="text-center">
                      <Palette className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm font-medium">Color Scheme</p>
                      <p className="text-xs text-muted-foreground">Customize your website colors and themes</p>
                    </div>
                  </Card>

                  <Card className="p-4 border-dashed border-2 hover:border-primary transition-colors cursor-pointer">
                    <div className="text-center">
                      <Settings className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm font-medium">Layout Settings</p>
                      <p className="text-xs text-muted-foreground">Adjust spacing, fonts, and layout options</p>
                    </div>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Website Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Publish Website</p>
                      <p className="text-sm text-muted-foreground">Make your website live for visitors</p>
                    </div>
                    <Button>Publish</Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Backup Content</p>
                      <p className="text-sm text-muted-foreground">Create a backup of all your content</p>
                    </div>
                    <Button variant="outline">Backup</Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Export Images</p>
                      <p className="text-sm text-muted-foreground">Download all uploaded images</p>
                    </div>
                    <Button variant="outline">Export</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}