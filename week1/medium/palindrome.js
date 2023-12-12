/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str) {
  str = str.replace(/\s/g, '').toLowerCase();
  str = str.replace(/[^a-zA-Z]/g, '');
  let start = 0;
  let end = str.length-1;

  while(start < end) {
    if(str.charAt(start) != str.charAt(end)) {
      return false;
    } else {
      start++;
      end--;
    }
  }

  return true;
}

module.exports = isPalindrome;
