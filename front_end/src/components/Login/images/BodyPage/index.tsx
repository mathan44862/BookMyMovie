import { Stack } from '@mui/material';
import Logo from './bmtlogo.png';

const BodyPage = ()=>{
    return(
        <Stack alignItems={"center"}>
            <img src={Logo} alt="logo" width={"300px"} />
        </Stack>
    );
}
export default BodyPage