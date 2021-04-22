/*
Copyright ©️ 2021 3Mo_Steve.
*/

module.exports = class Vector2 {
  constructor(x, z) {
    let type = [typeof x, typeof z].find(type => 'number' != type);
    if (type) throw new TypeError(`The "x, z" arguments must be of type number. Received ${type}.`);
    if (x == -0) x = 0;
    if (z == -0) z = 0;
    /**
     * @type {Number}
     */
    this.x = x;
    /**
     * @type {Number}
     */
    this.z = z;
  }
  /**
   * 
   * @param {Vector2} vec 
   * @description Returns a new vector with the result of the specified vector minus this.
   * @returns {Vector2}
   */
  subtractReverse(vec) {
    return new Vector2((vec.x - this.x), (vec.z - this.z));
  }
  /**
   * @param {Number} x
   * @param {Number} z
   * @description Adds the specified x,z vector components to this vector and returns the resulting vector. Does not change this vector.
   * @returns {Vector2}
   */
  addVector(x, z) {
    return new Vector2((this.x + x), (this.z + z));
  }

  /**
   * @param {Vector2} vec
   * @description Euclidean distance between this and the specified vector, returned as Number.
   * @returns {Number}
   */
  distance(vec) {
    return Math.sqrt(this.squareDistanceTo(vec));
  }
  /**
   * @param {Vector2} vec
   * @description The square of the Euclidean distance between this and the specified vector.
   * @returns {Number}
   */
  squareDistanceTo(vec) {
    let x = (vec.x - this.x);
    let z = (vec.z - this.z);
    return (x * x + z * z);
  }
  /**
   * @description Returns the length of the vector.
   * @returns {Number}
   */
  lengthVector() {
    return Math.sqrt(this.x * this.x + this.z * this.z);
  }

  /**
   * 
   * @param {Vector2} vec 
   * @param {Number} x
   * @description Returns a new vector with x value equal to the second parameter, along the line between this vector and the
   * passed in vector, or null if not possible.
   * @returns {Vector2} 
   */
  getIntermediateWithXValue(vec, x) {
    let x1 = vec.x - this.x;
    let z1 = vec.z - this.z;
    if (x1 * x1 < 1.0000000116860974e-7) return null;
    let d0 = (x - this.x) / x1;
    return (
      d0 >= 0 && d0 <= 1 ?
      new Vector2(this.x + x1 * d0, this.z + z1 * d0) :
      null
    );
  }
  /**
   * 
   * @param {Vector2} vec 
   * @param {Number} z
   * @description Returns a new vector with z value equal to the second parameter, along the line between this vector and the
   * passed in vector, or null if not possible.
   * @returns {Vector2} 
   */
  getIntermediateWithZValue(vec, z) {
    let x1 = vec.x - this.x;
    let z1 = vec.z - this.z;
    if (z1 * z1 < 1.0000000116860974e-7) return null;
    let d0 = (z - this.z) / z1;
    return (
      d0 >= 0 && d0 <= 1 ?
      new Vector2(this.x + x1 * d0, this.z + z1 * d0) :
      null
    );
  }
  /**
   * @description returns this Vector2 as a String.
   * @returns {String}
   */
  toString() {
    return `(${this.x}, ${this.z})`;
  }
  /**
   * 
   * @param {String} vecString
   * @description returns a new Vector2 class from a string.
   * @returns {Vector2}
   * 
   */
  parseVector(vecString) {
    let matched = vecString.match (/\(([0-9\.]+)\, ([0-9\.]+)\)/) || vecString.match(/\(([0-9\.]+)\,([0-9\.]+)\)/);
    if (!matched) return null;
    const [x, z] = matched[0].slice(1, -1).split(',').join('').split(' ');
    if ([parseFloat(x), parseFloat(z)].some(r => r == NaN)) return null;
    return new Vector2(parseFloat(x), parseFloat(z));
  }
  /**
   * 
   * @param {Number} size
   * @description Returns a new Vector2 but x, y, z will be multiplied by the size.
   * Nothing will be changed from [this] Vector
   * @returns {Vector2}
   */
  scale (size) {
    return new Vector2 (this.x * size, this.z * size);
  }
  /**
   * 
   * @param {Vector2} vec
   * @description Checks if the values of the specified vector are the same as this Vector's values 
   * @returns {Boolean}
   */
  equals(vec, { ignoreDots= false }={}) {
    return !ignoreDots ? (
      vec.x == this.x,
      vec.z == this.z
    ) : (
      Math.floor(vec.x) == Math.floor(this.x),
      Math.floor(vec.z) == Math.floor(this.z)
    );
  }

}
