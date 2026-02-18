"use client";

import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import type { Area } from "react-easy-crop";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Loader2, ZoomIn, ZoomOut, Check, X } from "lucide-react";

interface LogoCropModalProps {
  imageSrc: string;
  onDone: (croppedBlob: Blob) => void;
  onCancel: () => void;
}

async function getCroppedBlob(
  imageSrc: string,
  pixelCrop: Area
): Promise<Blob> {
  const image = await new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.addEventListener("load", () => resolve(img));
    img.addEventListener("error", reject);
    img.src = imageSrc;
  });

  const canvas = document.createElement("canvas");
  const size = 400; // output size — 400x400px is plenty for a logo
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    size,
    size
  );

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error("Canvas is empty"));
      },
      "image/webp", // webp = smaller file size
      0.85
    );
  });
}

export function LogoCropModal({ imageSrc, onDone, onCancel }: LogoCropModalProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [loading, setLoading] = useState(false);

  const onCropComplete = useCallback((_: Area, croppedPixels: Area) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  async function handleConfirm() {
    if (!croppedAreaPixels) return;
    setLoading(true);
    try {
      const blob = await getCroppedBlob(imageSrc, croppedAreaPixels);
      onDone(blob);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open onOpenChange={(open) => !open && onCancel()}>
      <DialogContent className="max-w-sm p-0 overflow-hidden">
        <DialogHeader className="px-4 pt-4 pb-2">
          <DialogTitle className="text-sm font-semibold">Crop your logo</DialogTitle>
        </DialogHeader>

        {/* Crop area */}
        <div className="relative w-full" style={{ height: 300, background: "#111" }}>
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={1}
            cropShape="round"
            showGrid={false}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>

        {/* Zoom controls */}
        <div className="flex items-center gap-3 px-4 py-3">
          <ZoomOut className="w-4 h-4 text-gray-400 shrink-0" />
          <input
            type="range"
            min={1}
            max={3}
            step={0.05}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            className="w-full accent-black"
          />
          <ZoomIn className="w-4 h-4 text-gray-400 shrink-0" />
        </div>

        <DialogFooter className="px-4 pb-4 gap-2">
          <Button variant="outline" size="sm" onClick={onCancel} disabled={loading}>
            <X className="w-4 h-4 mr-1" /> Cancel
          </Button>
          <Button size="sm" onClick={handleConfirm} disabled={loading}>
            {loading ? (
              <Loader2 className="w-4 h-4 mr-1 animate-spin" />
            ) : (
              <Check className="w-4 h-4 mr-1" />
            )}
            Use this crop
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
