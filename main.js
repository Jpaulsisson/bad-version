// You are a product manager and currently leading a team to develop a new product. Unfortunately, the latest version of your product fails the quality check. Since each version is developed based on the previous version, all the versions after a bad version are also bad.

// Suppose you have n versions [1, 2, ..., n] and you want to find out the first bad one, which causes all the following ones to be bad.

// You are given an API bool isBadVersion(version) which returns whether version is bad. Implement a function to find the first bad version. You should minimize the number of calls to the API.

// Example 1:
// Input: n = 5, bad = 4
// Output: 4
// Explanation:
// call isBadVersion(3) -> false
// call isBadVersion(5) -> true
// call isBadVersion(4) -> true
// Then 4 is the first bad version.

// Example 2:
// Input: n = 1, bad = 1
// Output: 1



// if bad is 4 and n is 30 this is visually what will happen    vvvvvvvvv
// 1 2 3 4(*third call* isBad=true)bad->...5 6 7 8(*second call* isBad=true)bad->...9 10 11 12 13 14 15(*first call* isBad=true)bad->...16 17 18 19 20 21 22 23 24 25 26 27 28 29 30
console.log(Math.floor(31 / 2)); //start:1  mid:15(true)  end:30 
console.log(Math.floor(16 / 2)); //start:1  mid:8(true)   end:15
console.log(Math.floor(9 / 2)); //start:1   mid:4(true)   end:8
console.log(Math.floor(5 / 2)); //start:1   mid:2(false)  end:4  
console.log(Math.floor(6 / 2)); //start:2   mid:3(false)  end:4  
console.log(Math.floor(7 / 2)); //start:3   mid:3(false)  end:4  ....now that start finally === end.. we return end

// const versions = new Array(2569).fill(0)
// const bad = Math.floor(Math.random() * versions.length);

// console.log(`There are ${versions.length} versions.`); 
// console.log(`Bad is --> ${bad}`);

////// first attempt /////////                  //// I know it's gotta be basically a binary search tree
// function binarySearch(n, bad) {                      //// but I haven't done that in a while
//   if (n.length === 1) {
//     return 1;
//   } else {
//     let middleN = Math.ceil(n.length / 2);
//     if (middleN > bad) {
//       console.log(`middleN is ${middleN}, which is greater than bad`);
//       n.length = middleN;
//       binarySearch(n, bad);
//     } else if (middleN < bad) {
//       n = n.splice(middleN, n.length - 1);
//       console.log(`middleN is ${middleN}, which is less than bad`);       //something around this but I'll have to build it on
//       binarySearch(n, bad);                                               //leetcodes website since they have the repeat func
//     } else {
//       return console.log('MATCH!')
//     }
//   } return n;
// }

// console.log(binarySearch(versions, bad));

///// leetcode version ///////
// function recursive(n) {
//   let prev;
//   let answer;
//   if (n === 1) {
//       return 1;
//   } else {
//       let currentSplitPoint = Math.floor(n / 2);
//       let checker = Math.ceil(currentSplitPoint / 2);
//       if (checker > 1 && isBadVersion(currentSplitPoint)) {
//         prev = Math.floor(currentSplitPoint / 2);
//         recursive(prev);
//       } else if (checker > 1 && !isBadVersion(currentSplitPoint)) {
//         prev = currentSplitPoint + Math.ceil(currentSplitPoint / 2);
//         recursive(prev);
//       } else if (checker === 1) {
//         isBadVersion(currentSplitPoint - 1) ? answer = currentSplitPoint - 1: answer = currentSplitPoint;
//       } else {
//         answer = currentSplitPoint;
//       }
//   } return answer;
// };

function find(n) {
  let startingPoint = 1;
  let endingPoint = n;
  while (startingPoint < endingPoint) {
      let middlePoint = Math.floor((startingPoint + endingPoint) / 2);
      if (isBadVersion(middlePoint)) {
          endingPoint = middlePoint;
      } else {
          if (startingPoint === middlePoint) {
              return endingPoint;
          } else {
              startingPoint = middlePoint;
          }
          
        }
    }return endingPoint;
}
