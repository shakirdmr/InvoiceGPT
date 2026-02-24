"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Download, Loader2 } from "lucide-react";

interface DownloadNameDialogProps {
  open: boolean;
  defaultName: string;
  loading: boolean;
  onConfirm: (filename: string) => void;
  onCancel: () => void;
}

export function DownloadNameDialog({
  open,
  defaultName,
  loading,
  onConfirm,
  onCancel,
}: DownloadNameDialogProps) {
  const [filename, setFilename] = useState(defaultName);

  useEffect(() => {
    if (open) setFilename(defaultName);
  }, [open, defaultName]);

  function handleConfirm() {
    const name = filename.trim();
    if (!name) return;
    onConfirm(name.endsWith(".pdf") ? name : `${name}.pdf`);
  }

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v && !loading) onCancel(); }}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Save PDF As</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1.5">File name</label>
            <input
              value={filename}
              onChange={(e) => setFilename(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") handleConfirm(); }}
              autoFocus
              className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
            />
          </div>
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={loading}
            >
              Skip
            </Button>
            <Button
              onClick={handleConfirm}
              disabled={loading || !filename.trim()}
              className="gap-2"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Download className="w-4 h-4" />
              )}
              {loading ? "Downloading..." : "Download"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
