require('dotenv').config()
const axios = require('axios')

const cookie = process.env.cookie

const checkIn = async (cookie) => {
  return axios({
    method: 'post',
    url: 'https://glados.rocks/api/user/checkin',
    headers: {
      'Cookie': cookie
    },
    data: {
      token: 'glados.network'
    }
  })
}

const getStatus = async (cookie) => {
  return axios({
      method: 'get',
      url: 'https://glados.rocks/api/user/status',
      headers: {
          'Cookie': cookie
      }
  });
};

const checkInAndGetStatus = async (cookie) => {
  const checkInMessage = (await checkIn(cookie))?.data?.message;

  const userStatus = (await getStatus(cookie))?.data?.data;
  const email = userStatus?.email;
  const leftDays = parseInt(userStatus?.leftDays);

  return {
      '账号': email,
      '天数': leftDays,
      '签到情况': checkInMessage
  };
};

const GLaDOSCheckIn = async () => {
  try {
    const infos = await checkInAndGetStatus(cookie)
    console.log("🚀 ~ file: checkin.js ~ line 46 ~ GLaDOSCheckIn ~ infos", infos)
  } catch (error) {
    console.log(error)
  }
}

GLaDOSCheckIn()