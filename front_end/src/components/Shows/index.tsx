import { CardActionArea, Stack } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Seats from './Seats';

const Shows = () => {
  const location = useLocation();
  const currentDate = new Date();
  const screen_id = location.state?.screen_id || '';
  const navigate = useNavigate();
  const [show, setShow] = useState<number | null>(0);

  return (
    <>
      <Stack marginTop="3%" direction={"row"}>
        {["10:30 am", "2:30 pm", "6:30 pm", "10:30 pm"].map((row, index) => (
          <React.Fragment key={row}>
            <Card sx={{ maxWidth: 150, marginLeft: '4%' }}>
              <CardActionArea onClick={() => {
                setShow(index) 
              }}>
                <CardContent>
                  <Typography gutterBottom variant="h6" component="h6">
                    {row} 
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card><br /><br />
          </React.Fragment>
        ))}
      </Stack>
      <Seats selectedShow={show} screen_id={screen_id} />
    </>
  );
};

export default Shows;
