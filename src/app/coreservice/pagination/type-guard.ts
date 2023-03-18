import { Pagination } from '@app/coreservice/pagination/pagination';

export function IsPagination<T>(
  target: Pagination<T> | any
): target is Pagination<T> {
  const pagination = <Pagination<T>>target;
  return pagination.page !== undefined && pagination.pageSize !== undefined;
}
