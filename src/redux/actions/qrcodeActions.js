import * as qrcodeTypes from '../types/qrcodeTypes';
import * as qrcodeServices from '../services/qrcodeServices';

export const qrcodeGenerateAction = (payload) => async dispatch => {
        try{
            const { data } = await qrcodeServices.qrcodeGenerateApi(payload);
            
            dispatch({
                type: qrcodeTypes.GENERATE_QRCODE,
                payload: data
            });

        }catch(err){
            throw err;
        }
    
}