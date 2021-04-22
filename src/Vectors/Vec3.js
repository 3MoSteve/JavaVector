module.exports = class Vector3 {
    constructor(x, y, z) {
      let type = [typeof x, typeof y, typeof z].find(type => 'number' != type);
      if (type) throw new TypeError(`The "x, y, z" arguments must be of type number. Received ${type}.`);
      if (x == -0) x = 0;
      if (y == -0) y = 0;
      if (z == -0) z = 0;
      /**
       * @type {Number}
       */
      this.x = x;
      /**
       * @type {Number}
       */
      this.y = y;
      /**
       * @type {Number}
       */
      this.z = z;
    }
    /**
     * 
     * @param {Vector3} vec 
     * @description Returns a new vector with the result of the specified vector minus this.
     * @returns {Vector3}
     */
    subtractReverse(vec) {
      return new Vector3((vec.x - this.x), (vec.y - this.y), (vec.z - this.z));
    }
    /**
     * @param {Number} x
     * @param {Number} y
     * @param {Number} z
     * @description Adds the specified x,y,z vector components to this vector and returns the resulting vector. Does not change this vector.
     * @returns {Vector3}
     */
    addVector(x, y, z) {
      return new Vector3((this.x + x), (this.y + y), (this.z + z));
    }
  
    /**
     * @param {Vector3} vec
     * @description Euclidean distance between this and the specified vector, returned as Number.
     * @returns {Number}
     */
    distance(vec) {
      return Math.sqrt(this.squareDistanceTo(vec));
    }
    /**
     * @param {Vector3} vec
     * @description The square of the Euclidean distance between this and the specified vector.
     * @returns {Number}
     */
    squareDistanceTo(vec) {
      let x = (vec.x - this.x);
      let y = (vec.y - this.y);
      let z = (vec.z - this.z);
      return (x * x + y * y + z * z);
    }
    /**
     * @description Returns the length of the vector.
     * @returns {Number}
     */
    lengthVector() {
      return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }
  
    /**
     * 
     * @param {Vector3} vec 
     * @param {Number} x
     * @description Returns a new vector with x value equal to the second parameter, along the line between this vector and the
     * passed in vector, or null if not possible.
     * @returns {Vector3} 
     */
    getIntermediateWithXValue(vec, x) {
      let x1 = vec.x - this.x;
      let y1 = vec.y - this.y;
      let z1 = vec.z - this.z;
      if (x1 * x1 < 1.0000000116860974e-7) return null;
      let d0 = (x - this.x) / x1;
      return (
        d0 >= 0 && d0 <= 1 ?
        new Vector3(this.x + x1 * d0, this.y + y1 * d0, this.z + z1 * d0) :
        null
      );
    }
    /**
     * 
     * @param {Vector3} vec 
     * @param {Number} y
     * @description Returns a new vector with y value equal to the second parameter, along the line between this vector and the
     * passed in vector, or null if not possible.
     * @returns {Vector3} 
     */
    getIntermediateWithYValue(vec, y) {
      let x1 = vec.x - this.x;
      let y1 = vec.y - this.y;
      let z1 = vec.z - this.z;
      if (y1 * y1 < 1.0000000116860974e-7) return null;
      let d0 = (y - this.y) / y1;
      return (
        d0 >= 0 && d0 <= 1 ?
        new Vector3(this.x + x1 * d0, this.y + y1 * d0, this.z + z1 * d0) :
        null
      );
    }
    /**
     * 
     * @param {Vector3} vec 
     * @param {Number} z
     * @description Returns a new vector with z value equal to the second parameter, along the line between this vector and the
     * passed in vector, or null if not possible.
     * @returns {Vector3} 
     */
    getIntermediateWithZValue(vec, z) {
      let x1 = vec.x - this.x;
      let y1 = vec.y - this.y;
      let z1 = vec.z - this.z;
      if (z1 * z1 < 1.0000000116860974e-7) return null;
      let d0 = (z - this.z) / z1;
      return (
        d0 >= 0 && d0 <= 1 ?
        new Vector3(this.x + x1 * d0, this.y + y1 * d0, this.z + z1 * d0) :
        null
      );
    }
    /**
     * @description returns this Vector3 as a String.
     * @returns {String}
     */
    toString() {
      return `(${this.x}, ${this.y}, ${this.z})`;
    }
    /**
     * 
     * @param {String} vecString
     * @description returns a new Vector3 class from a string.
     * @returns {Vector3}
     * 
     */
    parseVector(vecString) {
      let matched = vecString.match (/\(([0-9\.]+)\, ([0-9\.]+)\, ([0-9\.]+)\)/) || vecString.match(/\(([0-9\.]+)\,([0-9\.]+)\,([0-9\.]+)\)/);
      if (!matched) return null;
      const [x, y, z] = matched[0].slice(1, -1).split(',').join('').split(' ');
      if ([parseFloat(x), parseFloat(y), parseFloat(z)].some(r => r == NaN)) return null;
      return new Vector3(parseFloat(x), parseFloat(y), parseFloat(z));
    }
    /**
     * 
     * @param {Number} size
     * @description Returns a new Vector3 but x, y, z will be multiplied by the size.
     * Nothing will be changed from [this] Vector
     * @returns {Vector3}
     */
    scale (size) {
      return new Vector3 (this.x * size, this.y * size, this.z * size);
    }
    /**
     * 
     * @param {Vector3} vec
     * @description Checks if the values of the specified vector are the same as this Vector's values 
     * @returns {Boolean}
     */
    equals(vec, { ignoreDots= false }={}) {
      return !ignoreDots ? (
        vec.x == this.x,
        vec.y == this.y,
        vec.z == this.z
      ) : (
        Math.floor(vec.x) == Math.floor(this.x),
        Math.floor(vec.y) == Math.floor(this.y),
        Math.floor(vec.z) == Math.floor(this.z)
      );
    }
  
  }
  
