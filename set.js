const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT09IakhSUnl4VENSQVBacmJjci9NVUtqYWdDWnFDZU9MQUlWQWhELzlFdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidkdvU1FvMzdNdHc5UDhjcllLczhSQjNpdHJUQ2RKMXd6UkZWWkw1VmFDbz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJXT2NqMDdlTkU4RkdPa1FxenR2NlQxeFc1MGxOb2diQzcrcUZaMjdML25jPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJUYXFJa0ZGSHVxZitGQ3RQb282ZVhNbEVoSUttSTh0dDV2RkxmMEMvQkNvPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkdLRmF2MitSeDJJMnpsM0k4aFZZaUNXekZVb1BCWTM0aW0xc2sxYnlDblE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InN4WTd1bTZUNmVGSGNIb1FabUNOZVRNZlRjbVZmbFFxVTJKeGJMeVZoU0E9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRUZUaUxWOEgveVZobXNyQVBNS0w0Si9rZktEYUxQaGg1enh1a3g2TVNHUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWjB3bWJFb2RpYnJodEp0YkhyTWd2eVg2K3V5dlEzeVFZL2phWTUyOXFWMD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkR4T1QweHFHcC9aQVk3Z2Vyd2xFbmRUK2VHek0xN3M0dDdFK05WRmtJcFVjMWVNVUhPcnllWEk1L1BkMWtONElLNkV5MHRSSGxvY1NBYVh6UkJ6bGpBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTcwLCJhZHZTZWNyZXRLZXkiOiI2UElmbnBWdXdlNEptdUtkWjBZcmN2WnRtSjd2dEIyLzU2dURpbitVbHE0PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJsdndsYXYxZVNuV3VlcXg2bk93dWRRIiwicGhvbmVJZCI6IjBjYWZmNDY1LTM4NGItNDhlNy05N2Y0LWYzZjlhYTkxNDJjYSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ5OU1TdkJ4cXMyTXJPVEdqTVBCdEE2ZXBvY289In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYVhNWU9YcFlNbmhOeGlySzZtU01wZitDWEtRPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkNUMlI4NFJBIiwibWUiOnsiaWQiOiIyMzQ3MDQ0MDYwMTAyOjUzQHMud2hhdHNhcHAubmV0IiwibmFtZSI6IkRvbGxhcmh1bnRlciJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTmlIMXU4R0VJdVB6clFHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiUExqcS9kZkI3cWsyYVBIT09BMFhQVlpCMWRBcVZSRDZlelBhRXM5ck54UT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiRjVvS1ZaOUdGRjBwNElIRGh1TE41VmFZdmM2eDA1VjJiWnVmaWFzUFY4K2NyNmFpTFBLMGV5Nzl1WWgxUVNYWFNKUytjRCtoMDUzcXN4K1QyakhjQXc9PSIsImRldmljZVNpZ25hdHVyZSI6ImdQMjdrSW1GTXZVVEgwNWNzc0NNOWU3ZVRKSnp2WHRlbVdBQXU2ZFltUG9WZFZxQ2poV2R0eTkvaGwwOERRaU55VnNwcm05Wm95U0dodXJ0OXdGYmdBPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjM0NzA0NDA2MDEwMjo1M0BzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJUeTQ2djNYd2U2cE5tanh6amdORnoxV1FkWFFLbFVRK25zejJoTFBhemNVIn19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIwOTQ0NTM3LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUFGViJ9',
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
   // DATABASE: DATABASE_URL === databasePath
        //? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
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
