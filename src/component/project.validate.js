import React from 'react';

export default class ProjectValidate {
  validateData = {};

  data(data) {
    this.validateData = data;
    return this;
  }

  required(key, message) {
    let value = this.validateData[key];
    if (value === undefined || value === null || value.length === 0) {
      throw message === undefined ? null : message;
    }
    return this;
  }

  is_number(key, message) {
    let value = this.validateData[key];
    if (value !== undefined && value !== null && value.length) {
      let floatValue = Number.parseFloat(value);
      if (isNaN(floatValue)) {
        throw message === undefined ? null : message;
      }
      if (value.toString() !== floatValue.toString()) {
        throw message === undefined ? null : message;
      }
      if (value.toString().indexOf(',') !== -1) {
        throw message === undefined ? null : message;
      }
    }
    return this;
  }

  is_email(key, message) {
    let value = this.validateData[key];
    if (value !== undefined && value !== null && value.length) {
      let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (!regex.test(value)) {
        throw message === undefined ? null : message;
      }
    }
    return this;
  }

  is_equal(key1, key2, message) {
    let value1 = this.validateData[key1];
    let value2 = this.validateData[key2];
    if (value1 !== value2) {
      throw message === undefined ? null : message;
    }
    return this;
  }

  in_array(key, array, message) {
    let value = this.validateData[key];
    if (value !== undefined && value !== null && value.length) {
      if (array.indexOf(value) === -1) {
        throw message === undefined ? null : message;
      }
    }

    return this;
  }

  custom(callback, message) {
    let success = callback(this.validateData);
    if (!success) {
      throw message === undefined ? null : message;
    }
    return this;
  }
}
