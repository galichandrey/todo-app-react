const convertSecToMin = (time) => {
  const min = Math.floor(time / 60);
  const sec = Number(time) - Number(min * 60);
  return [min, sec];
};

export default convertSecToMin;
