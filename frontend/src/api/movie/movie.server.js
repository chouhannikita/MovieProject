import { serverApiCall } from "@/lib/serverApi";

export const getMovieByIdServer = async (id) => {
  return serverApiCall(`/movie/${id}`);
};
