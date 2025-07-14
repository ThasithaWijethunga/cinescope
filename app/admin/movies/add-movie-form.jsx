"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { createMovie } from "@/actions/movies";
import { getAllYears } from "@/lib/utils";

export default function AddMovieForm({ onClose }) {
  const years = getAllYears();

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Controlled state
  // const [selectedYear, setSelectedYear] = useState("");
  // const [selectedGenre, setSelectedGenre] = useState("");

  const handleClose = () => {
    // setSelectedYear(null);
    // setSelectedGenre(null);
    onClose(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const title = formData.get("title");
    const year = formData.get("year");
    const director = formData.get("director");
    const genre = formData.get("genre");
    const rating = formData.get("rating");
    const runtime = formData.get("runtime");
    const overview = formData.get("overview");
    const poster = formData.get("poster");
    const backdrop = formData.get("backdrop");
    const movieStatus = formData.get("status");

    // console.log({title, year,director, genre, rating, runtime, overview, poster, backdrop, movieStatus });

    setIsSubmitting(true);

    const response = await createMovie({
      title,
      year,
      directors: [director],
      genres: [genre],
      imdb: { rating: Number(rating) },
      runtime,
      plot: overview,
      poster,
      backdrop,
      status: movieStatus,
      lastupdated: new Date().toISOString(),
    });

    setIsSubmitting(false);

    if (response?.success) {
      console.log(response);
      handleClose();
    }

    // setTimeout(() => setIsSubmitting(false),3000);
  };

  // console.log("selectedyear",selectedYear);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input id="title" name="title" placeholder="Movie title" required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="year">Year</Label>
          <Select
            id="year"
            name="year"
            // onValueChange={setSelectedYear}
            // value={selectedYear}
            required
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Movie year" />
            </SelectTrigger>
            <SelectContent>
              {/* <SelectItem value={null}>Please select year</SelectItem> */}
              {years.map((year, key) => (
                <SelectItem key={year}value={year}>{year}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="director">Director</Label>
          <Input id="director" name="director" placeholder="Director name" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="genre">Genre</Label>
          <Select
            id="genre"
            name="genre"
            // onValueChange={setSelectedGenre}
            // value={selectedGenre}
            required
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select genre " />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Action">Action</SelectItem>
              <SelectItem value="Adventure">Adventure</SelectItem>
              <SelectItem value="Sci-fi">Sci-fi</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="rating">Rating</Label>
          <Input
            id="rating"
            name="rating"
            type="number"
            min="0"
            max="10"
            step="0.1"
            placeholder="Rating (0.0 - 10.0)"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="runtime">Runtime (minutes)</Label>
          <Input
            id="runtime"
            name="runtime"
            type="number"
            min="1"
            placeholder="Runtime in minutes"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="overview">Overview</Label>
        <Textarea
          id="overview"
          name="overview"
          placeholder="Movie description"
          className=" h-[100px]"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="poster">Poster URL</Label>
          <Input
            id="poster"
            name="poster"
            placeholder="URL to poster image"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="backdrop">Backdrop URL</Label>
          <Input
            id="backdrop"
            name="backdrop"
            placeholder="URL to backdrop image"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select id="status" name="status" required>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <DialogFooter>
        <Button
          type="reset"
          variant="outline"
          className="min-w-[102px]"
          disabled={isSubmitting}
          // onClick={() => {
          //   setSelectedYear(null)
          // , onClose(false)} }
          onClick={handleClose}
        >
          Cancel
        </Button>
        <Button type="submit" className="min-w-[102px]" disabled={isSubmitting}>
          {isSubmitting ? "Adding..." : "Add movie"}
        </Button>
      </DialogFooter>
    </form>
  );
}
