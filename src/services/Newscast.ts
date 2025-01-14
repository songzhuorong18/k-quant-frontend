import { request } from '@umijs/max';
import { AShareFieldType } from '../pages/Newscast/AShare';

// 
export async function queryNewsMap() {
  return request('/get_tag_list/', {
    method: 'GET'
  });
}

export async function queryTodayNews(params: any) {
  console.log('🚀 ~ queryTodayNews ~ params:', params);

  return request(`/get_news?tag_list=${encodeURIComponent(params)}`, {
    method: 'GET',
  });
}

// 
export async function queryAShareModules() {
  return request('/get_Ashare_tabel/', {
    method: 'GET'
  });
}

export async function queryAShareText(params: AShareFieldType = {}) {
  return request('/get_Ashare_text/', {
    method: 'GET',
    params,
  });
}


export async function queryStocks() {
  return request('/get_lianban_test/', {
    method: 'GET'
  });
}