import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import dataList from "./data.json"

export default function Tiles() {
  return (
    <div style={{maxWidth:"100%",marginLeft:"130px",display:"flex",flexWrap:"wrap"}}>
       {dataList.map((data) => ( 
    <Card style={{marginLeft:40,marginTop:50,width:350,boxShadow:"10px 5px 5px gray"}}sx={{ maxWidth: 500 }}>   
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
                </CardContent><CardActions>
                    <Button size="small">Go to space</Button>
                    <Button size="small">Follow space</Button>
                </CardActions></>
      
    </Card>
    ))}
    </div>
  );
}