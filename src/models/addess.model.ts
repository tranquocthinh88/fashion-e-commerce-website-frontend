export type AddressModel = {
    id?: number;
    street?: string;
    district?: string;
    city?: string;
}

export type ProvinceModel = {
    name: string,
    code: number,
    division_type: string,
    codename: string,
    phone_code: number,
    districts: []
}


export type DistrictModel = {
    name: string,
    code: number,
    division_type: string,
    codename: string,
    phone_code: number,
    wards: []
}


export type WardModel = {
    name: string,
    code: number,
    division_type: string,
    codename: string,
    district_code: number,
}