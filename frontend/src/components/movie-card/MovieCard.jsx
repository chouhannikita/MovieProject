import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function MovieCard({
  image,
  title,
  description,
  onShare,
  onView,
}) {
  return (
    <Card sx={{ maxWidth: 280 }}>
      <CardMedia
        sx={{ height: 180 }}
        image={image}
        title={title}
      />
      <CardContent>
        <Typography gutterBottom variant="h6">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" noWrap>
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={onShare}>
          Share
        </Button>
        <Button size="small" onClick={onView}>
          View
        </Button>
      </CardActions>
    </Card>
  );
}