const Queue = require('bull')

const emailQueue = new Queue( 'email', {
    redis: {port: 6379, host:'127.0.0.1'}
});

module.exports = emailQueue;