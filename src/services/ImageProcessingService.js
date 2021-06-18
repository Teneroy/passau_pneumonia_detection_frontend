import axios from "axios";
import * as cv from "opencv.js";

const url = 'http://127.0.0.1:5000/api';


export default class ImageProcessingService {

    static readImageById(imageId) {
        return cv.imread(imageId);
    }

    static rgbImage(image) {
        let rgb = new cv.Mat();
        cv.cvtColor(image, rgb, cv.IMREAD_COLOR);
        return rgb;
    }

    static resizeImage(image) {
//        let gray = new cv.Mat();
//        cv.cvtColor(image, gray, cv.COLOR_RGBA2GRAY)
        let dsize = new cv.Size(256, 256);
        let res = new cv.Mat();
        cv.resize(image, res, dsize, 0, 0, cv.INTER_AREA);

        //cv.imshow('dstimg', res)
        // let mat = cv.matFromArray(256, 256, cv.CV_8UC1, res.data)
        // cv.imshow('dstimg', mat);
        return res;
    }

    static extractImageSizeById(imageId) {
        let originalWidth = document.querySelector('#' + imageId).naturalWidth;
        let originalHeight = document.querySelector('#' + imageId).naturalHeight;
        if (originalHeight === undefined || originalWidth === undefined
        || originalHeight < 0 || originalWidth < 0) {
            originalWidth = 0;
            originalHeight = 0;
        }
        return {
            width: originalWidth,
            height: originalHeight
        }
    }

    static predictPneumonia(image, originalSize, forced) {
        console.log(image.data);
        return  axios.post(
            url + '/predictPneumonia',
            {
                image: image.data,
                size: originalSize,
                forced: forced
            }
        );
    }
}