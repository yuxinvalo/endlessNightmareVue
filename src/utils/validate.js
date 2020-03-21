/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const Regx = /^[A-Za-z0-9]+$/
  var valid = true
  if (!Regx.test(str) || !str || str.length < 4)
    valid = false
  console.log(str)
  console.log("validate user: " + valid)
  return valid
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validEmail(str) {
  const regx = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
  console.log("validate user: " + str + " test : "+ regx.test(str))
  return regx.test(str)
}
