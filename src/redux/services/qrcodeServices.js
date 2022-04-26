import { http } from './http';

export const qrcodeGenerateApi = async data => {
    return await http.post('admin/qrcode/generate-qrcode', data);
}