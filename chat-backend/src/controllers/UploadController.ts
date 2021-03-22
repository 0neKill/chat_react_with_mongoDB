import {UploadedFileSchema} from '../models'


export default class UploadController {

    create = (req: any, res: any) => {
        const userId: any = req.user._id;
        const file: any = req.file;
        const fileData = {
            fileName: file.originalname,
            size: file.size,
            ext: file.mimetype,
            url:'http://localhost:3003/'+ file.path.replace(/\\/g,'/'),
            user: userId
        }
        const uploadedFileSchema = new UploadedFileSchema(fileData);
        uploadedFileSchema
            .save()
            .then((fileObj: any) => {
                return res.status(200).json({
                    status: 'done',
                    file: fileObj
                })
            })
            .catch((err: any) => {
                return res.status(200).json({
                    status: 'error',
                    file: err
                })
            })
    };

    delete = () => {

    }

}