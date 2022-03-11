import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

export const StudentCard = ({ firstName, lastName, yearGroup, id }) => {
  return (
    <Card sx={{ minWidth: "100%", margin: 2 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="https://previews.123rf.com/images/olegdudko/olegdudko1508/olegdudko150800275/43199653-cabrito-de-la-escuela-escuela-chico-.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {firstName} {lastName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {yearGroup.title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
