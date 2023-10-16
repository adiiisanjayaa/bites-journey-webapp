// pages/api/yourApiEndpoint.js
import axios from 'axios';

export default async function handler(req, res) {
  try {
    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'http://localhost:9000/api/v1/user/adi1',
      headers: {
        'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWRfdXNlcnMiOjEsInVzZXJuYW1lIjoiYWRpMSIsImlhdCI6MTY5NzM4MDg0MCwiZXhwIjoxNjk3Mzg0NDQwfQ.iM0aqsR01nHHR4_msEsJEm88sULmGqE_ItJ1VPG_jIk',
        'x-api-key': 'binar-36',
        // 'Cookie': req.headers.cookie || '', // Menggunakan cookie yang dikirim oleh klien
      },
    };

    const response = await axios.request(config);
    const responseData = response.data;

    // Di sini Anda dapat mengambil token baru dari header Cookie jika ada
    const newAccessToken = response.headers['token']; // Sesuaikan dengan nama header yang benar
    console.log(newAccessToken);
    // Lakukan apa yang Anda perlu lakukan dengan responseData dan newAccessToken

    res.status(200).json({ responseData, newAccessToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
