export interface StandardRequest {
  q: string | "";
  pageSize: number | null;
  page: number | null;
  sortBy: string | "";
  sortType: string | "";
}
