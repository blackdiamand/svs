// export OneOf function(array) {
//
// }

/**
* Collection of common validator functions
*/
export class Validators {

  /**
  * Always true (mainly for test)
  */
  static get validated () {
    return (value) => { return true }
  }

  /**
  * Check if a value is provided. Only undefined is considered not provided
  */
  static get required () {
    return (value) => {
      return value !== undefined
    }
  }

  /**
  * Check if the value is true. No coerscion
  */
  static get requiredTrue () {
    return (value) => {
      return value === true
    }
  }

  /**
  * Checks if the value is greater or equal than min
  */
  static min (min) {
    return (value) => {
      return value >= min
    }
  }

  /**
  * Checks if the value is lower or equal than max
  */
  static max (max) {
    return (value) => {
      return value <= max
    }
  }

  /**
  * Checks if the value is a part of the values provided
  */
  static oneOf(array) {
    return (value) => {
      if (!array) return false
      return array.indexOf(value) != -1
    }
  }

  /**
  * Checks if the value matches the pattern
  * @param {RegExp} regexp - Expression to match
  * @param {boolean} loose - If false, matches the exact expression. If true validates if the regexp is found in the value
  */
  static pattern(regexp, loose) {

    if (!regexp) return (value) => { return true }
    if (loose) return (value) => {
      return regexp.test(value)
    }

    return (value) => {
      if (value === undefined || value === null) return false
      var match = value.match(regexp)
      return !!(match && value === match[0])
    }
  }

  static get discordUserName() {
    return Validators.pattern(/^.{3,32}#[0-9]{4}$/)
  }

  static get discordInviteLink() {
    return Validators.pattern(/^(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li)|discordapp\.com\/invite)\/.+[a-z]$/)
  }
}

/**
* Generates a validator function that will validate all the validators given in parameter
*/
export function Validate(validators) {
  if (validators instanceof Array) {
    return function(value) {
      let validated = true
      for (let validator of validators) {
        let state = validator(value)
        validated = validated && !!state
      }
      return validated
    }
  } else {
    return validators
  }


}