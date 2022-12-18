const express = require('express');
const Pusher = require('pusher');
const { userService, statisticalService } = require('../../services');

const router = express.Router();

const pusher = new Pusher({
  appId: '1526583',
  key: '6bd53f4e653611a72067',
  secret: '67d59d4528d414a51e2a',
  cluster: 'ap1',
  useTLS: true,
});

const listUser = [];
let statistical = {
  today: {
    total: 0,
    date: new Date(),
  },
  week: 0,
  month: 0,
  total: 0,
};

const updateStatistical = async (body) => {
  const statis = await statisticalService.update(body);
  if (statis) {
    statistical = statis;
  }
};

const getStatistical = async () => {
  const statisArray = await statisticalService.get();
  if (statisArray.length) {
    const [statis] = statisArray;
    statistical = statis;
  } else {
    statistical = await statisticalService.create({
      total: 0,
      today: {
        total: 0,
        date: new Date(),
      },
      week: 0,
      month: 0,
    });
  }
};

const resetData = async () => {
  if (!statistical) {
    await getStatistical();
  }
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (today.getTime() > statistical.today.date.getTime()) {
    // check when start server
    if (today.getMonth() > statistical.today.date.getMonth()) {
      statistical.month = 0;
    }
    statistical.today = {
      total: 0,
      date: new Date(),
    };
    if (today.getDay() === 1) {
      statistical.week = 0;
    }
    await updateStatistical();
  }
};

const setTimeOutResetData = () => {
  const tomorrow = new Date(); // setTimeout for tomorrow
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  setTimeout(async () => {
    resetData();
    setTimeOutResetData();
  }, tomorrow.getTime() - new Date().getTime());
};

getStatistical();
setTimeOutResetData();

router.get('/', (req, res) => {
  pusher.trigger('my-channel', 'my-event', {
    message: 'hello world',
  });
  console.log('1');
  return res.json({ success: true, message: 'Thank you for voting' });
});

router.post('/join', async (req, res) => {
  const alreadyInList = listUser.some((item) => item.id.toString() === req.body.id.toString());
  console.log('in: ', alreadyInList);
  if (!alreadyInList) {
    const user = await userService.getUserById(req.body.id);
    if (user) {
      listUser.push(user);
    }
    statistical.today.total += 1;
    statistical.week += 1;
    statistical.month += 1;
    statistical.total += 1;
    await updateStatistical(statistical);
  }
  pusher
    .trigger('my-channel', 'RECEIVED_JOIN_REQUEST', {
      message: 'RECEIVED_JOIN_REQUEST mes',
      listUser: listUser.length,
      statistical,
    })
    .catch((err) => {
      console.log('err1', err);
    });
  console.log('2');
  return res.json({ success: true, message: 'RECEIVED_JOIN_REQUEST res' });
});

router.post('/out', (req, res) => {
  if (req.body.id) {
    const disconnectUser = listUser.findIndex((item) => item.id === req.body.id);
    if (disconnectUser > -1) {
      listUser.splice(disconnectUser, 1);
    }
  }
  pusher
    .trigger('my-channel', 'RECEIVED_OUT_REQUEST', {
      message: 'RECEIVED_OUT_REQUEST mes',
      listUser: listUser.length,
      statistical,
    })
    .catch((err) => {
      console.log('err2', err);
    });
  console.log('3');
  return res.json({ success: true, message: 'RECEIVED_OUT_REQUEST res' });
});

module.exports = router;
