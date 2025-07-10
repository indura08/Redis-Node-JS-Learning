const emailQueue = require('./queue');

emailQueue.process(async (job) => {
    const { to, subject, body } = job.data;

    console.log("sending email to :", to);
    console.log(`Subject: ${subject}`)
    console.log(`Body: ${body}`);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log("email sent");
})