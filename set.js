const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiR0x4K25Cemtxa3BXKzFjU0MrMVJpczExVUtxMGVsZUgzanErM0FQVDgyYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUUREZ0xQSDNMbHRoVmpVYnZBcUJDbDZoSjJuVzdKWkdpc3lyNzIzWURSdz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJlTGUrZFdYaGxHQkd5VWpiVmpCT2RLMFNjL3U0VnJHVFdHczB3VSszOVhnPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJRTDE0QTJpaGdhTjh6bXNPU3VpY29FUndVVzVzNnRCaFU3VG8zYWJGSHpNPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjZKclE4MWI0L1grV1NQa1p1SDZQV0Y1WE42Rlk2QkRKbEt0cmVhanZWbDQ9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ild3aUc5aUI2NC9VU3QrY0tTTjBEY24zU3VpRTRmUHl2OUxSbzdJTWF2aUE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTUQ5VG1qY08wWG5VWk5LTmlzZDZPalBTTUhDbW9tRTIzT3U3VHEvWWVYST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicHUycWIrK1JzelFnVFVmTCtzRWxnaFVnV3ZCbXBuQm1QQkNDa2kvOXFtTT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlFUdDk1enpMWFdTSWVaSW5HVUJxQ3kzcyt4d3pWaEs3V3MvOXJwMEliK282eTc2RTZSRVc3WTNuTnowdHNuZUczT0RLcGMwQ3FZTWExTmVnWjIzRERRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTIxLCJhZHZTZWNyZXRLZXkiOiJoZFdoWmk0TTM2NDhvYUFmSjhrOW14ZDllYlpmZEoxNk1INGZ0NmNwOVZBPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJIbnVFYmpmZlJTS004ZlJ3U0lIMHVRIiwicGhvbmVJZCI6IjdjM2I0N2ZhLTFmZmItNDc5NC05ODFmLWNjYmRiZmY1NzkxNSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ3ZEdJc3ZTdnVFODFCdXozckpkQkhsaWI4eDA9In0sInJlZ2lzdGVyZWQiOmZhbHNlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlR1TnBsU2JEdkhreU00QVJLYjA1dE4vNTdDaz0ifSwicmVnaXN0cmF0aW9uIjp7fSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ05XSDF1OEdFSkNldExRR0dBY2dBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IlBManEvZGZCN3FrMmFQSE9PQTBYUFZaQjFkQXFWUkQ2ZXpQYUVzOXJOeFE9IiwiYWNjb3VudFNpZ25hdHVyZSI6Inc1Nmw5YVgvZ21rTWJId01PTmEzUVlSSkJwWUUvWVdIZll1SW90VjRXZ2c0Z0Z1SG5LUU52SWxzRHZrbFlMV3ZMSnFuMkxxYnlGYXhJRGNQdmlGWENRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJUVXJmTFhXSnBZOXVFKzVPS0V2aDN2emhEZ0kzR2dmRk1aUW9BVmpBVVd2TTN3SElJWWlDNjkwTEd2eFB5OTZIWW42UlpxZk95ZFNVckFVM0Q5R3BBdz09In0sIm1lIjp7ImlkIjoiMjM0NzA0NDA2MDEwMjo0NkBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJEb2xsYXJodW50ZXIiLCJsaWQiOiIyMTEzODU1Mzk2NzQzNjA6NDZAbGlkIn0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNDcwNDQwNjAxMDI6NDZAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCVHk0NnYzWHdlNnBObWp4empnTkZ6MVdRZFhRS2xVUStuc3oyaExQYXpjVSJ9fV0sInBsYXRmb3JtIjoic21iYSIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0F3SURRPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIwNTIwNDc3LCJsYXN0UHJvcEhhc2giOiIxbE9TRUkifQ===',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "dollarhunter",
    NUMERO_OWNER : process.env.OWNER_NUM || "2347044060102",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'dollarhunter bot',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/e07a3d933fb4cad0b3791.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    TZ : process.env.TIME_ZONE || 'Etc/GMT',
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    BOOM_MESSAGE_LIMIT : process.env.BOOM_MESSAGE_LIMIT || 100,
    PORT : process.env.PORT || 8000,
    LINK : process.env.LINK || '',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`update ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
