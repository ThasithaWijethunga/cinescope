"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import AddMovieForm from "./add-movie-form";

export default function AddMovieDialog() {
  const [showAddMovie, setShowAddMovie] = useState(false);

  return (
    <Dialog open={showAddMovie} onOpenChange={setShowAddMovie}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add movie
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add new movie</DialogTitle>
          <DialogDescription>
            Fill in the details to add a new movie to your catalog.
          </DialogDescription>
        </DialogHeader>
        {/* Add movie form */}
        <AddMovieForm  onClose={setShowAddMovie}/>
      </DialogContent>
    </Dialog>
  );
}
