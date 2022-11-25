import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
    cloud_name: 'dhz4hr8dq',
    api_key: '589974793615178',
    api_secret: 'XH5f_gkyqAike6AFwRBxAOweBJA',
    secure: true
});

export function addItem(base64: string, path: string, type: 'image' | 'video') {
    return new Promise((resolve) => {
        cloudinary.uploader
            .upload(base64, {
                folder: path,
                resource_type: type,
            })
            .then(result => {
                // console.log(result)
                resolve({
                    type,
                    src:result.secure_url,
                    created_at: result.created_at
                })
            })
            .catch((err) => console.log(err))
    })
}