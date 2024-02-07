import { Card, CardActionArea, CardContent, CardMedia, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useScreensMutation } from '../../apis/userLogin';

interface Screen{
    _id:string
    movie_name:string,
    description:string,
    screenno:string
}
const Screens = () => {
  const location = useLocation();
  const theater_id = location.state?.theater_id || '';
  const navigate = useNavigate();
  console.log(theater_id)
  const [screens, setScreens] = useState<Screen[]>([]);
  const [apisRes] = useScreensMutation();
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await apisRes({theater_id:theater_id});
        console.log(response);
        if ('data' in response &&'data' in response.data && Array.isArray(response.data.data)) {
          setScreens(response.data.data);
        }
      } catch (error) {
        console.error('Unexpected error during sign-in:', error);
      }
    }

    fetchData();
  }, []);
  console.log(screens)
  return (
    <>
      <br /><br /><br />
      <Stack direction={"row"}>
      {screens.length > 0 ? (
        screens.map((data, index) => (
          <Card key={index} sx={{ maxWidth: 345, marginLeft: '4%' }}>
            <CardActionArea onClick={() => {
              navigate("/shows", { state: { screen_id: data._id } });
            }}>
              <CardMedia
                component="img"
                height="140"
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {data.movie_name}
                </Typography>
                <Typography variant="body2" color="text.secondary">Screen No :  
                  { data.screenno}
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
};

export default Screens;
