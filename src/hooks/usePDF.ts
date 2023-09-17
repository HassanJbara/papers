const usePDF = () => {
  const parseIdFromHash = () =>
    document.location.hash.slice("#highlight-".length);

  const resetHash = () => {
    document.location.hash = "";
  };

  const getNewId = () => String(Math.random()).slice(2);

  return { parseIdFromHash, resetHash, getNewId };
};

export default usePDF;
