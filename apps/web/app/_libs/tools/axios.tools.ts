import type { SuccessPayload } from '@repo/dto/response';
import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios';

import { webConfig } from '@/config';

/**
 * HTTP 클라이언트 유틸리티
 * Axios 기반의 API 요청을 위한 헬퍼 클래스
 */
export class Api {
  private static baseURL = `${webConfig.apiRoute}`;

  private static config: AxiosRequestConfig = {
    withCredentials: true,
    baseURL: this.baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  /**
   * Axios 인스턴스를 생성하고 인터셉터를 설정합니다.
   */
  static createInstance() {
    const instance = axios.create(this.config);

    // 응답 인터셉터 설정 - 401 에러 시 자동 토큰 갱신
    instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        // 401 에러이고 아직 재시도하지 않은 경우
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            // 토큰 갱신 요청
            await instance.post('/auth/refresh');
            
            // 원래 요청 재시도
            return instance(originalRequest);
          } catch (refreshError) {
            // 토큰 갱신 실패 시 로그인 페이지로 리다이렉트
            if (typeof window !== 'undefined') {
              window.location.href = '/auth/signin';
            }
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );

    return instance;
  }

  /**
   * GET 요청을 수행합니다.
   */
  static async get<T>(restApi: string, config?: AxiosRequestConfig) {
    return this.createInstance().get<SuccessPayload<T>>(restApi, config);
  }

  /**
   * POST 요청을 수행합니다.
   */
  static async post<T, P>(
    restApi: string,
    data: P,
    config?: AxiosRequestConfig
  ) {
    return this.createInstance().post<
      T,
      AxiosResponse<SuccessPayload<T>, P>,
      P
    >(restApi, data, config);
  }

  /**
   * 파일 업로드를 위한 POST 요청을 수행합니다.
   */
  static async postWithFile<T, P>(
    restApi: string,
    data: P,
    config?: AxiosRequestConfig
  ) {
    return this.createInstance().post<
      T,
      AxiosResponse<SuccessPayload<T>, P>,
      P
    >(restApi, data, {
      ...config,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  /**
   * PATCH 요청을 수행합니다.
   */
  static async patch<T, P>(
    restApi: string,
    data: P,
    config?: AxiosRequestConfig
  ) {
    return this.createInstance().patch<
      T,
      AxiosResponse<SuccessPayload<T>, P>,
      P
    >(restApi, data, config);
  }

  /**
   * PUT 요청을 수행합니다.
   */
  static async put<T, P>(
    restApi: string,
    data: P,
    config?: AxiosRequestConfig
  ) {
    return this.createInstance().put<
      T,
      AxiosResponse<SuccessPayload<T>, P>,
      P
    >(restApi, data, config);
  }

  /**
   * DELETE 요청을 수행합니다.
   */
  static async delete<T>(restApi: string, config?: AxiosRequestConfig) {
    return this.createInstance().delete<SuccessPayload<T>>(restApi, config);
  }

  /**
   * GET 요청을 수행하고 응답 데이터만 반환합니다.
   */
  static async getQuery<D>(url: string) {
    const { data, } = await this.get<D>(url);
    return data;
  }

  /**
   * POST 요청을 수행하고 응답 데이터만 반환합니다.
   */
  static async postQuery<D, P>(url: string, postData: P) {
    const { data, } = await this.post<D, P>(url, postData);
    return data;
  }

  /**
   * PATCH 요청을 수행하고 응답 데이터만 반환합니다.
   */
  static async patchQuery<D, P>(url: string, patchData: P) {
    const { data, } = await this.patch<D, P>(url, patchData);
    return data;
  }

  /**
   * PUT 요청을 수행하고 응답 데이터만 반환합니다.
   */
  static async putQuery<D, P>(url: string, putData: P) {
    const { data, } = await this.put<D, P>(url, putData);
    return data;
  }

  /**
   * DELETE 요청을 수행하고 응답 데이터만 반환합니다.
   */
  static async deleteQuery<D>(url: string) {
    const { data, } = await this.delete<D>(url);
    return data;
  }

  /**
   * 데이터와 함께 DELETE 요청을 수행하고 응답 데이터만 반환합니다.
   */
  static async deleteWithDataQuery<D, P>(url: string, postData: P) {
    const { data, } = await this.delete<D>(url, {
      data: postData,
    });
    return data;
  }

  /**
   * 여러 데이터를 삭제하는 DELETE 요청을 수행하고 응답 데이터만 반환합니다.
   */
  static async deletesQuery<D, P>(url: string, deleteData: P) {
    const { data, } = await this.delete<D>(url, {
      data: deleteData,
    });
    return data;
  }
}
