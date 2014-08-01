# Common algorithm practice using Javascript
---
As Javascript become more and more popular, there are many Javascript related jobs (Front-End, NodeJS...), so maybe you'll be asked some basic computer science question during the interview. It's cool if you can finish these algorithm and data structure puzzle with Javascript. Even though you will not attend any interview recently, learning some basic CS knowlege is still good for Front-End web developer. So I write some basic algorithms using Javascript, and also hope other guys can contribute to, and make a Javascript algorithm libray for us who love Javascript!

## LeetCode
LeetCode is a good place to prepare your technical interview, however LeetCode's online judge only support C++, Java and Python. I include some puzlles from LeetCode in here, all of them can be running as a standard NodeJS process which can accept input from stdin and output to the stdout. I put them under **/LeetCode/** dir, for example if you want run JumpGame puzzle of LeetCode, you just need type this in shell **node LeetCode/JumpGame.js** and then type data in stdin, press Ctrl+D to end the input, and the algorithm should be start running and give you the result in stdout.

## Basic data structure and algorithm
I also write some basic algorithm and data structure using Javascript, put them under **/Others/** folder. Still not cover enough CS basic knowlege, hope you guys can contribute more in future.

## Helper code
Under root folder, there are some code files can be used as teamplate or helper class to resolve LeetCode puzzle, they are:

* **jstemp.js**: Can be used as a template file to start resolve LeetCode puzzle.
* **treelab.js**: Can be used as Tree data structure helper function, which can handle LeetCode's Binary Tree Serialization (Check this: <https://oj.leetcode.com/problems/binary-tree-zigzag-level-order-traversal/>)
* **linkedlistlab.js**: Simple helper function for Linked List.

These helper code are still not perfect, they are very simple now, hope others can modify them and give us a better version.

