
import 'dotenv/config';

import { get } from 'env-var';


export const envs = {
    PORT: get('PORT').required().asPortNumber(),
    DB_URL: get('DB_URL').required().asString(),
    DB_NAME: get('DB_NAME').required().asString(),
    JWT_SECRET: get('JWT_SECRET').required().asString(),
    MAILER_SERVICE: get('MAILER_SERVICE').required().asString(),
    MAILER_MAIL: get('MAILER_MAIL').required().asString(),
    MAILER_SECRET_KEY: get('MAILER_SECRET_KEY').required().asString(),
}
