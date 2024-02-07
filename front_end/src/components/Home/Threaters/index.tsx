import { Card, CardActionArea, CardContent, CardMedia, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheaterMutation } from '../../../apis/userLogin';
import img from './threate.jpg';

interface Theater {
  name: string;
  screencount: string;
  _id:string
}

export default function ActionAreaCard() {
  const navigate = useNavigate();

  const [theaters, setTheaters] = useState<Theater[]>([]);
  const [apisRes] = useTheaterMutation();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await apisRes();
        console.log(response);
        if ('data' in response &&'data' in response.data && Array.isArray(response.data.data)) {
          setTheaters(response.data.data);
        }
      } catch (error) {
        console.error('Unexpected error during sign-in:', error);
      }
    }

    fetchData();
  }, []); // Empty dependency array means this effect will only run once on mount
  console.log(theaters);
  return (
    <>
      <br /><br /><br />
      <Stack direction={"row"}>
      {theaters.length > 0 ? (
        theaters.map((data, index) => (
          <Card key={index} sx={{ maxWidth: 345, marginLeft: '4%' }}>
            <CardActionArea onClick={() => {
              navigate("/screens", { state: { theater_id: data._id } });
            }}>
              <CardMedia
                component="img"
                height="140"
                image={img}
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {data.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">Screen Count :  
                  { data.screencount}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))
      ) : (
        <Typography>"No theaters"</Typography>
      )}
      </Stack>
    </>
  );
}
