export default function getUrlParams(
  key,
  value,
  searchParams,
  ...paramsForDelete
) {
  searchParams.set(key, value);

  paramsForDelete.forEach((param) => searchParams.delete(param));

  return searchParams;
}