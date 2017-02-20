import mongoose from 'mongoose'

import config from '../../etc/config.json'

//создает соединение
export function setUpConnection(){
//  mongoose.connect('mongodb://heroku_20602lk1:dh0n7mltcl1s386emp6oluj4ov@ds033259.mlab.com:33259/heroku_20602lk1');
  mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`);
}
