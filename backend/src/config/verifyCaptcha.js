import axios from 'axios'


export const verifyCaptcha = async (token) =>{
    const secretKey =process.env.RECAPTCHA_SECRET_KEY;
    const responce = await axios.post(
        `https://www.google.com/recaptcha/api/siteverify`,
        null,
        {
            params:{
                secret: secretKey,
                response: token,
            },
        }
    )
    return responce.data.success;
}