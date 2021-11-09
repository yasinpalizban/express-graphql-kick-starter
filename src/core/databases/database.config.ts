process.env["NODE_CONFIG_DIR"] = "./src/core/configs";
import config from 'config';
import {dbConfig} from '../interfaces/db.interface';

const {host, port, database}: dbConfig = config.get('dbConfig');

export const dbConnection = {
  url: `mongodb://${host}:${port}/${database}`,
  options: {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
};


