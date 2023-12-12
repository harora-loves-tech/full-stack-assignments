// Replace multiple spaces with a single space
function removeExtraSpacesFromString(stringWithExtraSpace) {
    return stringWithExtraSpace.replace(/\s+/g, ' ');
}

console.log(removeExtraSpacesFromString("This is     a   String with        extra spaces "));
// Output: 'This is an example with extra spaces.'