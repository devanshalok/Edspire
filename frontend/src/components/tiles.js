import {
    GridList,
    GridListTile,
    GridListTileBar,
    IconButton,
    ListSubheader,
  } from "@material-ui/core";
  import "../App.css";
  import InfoIcon from "@material-ui/icons/Info";
  import dataList from "./data.json";
  
  function Tiles() {
    return (
      <div style={{maxWidth:"100%",margin:"30px"}}>
        <GridList cellHeight={200} cols={3} style={{ width: "100%", height: "100%" }}>
          <GridListTile
            key="SubHeader"
            cols={3}
            style={{ height: 70, textAlign: "start" }}
          >
            <ListSubheader component="div"><h3 style={{fontWeight:"bold"}}>Spaces you might like</h3></ListSubheader>
          </GridListTile>
          {dataList.map((data) => (
            <GridListTile  key={data.id} >
              <img src={data.image} alt={data.title} />
              <GridListTileBar
                title={data.title}
                subtitle={data.description}
                style={{ textAlign: "start" }}
                actionIcon={
                  <IconButton>
                    <InfoIcon style={{ color: "white" }} />
                  </IconButton>
                }
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
    );
  }
  
  export default Tiles;