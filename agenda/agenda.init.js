const Agenda = require("agenda");
const path = require("path");
const DB_URI = process.env.DB_URI;
const leaderboardController = require(path.join(
  __dirname,
  "..",
  "controllers",
  "leaderboard.controller"
));

const InitAgenda = () => {
  const agenda = new Agenda({
    db: {
      address: DB_URI,
      collection: "agendaJobs",
    },
  });

  const checkPositionsJob = agenda.create("CHECK POSITIONS");

  agenda.define("CHECK POSITIONS", async (job, done) => {
    console.log("[AGENDA] 🪙🪙 Checking positions...");

    leaderboardController.getLeaderboard();

    done();
  });

  agenda.on("ready", async () => {
    const currentJobs = await agenda.jobs({ name: "CHECK POSITIONS" });
    await Promise.all(currentJobs.map((job) => job.remove()));

    const tomorrowMidnight = new Date();
    tomorrowMidnight.setDate(tomorrowMidnight.getDate() + 1);
    tomorrowMidnight.setHours(0, 0, 0, 0);

    checkPositionsJob.schedule(tomorrowMidnight);
    checkPositionsJob.repeatEvery("1 day");
    checkPositionsJob.save();

    agenda.start();

    console.log("[AGENDA] ✨✨ Agenda is ready!");
  });

  agenda.on("error", (err) => {
    console.log("[AGENDA] ❌❌ Error: ", err);
  });

  agenda.on("start", (job) => {
    console.log("[AGENDA] 🚀🚀 Job started: ", job.attrs.name);
  });

  agenda.on("complete", (job) => {
    console.log("[AGENDA] ✅✅ Job completed: ", job.attrs.name);
  });

  agenda.on("fail", (err, job) => {
    console.log(`Job ${job.attrs.name} failed with error: ${err.message}`);
  });
};

module.exports = InitAgenda;
