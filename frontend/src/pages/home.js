import { Button } from "@material-ui/core";
import "./page.css";
import { Container } from '../components/container';
import { Link } from "react-router-dom";
const triggerText = 'Ask A Question';
  const onSubmit = (event) => {
    event.preventDefault(event);
    console.log(event.target.name.value);
    console.log("hello")
  };
function Home() {
  return (
    <section id='homeContainer' style={{backgroundColor:'#fff3e0'}}>
    <img src={require('./dream.png')} alt='unsplash-img'/>
    <div >
      <h1>If studying abroad is your dream, making it simple is ours!</h1>
      <p style={{fontSize:"20px"}}>Connect with thousands of students who will answer your questions</p>
      <Button style={{
        borderRadius: 35,
        backgroundColor: "#ffa726",
        padding: "18px 36px",
        fontSize: "18px"
    }}
 variant="contained" href="#contained-buttons"> Get Started</Button>
 <Container triggerText={triggerText} onSubmit={onSubmit} />
 <Button style={{marginTop:20}}variant="contained" ><Link to="./collegefinder"> College Finder</Link></Button>

    </div>
  </section>);
}
export default Home;