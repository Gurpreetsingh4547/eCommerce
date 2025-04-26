'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import Image from 'next/image';
import { getSlideshow, addSlideshow, deleteSlideshow } from '@/lib/firebase-utils';

interface Slide {
  id: string;
  imageUrl: string;
  caption: string;
  createdAt: string;
}

export default function SlideshowManagement() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [caption, setCaption] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    fetchSlides();
  }, []);

  const fetchSlides = async () => {
    try {
      const data = await getSlideshow();
      setSlides(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch slideshow images",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Error",
        description: "Please select an image file",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Error",
        description: "Image size should be less than 5MB",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsUploading(true);
      await addSlideshow(file, caption);
      toast({
        title: "Success",
        description: "Image uploaded successfully",
        variant: "success",
      });
      setCaption('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      fetchSlides();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (slide: Slide) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      try {
        await deleteSlideshow(slide.id, slide.imageUrl);
        toast({
          title: "Success",
          description: "Image deleted successfully",
          variant: "success",
        });
        fetchSlides();
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete image",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Slideshow Management</h1>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Upload New Image</h2>
        <div className="space-y-4">
          <Input
            type="text"
            placeholder="Image Caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="mb-2"
          />
          <Input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={isUploading}
          />
          {isUploading && (
            <p className="text-sm text-gray-500">Uploading...</p>
          )}
        </div>
      </div>

      {isLoading ? (
        <div>Loading...</div>
      ) : slides.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500 dark:text-gray-400">No slideshow images yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {slides.map((slide) => (
            <div key={slide.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <div className="relative aspect-video">
                <Image
                  src={slide.imageUrl}
                  alt={slide.caption}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <p className="text-gray-600 dark:text-gray-300 mb-2">{slide.caption}</p>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(slide)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 