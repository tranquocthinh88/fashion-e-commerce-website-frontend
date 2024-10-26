import axios from 'axios';
import { ResponseSuccess } from "../dtos/responses/response.success";
import { DistrictModel, ProvinceModel, WardModel } from '../models/addess.model';

export const getAllProvinces = async (): Promise<ResponseSuccess<ProvinceModel[]>> => {
    try {
        const response = await axios({
            url: 'https://provinces.open-api.vn/api',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response && response.data) {
            return response.data;
        } else {
            throw new Error("Không nhận được dữ liệu từ API");
        }
    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu tỉnh thành: ", error);
        return Promise.reject({
            message: "Lỗi trong quá trình lấy dữ liệu tỉnh thành",
            error
        });
    }
}

export const getDistrictsByProvince = async (provinceCode: string): Promise<DistrictModel[]> => {
    try {
        const response = await axios({
            url: `https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`, // API lấy quận dựa trên mã tỉnh
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Trả về danh sách quận/huyện
        return response.data.districts;  // Giả sử danh sách quận/huyện nằm trong thuộc tính 'districts'
    } catch (error) {
        console.error("Lỗi khi lấy danh sách quận/huyện: ", error);
        return Promise.reject(error);
    }
};

export const getWardsByDistrict = async (districtCode: string): Promise<WardModel[]> => {
    try {
        const response = await axios({
            url: `https://provinces.open-api.vn/api/d/${districtCode}?depth=2`, // API lấy phường/xã dựa trên mã quận
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Trả về danh sách phường/xã
        return response.data.wards;  // Giả sử danh sách phường/xã nằm trong thuộc tính 'wards'
    } catch (error) {
        console.error("Lỗi khi lấy danh sách phường/xã: ", error);
        return Promise.reject(error);
    }
};