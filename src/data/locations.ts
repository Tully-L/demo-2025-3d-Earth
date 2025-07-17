// 校区位置数据
export interface CampusLocation {
  id: string;
  name: string;
  nameEn: string;
  coordinates: [number, number]; // [经度, 纬度]
  description: string;
}

export const campusLocations: CampusLocation[] = [];

// 获取所有校区
export const getAllCampuses = (): CampusLocation[] => {
  return campusLocations;
};

// 根据ID获取校区
export const getCampusById = (id: string): CampusLocation | undefined => {
  return campusLocations.find(campus => campus.id === id);
}; 