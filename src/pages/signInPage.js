import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, signInWithGoogle } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Button } from "@mui/material";
import img from '../images/pexels-dziana-hasanbekava-5480827.jpg'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';


function SignInPage() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/home");
  },);
  return (


    
       <><ImageList sx={{ width: 2400, height: 450 }}  style={{margin: '50 auto', display: "flex"}}>
          <ImageListItem key={img}>
              <img
                  src={img}
                  loading="lazy"
                  alt={img} />
          </ImageListItem>
      </ImageList>
      <Button style={{margin: '0 auto', display: "flex"}} onClick={signInWithGoogle}  variant="contained">
              Login with Google
          </Button>
          </>

  );
}
export default SignInPage;