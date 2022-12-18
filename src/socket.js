const serverIo = require('socket.io');
const { userService, statisticalService } = require('./services');

class Io {
  constructor(httpServer, path) {
    this.httpServer = httpServer;
    this.path = path;
    this.io = new serverIo.Server(this.httpServer, {
      cors: {
        origin: '*',
      },
      path: '/trans-socket',
    });
    this.listUser = [];
    this.getStatistical();
    this.io.on('connection', (socket) => {
      socket.on('disconnect', () => {
        if (socket.id) {
          const disconnectUser = this.listUser.findIndex((item) => item.socketId === socket.id);
          if (disconnectUser > -1) {
            this.listUser.splice(disconnectUser, 1);
            this.emitAllClient('RECEIVED_OUT_REQUEST', false);
          }
        }
      });
      socket.on('SEND_JOIN_REQUEST', async (userid) => {
        const alreadyInList = this.listUser.some((item) => item.id.toString() === userid.toString());
        if (!alreadyInList) {
          const user = await userService.getUserById(userid);
          if (user) {
            user.socketId = socket.id;
            this.listUser.push(user);
            this.emitAllClient('RECEIVED_JOIN_REQUEST', true);
          }
        } else {
          this.emitAllClient('RECEIVED_JOIN_REQUEST', false);
        }
      });
    });
    this.resetData();
    this.setTimeOutResetData();
  }

  emitAllClient(type, inc) {
    if (inc) {
      this.statistical.today.total += 1;
      this.statistical.week += 1;
      this.statistical.month += 1;
      this.statistical.total += 1;
      this.updateStatistical();
    }
    this.io.emit(type, { listUser: this.listUser, statistical: this.statistical });
  }

  emitSocket(socket, type) {
    socket.emit(type, { listUser: this.listUser, statistical: this.statistical });
  }

  async getStatistical() {
    const statistical = await statisticalService.get();
    if (statistical.length) {
      const [statis] = statistical;
      this.statistical = statis;
    } else {
      this.statistical = await statisticalService.create({
        total: 0,
        today: {
          total: 0,
          date: new Date(),
        },
        week: 0,
        month: 0,
      });
    }
  }

  async updateStatistical() {
    const statistical = await statisticalService.update(this.statistical);
    if (statistical) {
      this.statistical = statistical;
    }
  }

  async resetData() {
    if (!this.statistical) {
      await this.getStatistical();
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (today.getTime() > this.statistical.today.date.getTime()) {
      // check when start server
      if (today.getMonth() > this.statistical.today.date.getMonth()) {
        this.statistical.month = 0;
      }
      this.statistical.today = {
        total: 0,
        date: new Date(),
      };
      if (today.getDay() === 1) {
        this.statistical.week = 0;
      }
      await this.updateStatistical();
    }
    // setInterval(async () => {
    //   const today = new Date();
    //   today.setHours(0, 0, 0, 0);
    //   if (today.getTime() > this.statistical.today.date.getTime()) {
    //     this.statistical.today = {
    //       total: 0,
    //       date: new Date(),
    //     }
    //     await this.updateStatistical();
    //   }
    // }, 1000);
  }

  setTimeOutResetData() {
    const tomorrow = new Date(); // setTimeout for tomorrow
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    setTimeout(async () => {
      this.resetData();
      this.setTimeOutResetData();
    }, tomorrow.getTime() - new Date().getTime());
  }
}

module.exports = Io;
