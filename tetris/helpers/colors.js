/**
 * @since 2019-09-23 07:51
 * @author vivaxy
 */
export const colors = [
  '#f1c40f',
  '#2ecc71',
  '#9b59b6',
  '#d35400',
  '#2c3e50',
  '#27ae60',
  '#f39c12',
  '#3498db',
  '#8e44ad',
  '#c0392b',
  '#34495e',
  '#1abc9c',
  '#e74c3c',
  '#2980b9',
  '#e67e22',
  '#16a085',
];

export function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

let index = 0;
export function getNextColor() {
  if (index >= colors.length) {
    index = 0;
  }
  return colors[index++];
}
