import multer, {diskStorage} from 'multer';


const storage = diskStorage({
    destination: (req: any, file: any, callback: any) => {
        callback(null, 'temp/upload')
    },

    filename: (req: any, file: any, callback: any) => {
        callback(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname)
    }
})
const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg', 'audio/webm']

const fileFilter = (req: any, file: any, callback: any) => {
    if (allowedTypes.includes(file.mimetype)) {
        callback(null, true)
    } else {
        callback(null, false)
    }
}
export default multer({storage, fileFilter})