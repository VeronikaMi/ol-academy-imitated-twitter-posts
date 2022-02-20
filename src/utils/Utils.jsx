const colors = [
  "rgb(170, 71, 188)",
  "rgb(92, 107, 192)",
  "rgb(0, 136, 122)",
  "rgb(236, 64, 122)",
  "rgb(245, 81, 30)",
  "rgb(240, 215, 11)",
];

export const getColor = () => {
  return colors[Math.floor((Math.random() * 10) % 6)];
};
