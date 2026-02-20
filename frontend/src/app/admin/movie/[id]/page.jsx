import { durationInHoursMinutes } from "@/app/config";
import { getMovieByIdServer } from "@/api/movie/movie.server";

import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Chip,
  Divider,
} from "@mui/material";

export default async function MoviePage({ params }) {
  const { id } = await params;
  const { data: movie, error } = await getMovieByIdServer(id);

  if (error) {
    return <div className="p-6 text-red-600">{error}</div>;
  }

  if (!movie) {
    return <div className="p-6">Movie not found</div>;
  }

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Card elevation={4} sx={{ p: { xs: 2, md: 3 } }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            {movie.posterUrl && (
              <CardMedia
                component="img"
                image={movie.posterUrl}
                alt={movie.title}
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  borderRadius: 2,
                  objectFit: "cover",
                  aspectRatio: "2 / 3",
                  mx: { xs: "auto", md: 0 },
                }}
              />
            )}
          </Grid>

          <Grid item xs={12} md={8}>
            <CardContent sx={{ p: 0 }}>
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                {movie.title}
              </Typography>

              <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                Duration: {durationInHoursMinutes(movie.duration)}
              </Typography>

              <Divider sx={{ my: 2 }} />

              {movie.genre?.length > 0 && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Genre
                  </Typography>
                  {movie.genre.map((g) => (
                    <Chip key={g} label={g} sx={{ mr: 1, mb: 1 }} />
                  ))}
                </Box>
              )}

              {movie.language?.length > 0 && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Language
                  </Typography>
                  {movie.language.map((lang) => (
                    <Chip
                      key={lang}
                      label={lang}
                      color="secondary"
                      sx={{ mr: 1, mb: 1 }}
                    />
                  ))}
                </Box>
              )}

              {movie.releaseDate && (
                <Typography variant="body1" sx={{ mb: 2 }}>
                  <strong>Release Date:</strong>{" "}
                  {new Date(movie.releaseDate).toLocaleDateString()}
                </Typography>
              )}

              {movie.description && (
                <Typography variant="body1" color="text.secondary">
                  {movie.description}
                </Typography>
              )}
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
}
