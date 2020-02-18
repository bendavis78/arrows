import isFunction from 'lodash/isFunction';

import { DIRECTION } from '../consts';

const endNode = (point) => (isFunction(point.node)
  ? point.node()
  : point.node
);

const endXY = (point, parent) => {
  const node = endNode(point);
  window.nodes = window.nodes ? window.nodes : [];
  window.nodes.push(node);
  const rect = node.getBoundingClientRect();
  const parentRect = parent.getBoundingClientRect();
  rect.x -= parentRect.x;
  rect.y -= parentRect.y;
  switch (point.direction) {
    case DIRECTION.TOP_LEFT:
      return {
        x: rect.x,
        y: rect.y,
      };
    case DIRECTION.TOP:
      return {
        x: rect.x + rect.width / 2,
        y: rect.y,
      };
    case DIRECTION.TOP_RIGHT:
      return {
        x: rect.x + rect.width,
        y: rect.y,
      };
    case DIRECTION.RIGHT:
      return {
        x: rect.x + rect.width,
        y: rect.y + rect.height / 2,
      };
    case DIRECTION.BOTTOM_LEFT:
      return {
        x: rect.x,
        y: rect.y + rect.height,
      };
    case DIRECTION.BOTTOM:
      return {
        x: rect.x + rect.width / 2,
        y: rect.y + rect.height,
      };
    case DIRECTION.BOTTOM_RIGHT:
      return {
        x: rect.x + rect.width,
        y: rect.y + rect.height,
      };
    case DIRECTION.LEFT:
      return {
        x: rect.x,
        y: rect.y + rect.height / 2,
      };
    default:
      throw new Error('unexpected type');
  }
};

const ends = (point, parent) => ({
  ...point,
  ...endXY(point, parent),
});

export default ends;
