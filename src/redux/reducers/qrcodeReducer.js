import * as qrcodeTypes  from '../types/qrcodeTypes';

const initState = {
    qrcodeDetails:{},
    imagePath:'',
    tokenExpire: false
}


const qrcodeReducer = (state=initState, action) => {
    switch(action.type){
        case qrcodeTypes.GENERATE_QRCODE:
            return {
                ...state,
                qrcodeDetails: { ...action.payload },
                imagePath: action.payload.data.imagePath,
                tokenExpire:false
            }
       
        default:
            return state;
    }

}

export default qrcodeReducer;