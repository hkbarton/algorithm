let binarySearch = function (array, target) {
  let start = 0
  let end = array.length - 1

  while (end >= start) {
    const middleIndex = Math.floor((start + end) / 2)
    if (target === array[middleIndex]) {
      return true
    } else if (target > array[middleIndex]) {
      start = middleIndex + 1
    } else {
      end = middleIndex - 1
    }
  }
  return false
}

let searchMatrix = function (matrix, target) {
  let start = 0
  let end = matrix.length - 1

  while (end >= start) {
    const middleIndex = Math.floor((start + end) / 2)
    const middle = matrix[middleIndex]
    if (target > middle[middle.length - 1]) {
      start = middleIndex + 1
    } else if (target < middle[0]) {
      end = middleIndex - 1
    } else {
      return binarySearch(middle, target)
    }
  }
  return false
}

console.log(searchMatrix(
  [
    [1, 3, 5, 7],
    [10, 11, 16, 20],
    [23, 30, 34, 50]
  ],
  50
))
