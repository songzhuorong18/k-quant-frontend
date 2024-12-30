import { request } from '@umijs/max';

export async function queryNewsMap() {
  return request('/get_lianban_test', {
    method: 'GET'
  });
}

export async function queryTodayNews(
  params: {
    // query
    /** keyword */
    keyword?: string;
    /** current */
    current?: number;
    /** pageSize */
    pageSize?: number;
  },
) {
  return request('/api/v1/queryTodayNews', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}