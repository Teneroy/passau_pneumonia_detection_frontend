import axios from "axios";
import * as cv from "opencv.js";

const url = 'http://127.0.0.1:8080/api/';


export default class ImageProcessingService {

    static readImageById(imageId) {
        return cv.imread(imageId);
    }

    static grayScaleImage(image) {
        let gray = new cv.Mat();
        cv.cvtColor(image, gray, cv.COLOR_RGBA2GRAY);
        return gray;
    }

    static resizeImage(image) {
        let gray = new cv.Mat();
        cv.cvtColor(image, gray, cv.COLOR_RGBA2GRAY)
        let dsize = new cv.Size(256, 256);
        let res = new cv.Mat();
        cv.resize(gray, res, dsize, 0, 0, cv.INTER_AREA);

        //cv.imshow('dstimg', res)
        let mat = cv.matFromArray(256, 256, cv.CV_8UC1, res.data)
        cv.imshow('dstimg', mat);
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

    static predictPneumonia(image, originalSize) {
        return  axios.post(
            url + '/predictPneumonia',
            {
                image: JSON.stringify(image.data),
                size: originalSize
            }
        );
    }
}