"use server";

import { db } from "@/lib/db";
import { ObjectId } from "mongodb";

//get all movies action
export const getMovies = async () => {
  try {
    // const response = await fetch("http://localhost:3000/api/v1/movies", {
    const response = await fetch(`${process.env.API_BASE_URL}/v1/movies`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    if (response.status === 200) {
      return await response.json();
    } else {
      console.log("No movies found");
      return undefined;
    }
  } catch (error) {
    console.log("Error fetching movies", error);
    return undefined;
  }
};

//get all movies with filters action
export const searchMovie = async (query) => {
  try {
    // Search by title (i = case-insensitive)
    const movies = await db
      .collection("movies")
      .find({ title: { $regex: query, $options: "i" } })
      .limit(50)
      .toArray();

    // console.log(movies.length);

    if (movies && movies.length > 0) {
      return {
        success: true,
        message: "movie fetched successfully",
        data: movies,
      };
    }else{
      return {
        success: false,
        message: "No movies found",
        data: [],
      };
    }
  } catch (error) {
    console.log("mongodb fetched failed", error);

    return {
      success: false,
      message: "error fetching movies",
      data: [],
    };
  }
};

//get movie  by ID action
export const getMovieById = async (movieId) => {
  try {
    const result = await db
      .collection("movies")
      .findOne({ _id: ObjectId.createFromHexString(movieId) });

    if (result && Object.keys(result).length > 0) {
      console.log(`A movie found with the _id ${result._id}`);
      return {
        success: true,
        message: "movie fetched successfully",
        data: result,
      };
    } else {
      return undefined;
    }
  } catch {
    // console.log("mongodb update fail");
    console.log("mongodb fetch fail");
  }
};

//create movie action
export const createMovie = async (movie) => {
  try {
    const result = await db.collection("movies_n").insertOne(movie);

    if (result.acknowledged) {
      console.log(`A movie was inserted with the _id: ${result.insertedId}`);

      return {
        success: true,
        message: "Movie Created Successfully",
      };
    } else {
      return undefined;
    }
  } catch {
    console.log("mongodb insert fail");
  }
};

//update movie action
export const updateMovie = async (movieId, movieDoc) => {
  try {
    // console.log("Updating movie with id:", movieId);
    // console.log("MovieDoc:", movieDoc);

    const result = await db
      .collection("movies_n")
      .updateOne(
        { _id: ObjectId.createFromHexString(movieId) },
        { $set: movieDoc },
        { upsert: true }
      );

    if (result.acknowledged) {
      // console.log(`A movie was inserted with the _id: ${result.updatedId}`);

      return {
        success: true,
        message: "Movie Updated Successfully",
      };
    } else {
      return undefined;
    }
  } catch (err) {
    // console.log("mongodb update fail");
    console.log("mongodb update fail", err);
  }
};

//delete movie action
export const deleteMovie = async (movieId) => {
  try {
    const result = await db
      .collection("movies_n")
      .deleteOne({ _id: ObjectId.createFromHexString(movieId) });

    if (result.acknowledged) {
      // console.log(`A movie was inserted with the _id: ${result.updatedId}`);

      return {
        success: true,
        message: "Movie deleted Successfully",
      };
    } else {
      return undefined;
    }
  } catch {
    // console.log("mongodb update fail");
    console.log("mongodb delete fail");
  }
};
