import axios from 'axios';

export default function useRegister() {

    axios.post("http://localhost:4000/api/v1/sign_up",{
        user: {
          email: email,
          password: password,
          password_confirmation: password_confirmation
        }
      },)
      .then((response) => {
         // Handle the JWT response here
      })
      .catch((error) => {
         // Handle returned errors here
      });

}