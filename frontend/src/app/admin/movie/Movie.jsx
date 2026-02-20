"use client";
import React, { useCallback, useEffect, useState } from "react";
import AddMovie from "./AddMovie";
import CustomButton from "@/components/custom-button/CustomButton";
import { deleteAdminMovie, getAdminMovies } from "@/api/movie/movie";
import { useSelector } from "react-redux";
import { useSnackbar } from "@/context/SnackbarContext";
import DataTable from "@/components/datatable/DataTable";
import { movieTableColumns } from "../adminConfig";
import { Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { durationInHoursMinutes } from "../../config";
import { useRouter } from "next/navigation";

const Movie = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const adminId = useSelector((state) => state.auth.userData?.id);
  const { showSnackbar } = useSnackbar();

  const fetchMovies = useCallback(async () => {
    if (!adminId) {
      setMovies([]);
      return;
    }

    setLoading(true);
    try {
      const res = await getAdminMovies(adminId);
      const updatedMovies = res?.data?.map((movie) => ({
        ...movie,
        duration: durationInHoursMinutes(movie.duration),
      }));
      setMovies(updatedMovies || []);
    } catch (error) {
      setMovies([]);
      showSnackbar(error.message || "Failed to fetch movies", "error");
    } finally {
      setLoading(false);
    }
  }, [adminId, showSnackbar]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const handleDelete = async (selectedMovie) => {
    const id = selectedMovie._id;
    const res = await deleteAdminMovie(id, adminId);
    if (res?.data?.success) {
      fetchMovies();
      showSnackbar("Movie deleted successfully", "success");
    } else {
      showSnackbar(
        res?.response?.data?.message || "Failed to delete movie",
        "error",
      );
    }
  };

  const handleEdit = async (selectedMovie) => {};
  const handleView = (selectedMovie) => {
    router.push(`/admin/movie/${selectedMovie._id}`);
  };
  const actionsUI = (row) => {
    return (
      <Box sx={{ display: "flex", alignContent: "center" }}>
        <EditIcon color="secondary" onClick={() => handleEdit(row)} />
        <DeleteForeverIcon color="error" onClick={() => handleDelete(row)} />
        <RemoveRedEyeIcon sx={{ color: "#076cd0" }} onClick={() => handleView(row)} />
      </Box>
    );
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="w-full">
        <CustomButton
          fullWidth
          onClick={() => setOpen(true)}
          variant="contained"
          buttonText="+ Add Movie"
          className="!text-white !py-3"
          style={{
            background: "linear-gradient(90deg,#ff004f,#ff5f00)",
          }}
        />
      </div>

      <DataTable
        columns={movieTableColumns}
        data={movies}
        loading={loading}
        rowKey="_id"
        actionsUI={actionsUI}
      />

      <AddMovie
        open={open}
        handleClose={() => setOpen(false)}
        onSuccess={fetchMovies}
      />
    </div>
  );
};

export default Movie;
