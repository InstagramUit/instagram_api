import { Response } from "express"

class ResponseService {
    res: Response;

    constructor(res: Response) {
        this.res = res
    }
    success(data?: object) {
        this.res.status(200).json({ mess: 'success', data })
    }
    incorrectData() {
        this.res.status(400).json({ mess: 'incorrect data' })
    }
    notFound() {
        this.res.status(404).json({ mess: 'notFound data' })
    }
    
}
export default ResponseService;