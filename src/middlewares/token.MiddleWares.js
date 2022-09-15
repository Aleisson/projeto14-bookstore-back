import { STATUS_CODE } from '../enums/statusCode.enum.js';
import { DATABASE_COLLECTIONS } from '../enums/databaseCollections.enum.js';
import database from '../database/database.js';

async function tokenMidlewares(req, res, next) {

    const token = req.headers.authorization?.replace('Bearer ', '')

    if (!token) {
        return res.sendStatus(STATUS_CODE.BAD_REQUEST);
    }

    try {

        const session = await database.collection(DATABASE_COLLECTIONS.SESSIONS).findOne({ token });

        if (!session) {
            return res.send(STATUS_CODE.UNAUTHORIZED);
        }

        const user = await database.collection(DATABASE_COLLECTIONS.USERS).findOne({ _id: session.userId });

        if (!user) {
            return res.send(STATUS_CODE.UNAUTHORIZED);
        }

        res.locals.user = user;
        res.locals.session = session;
        next();

    } catch (error) {
        console.error(error);
        return res.sendStatus(STATUS_CODE.SERVER_ERROR);
    }

}

export { tokenMidlewares }