import mongoose from "mongoose"

declare global {
    namespace Express {
        interface Request {
            user: { 
                id: mongoose.Types.ObjectId;
            },
            session: {
                id: mongoose.Types.ObjectId;
            }
        }
    }
}