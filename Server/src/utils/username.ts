import UserModel from '../models/user';

const checkUsername = async (username: string) => {
    /**
     * This function will check if given username
     * already exists in the database.
     * Returns true if it does, otherwise false.
     */

    try {
        const existingUser = await UserModel.findOne({ username });
        
        if (!existingUser) {
            return false;
        }

        return true;
    } catch (error) {
        console.log(error)
    }
    
}


export default checkUsername