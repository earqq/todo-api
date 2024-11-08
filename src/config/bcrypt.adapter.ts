

import { compareSync, genSaltSync, hashSync } from 'bcryptjs';

export const BcryptAdapter = {

    hash: (password: string ) => {
        const salt = genSaltSync();
        return hashSync(password, salt);
    },

    compare: (password: string, hash: string) => {
        return compareSync(password, hash);
    }
}