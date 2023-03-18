import { Resource } from '../http';

export interface Pagination<T> extends Resource {
  total: number;
  page: number;
  pageSize: number;
  data: Array<T>;
}

export interface PaginationOptions {
  params: {
    [param: string]: string;
  };
}

/**
 * tracks for pagination data and page number for each tab
 */
export interface PaginationTab<T> {
  name: string;
  pageNumber: number;
  page?: Pagination<T>;
}
