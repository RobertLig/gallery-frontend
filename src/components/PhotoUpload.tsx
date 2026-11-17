import React, { useState } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useTranslation } from 'react-i18next';

interface Photo {
  id: string;
  url: string;
  file?: File;
}

interface SortablePhotoProps {
  photo: Photo;
  onRemove: (id: string) => void;
}

const SortablePhoto: React.FC<SortablePhotoProps> = ({ photo, onRemove }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: photo.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="relative group">
      <img
        src={photo.url}
        alt="Painting photo"
        className="w-full h-48 object-cover rounded-lg cursor-move"
        {...attributes}
        {...listeners}
      />
      <button
        onClick={() => onRemove(photo.id)}
        className="absolute top-2 right-2 btn btn-circle btn-sm btn-error opacity-0 group-hover:opacity-100 transition-opacity"
      >
        ✕
      </button>
    </div>
  );
};

interface PhotoUploadProps {
  photos: Photo[];
  onPhotosChange: (photos: Photo[]) => void;
  maxPhotos?: number;
}

const PhotoUpload: React.FC<PhotoUploadProps> = ({ photos, onPhotosChange, maxPhotos = 10 }) => {
  const { t } = useTranslation();
  const [uploading, setUploading] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = photos.findIndex((photo) => photo.id === active.id);
      const newIndex = photos.findIndex((photo) => photo.id === over.id);
      onPhotosChange(arrayMove(photos, oldIndex, newIndex));
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (photos.length + files.length > maxPhotos) {
      alert(t('admin.maxPhotosExceeded', { max: maxPhotos }));
      return;
    }

    setUploading(true);
    const newPhotos: Photo[] = [];

    for (const file of files) {
      if (file.size > 5 * 1024 * 1024) {
        alert(t('admin.fileTooLarge', { name: file.name }));
        continue;
      }

      const url = URL.createObjectURL(file);
      newPhotos.push({
        id: Math.random().toString(36).substr(2, 9),
        url,
        file,
      });
    }

    onPhotosChange([...photos, ...newPhotos]);
    setUploading(false);
  };

  const handleRemove = (id: string) => {
    const photo = photos.find((p) => p.id === id);
    if (photo?.url.startsWith('blob:')) {
      URL.revokeObjectURL(photo.url);
    }
    onPhotosChange(photos.filter((p) => p.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="form-control">
        <label className="label">
          <span className="label-text">{t('admin.uploadPhotos')}</span>
        </label>
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          onChange={handleFileSelect}
          disabled={uploading || photos.length >= maxPhotos}
          className="file-input file-input-bordered w-full"
        />
        <label className="label">
          <span className="label-text-alt">{t('admin.maxPhotos', { max: maxPhotos })}</span>
        </label>
      </div>

      {photos.length > 0 && (
        <div>
          <p className="text-sm mb-2">{t('admin.dragToSort')}</p>
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={photos.map((p) => p.id)} strategy={verticalListSortingStrategy}>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {photos.map((photo) => (
                  <SortablePhoto key={photo.id} photo={photo} onRemove={handleRemove} />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>
      )}
    </div>
  );
};

export default PhotoUpload;
