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
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>CreateAssignment</DialogTitle>
          <DialogDescription>Description</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="submit">Confirm</Button>
        </DialogFooter>
      </DialogContent>
      <div className="m-auto bg-background-1"></div>
    </Dialog>
  );
}
