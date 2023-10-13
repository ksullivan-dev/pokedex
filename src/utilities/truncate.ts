function truncate<T>(list: T[], limit = 10) {
  const values = list.slice(0, limit);

  return {
    values,
    rest: list.length - limit,
  };
}

export { truncate };
