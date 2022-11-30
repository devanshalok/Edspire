import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import InfoIcon from '@mui/icons-material/Info';
import FavoriteIcon from '@mui/icons-material/Favorite';
import dataList from "./colleges.json"

export default function ImgMediaCard() {
  return (
    <div style={{maxWidth:"100%",margin:"30px",display:"flex",flexWrap:"wrap"}}>
       {dataList.map((data) => ( 
    <Card style={{marginLeft:125,marginTop:20}}sx={{ maxWidth: 500 }}>   
      <>
      <CardMedia
                component="img"
                alt="green iguana"
                height="140"
                image={data.image} />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {data.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                       {data.description}
                    </Typography>
                </CardContent>
                <CardActions style={{marginTop:10,display: "flex", flexDirection: "row", width: "100%" }}>
                    <Button size="small"><InfoIcon />About the University</Button>
                    <Button size="small"><FavoriteIcon/>Add to Favorites</Button>
                </CardActions></>
      
    </Card>
    ))}
    </div>
  );
}