import axios, { AxiosResponse } from "axios";
import { toCamelCase, toSnakeCase } from "@dontloop/utils";
import { BASE_ENDPOINT, TOKEN_KEY } from "../../config";

export interface IBaseResponse<T> {
  count: number;
  previous: string;
  next: string;
  results: T[];
}

export interface IBaseOption {
  value: string;
  label: string;
  id: string;
}

export type BaseError = string[];

class Model {
  /**
   * Service ednpoint
   */
  public static endpoint: string;

  /**
   * Response shape
   */
  public static response: AxiosResponse;

  /**
   * Setup endpoint method
   * @param endpoint
   */
  static initial({ endpoint }: { endpoint: string }) {
    this.endpoint = endpoint;
  }

  /**
   * Axios client
   */
  static client() {
    if (typeof window !== "undefined") {
      //Read token from local storage
      const token = localStorage.getItem(TOKEN_KEY);
      axios.defaults.baseURL = BASE_ENDPOINT;
      axios.defaults.headers.common.Authorization = token
        ? "Bearer " + token
        : "";
    }
    return axios;
  }

  /**
   * Convert all to camelCase
   * @param data
   */
  static resolve<T>(data: T): Promise<T> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        return resolve(toCamelCase<T, T>(data));
      }, 1000);
    });
  }

  /**
   * Get all resources
   * @param params
   */
  static async find<T>(params: any): Promise<T> {
    const { data } = await this.client().get<T>(this.endpoint, {
      params: toSnakeCase(params),
    });
    return this.resolve<T>(data);
  }

  /**
   * Retrieve one resource item
   * @param id
   */
  static async findOne<T>(id: string, params?: any): Promise<T> {
    const { data } = await this.client().get<T>(this.endpoint + id + "/", {
      params: toSnakeCase(params),
    });
    return this.resolve<T>(data);
  }

  /**
   * Creating resource
   * @param payload
   */
  static async create<T>(payload: any): Promise<T> {
    const { data } = await this.client().post<T>(
      this.endpoint,
      toSnakeCase(payload)
    );
    return this.resolve<T>(data);
  }

  /**
   * Updating resource
   * @param id
   * @param payload
   */
  static async update<T>(id: string, payload: any): Promise<T> {
    const { data } = await this.client().patch<T>(
      this.endpoint + id + "/",
      toSnakeCase(payload)
    );
    return this.resolve<T>(data);
  }

  /**
   * Delete resource
   * @param id
   */
  static async destroy(id: string | undefined): Promise<void> {
    await this.client().delete(this.endpoint + id + "/");
    return Promise.resolve();
  }
}

export default Model;

export type BaseModelType = typeof Model;
