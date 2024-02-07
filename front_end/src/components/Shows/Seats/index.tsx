import { Button, Paper, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBookticketsMutation, useTicketsMutation } from "../../../apis/userLogin";

interface SeatsProps {
  selectedShow: any; 
  screen_id : any
}
interface TicketBooked{
  seat:number
}

const Seats: React.FC<SeatsProps> = ({ selectedShow,screen_id}) => {
  const email = localStorage.getItem('email');
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const rows: number[][] = [];
  let currentRow: number[] = [];
  const navigate = useNavigate();
  const [booktickets,setBookTickets] = useState(false);
  const [ticketsBook, setTicketsBook] = useState<TicketBooked[]>([]);
  const [apisRes] = useTicketsMutation();
  const [apisResquest] = useBookticketsMutation();
  useEffect(() => {
    async function fetchData() {
      const response = await apisRes({showno : selectedShow,screen_id:screen_id});
      if ('data' in response &&'data' in response.data && Array.isArray(response.data.data)) {
        setTicketsBook(response.data.data);
      }
    }
    fetchData();
  }, [selectedShow, screen_id]);
  const handleSeatClick = (seatNumber: number) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats((prevSelectedSeats) =>
        prevSelectedSeats.filter((seat) => seat !== seatNumber)
      );
    } else {
      setSelectedSeats((prevSelectedSeats) => [...prevSelectedSeats, seatNumber]);
    }
  };
  const handleBookTicket = async () =>{
    try {
      const response = await apisResquest({seatno : selectedSeats , email:email || "logesh@gmail.com",  screen_id , selectedShow});
          if('data' in response) {
            if('status' in response.data){
              setBookTickets(s => s = true);
              alert("Tickets Booked");
              navigate('/home');
            }
          }  
    } catch (error) {
      console.error('Unexpected error during sign-in:', error);
    }
  }
  for (let i = 1; i <= 120; i++) {
    var flag=0;
    if(ticketsBook.length>0){
      ticketsBook.map(seat =>{
        if(i == seat.seat){
            currentRow.push(-1);
            flag=1;
        }
    })
    }
    if(flag==0){
      currentRow.push(i);
    }
    if (currentRow.length === 15) {
      rows.push([...currentRow]);
      currentRow = [];
    } 
  }

    return (
    <>
      {selectedSeats.length > 0 && (
        <Button variant="outlined" style={{ marginLeft: "75%" }} onClick={handleBookTicket}>
          Book Ticket
        </Button>
      )}
      {rows.map((row, rowIndex) => (
        <Stack
          key={rowIndex}
          direction={"row"}
          gap={"2%"}
          sx={{ marginTop: "2%", marginLeft: "18%" }}
          alignItems={"center"}
        >
          {row.map((seatNumber) => (
            <Paper
              key={seatNumber}
              sx={{
                width: 40,
                height: 40,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor:
                seatNumber === -1 ? "red" : selectedSeats.includes(seatNumber) ? "green" : "white",
              }}
              onClick={() => handleSeatClick(seatNumber)}
            >
              <Typography>{seatNumber!=-1 ? seatNumber : ''}</Typography>
            </Paper>
          ))}
          <br />
        </Stack>
      ))}
      <br />
      <br />
      <br />
      <hr style={{ width: "400px" }} />
    </>
  );
};

export default Seats;
