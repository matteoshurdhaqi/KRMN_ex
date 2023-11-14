import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

/*Pool connection allows you to reduce time spent opening
and closing mysql connections*/
const pool = mysql.createPool({
    host: 'localhost',
    user: 'ciccio',
    password: 'Matteo2001!',
    database: 'lezionedb',
  
});

export default pool;


