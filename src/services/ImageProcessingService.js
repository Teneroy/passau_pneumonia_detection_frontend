import axios from "axios";

const url = 'http://127.0.0.1:8080/api/';


export default class ImageProcessingService {


    static resizeImage(image) {
        return image;
    }

    static extractImageSize(image) {
        console.log(image);
        return {
            width: 0,
            height: 0
        }
    }

    static predictPneumonia(image, originalSize) {
        return  axios.post(
            url + '/predictPneumonia',
            {
                image: image,
                size: originalSize
            }
        );
    }
}