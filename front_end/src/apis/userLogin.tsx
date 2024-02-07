import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


interface RequestLoginUser{
  email:String,
  password:String
}
interface ResponseLoginUser {
  data: {
    status: string;
  };
}
interface TheaterResponse {
  data: {
    name:string,
    screencount:string
  };
}
interface ScreenResponse{
  data: {
    movie_name:string,
    description:string
  };
}
interface ScreenRequest{
  theater_id:string
}
interface TicketRequest{
  screen_id : string,
  showno:string
}
interface TicketResponse{
  data: {
    seat:number
  };
}
interface BookTicketRequest{
  seatno : number[],
  email:String,
  screen_id : String ,
  selectedShow:String
}
export const userLogin = createApi({
    reducerPath:"userLogin",
    baseQuery:fetchBaseQuery({baseUrl:"http://localhost:5000",
  }),
    endpoints:(builder)=>({
        loginUser : builder.mutation<ResponseLoginUser, RequestLoginUser>({
            query: (payload) => ({
              url: `/signin`,
              body: payload,
              method: 'POST'
            })
          }),
          signUpUser : builder.mutation<ResponseLoginUser, RequestLoginUser>({
            query: (payload) => ({
              url: `/signup`,
              body: payload,
              method: 'POST'
            })
          }),
          theater : builder.mutation<TheaterResponse,void>({
            query: (payload) => ({
              url: `/theaters`
            })
          }),
          screens : builder.mutation<ScreenResponse,ScreenRequest>({
            query: (payload) => ({
              url: `/screens`,
              body: payload,
              method: 'POST'
            })
          }),
          tickets : builder.mutation<TicketResponse,TicketRequest>({
            query: (payload) => ({
              url: `/tickets`,
              body: payload,
              method: 'POST'
            })
          }),
          booktickets : builder.mutation<ResponseLoginUser,BookTicketRequest>({
            query: (payload) => ({
              url: `/booktickets`,
              body: payload,
              method: 'POST'
            })
          })
    })
})  
export const { useLoginUserMutation ,useSignUpUserMutation ,useTheaterMutation,useScreensMutation,useTicketsMutation,useBookticketsMutation} = userLogin;