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

  return request(`/get_news/`, {
    method: 'GET',
    params: {
      tag_list: JSON.stringify(params)
    }
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

export async function get_mgxj() {
  return request('/get_mgxj/', {
    method: 'GET'
  });
}

export async function get_zdfb() {
  return request('/get_ztfb/', {
    method: 'GET'
  });
}

export async function get_zdzs() {
  return request('/get_zdzs/', {
    method: 'GET'
  });
}

export async function get_lrye() {
  return request('/get_lrye/', {
    method: 'GET'
  });
}

export async function get_etf() {
  return request('/get_etf/', {
    method: 'GET'
  });
}

export async function get_cje() {
  return request('/get_cje/', {
    method: 'GET'
  });
}