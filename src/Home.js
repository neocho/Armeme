import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import  {getAddressBalance, getTransactionData, getWalletAddress, queryData} from './Arweave';
import './Home.css';

function Home() {  
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const {REACT_APP_KEY} = process.env;

    useEffect(()=> {
        const fetchData = async () => {

            try {
                let response = await queryData(JSON.parse(REACT_APP_KEY));
                console.log(response);

                let arr = []; 

                for(var i = 0; i < response.length; i++){
                    let data = await getTransactionData(response[i]);  
                    console.log(data);

                    let parseData = JSON.parse(data);
                
                    let image = new Image();
                    image.src = parseData;
                    arr.push(image);
                }

                setImages(arr);
                setLoading(false);
            }catch(e){
                throw e; 
            }
        }
        fetchData();
    }, []);

    return (
      <div className="container">
        <div className="header-container"> 
          <div className="header"> 
            <h1> Armeme 👁👄👁</h1>
            <p> A collection of the world's most valuable memes </p>
            <p> stored on the ⛓<a href="https://www.arweave.org/">blockchain</a>⛓ </p>
            <div className="post">
                <Link to="/post" style={{ textDecoration: 'none' }}>
                    <p> Post a meme 👉 </p>
                </Link>
            </div>
          </div>
        </div>
  
        
        <div className="meme-container">
            {
                loading === true ? <center> <p>Loading...</p> </center> : images.map((imgSrc, index) => (<div className="meme"><img src={imgSrc.src} key={index} height="300" /></div>))
            }
        </div>

      </div>
    );
  }
  
  export default Home;