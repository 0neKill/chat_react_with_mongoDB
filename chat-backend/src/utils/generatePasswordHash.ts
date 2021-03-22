import bcrypt from 'bcrypt';

export default (password: string = '') => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 10)
            .then((hash) => resolve(hash))
            .catch((err) => reject(err))
    })
}