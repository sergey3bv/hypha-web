'use client';

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@hypha-platform/ui/server';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function CreateAssignment() {
  const [open, setOpen] = React.useState(true);
  const router = useRouter();

  const handleClose = React.useCallback(() => {
    setOpen(false);
    setTimeout(() => {
      router.back();
    }, 150);
  }, [router]);

  return (
    <Dialog open={open} onOpenChange={handleClose} modal>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create</DialogTitle>
          <DialogDescription>Description</DialogDescription>
        </DialogHeader>
        <div>Test</div>
        <DialogFooter>
          <Button type="submit" onClick={handleClose}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
