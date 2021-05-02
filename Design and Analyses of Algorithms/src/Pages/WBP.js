import React, { useState, useEffect } from "react";
import GenerateTestCase from "../functions/TestCase10";
import { Table } from "antd";

var wordBreak = function (s, wordDict) {
  // O (D * L)
  const tree = createTree(wordDict);

  const result = new Array(s.length + 1); // O(n)

  result[0] = true;

  // O( n * L )
  for (let i = 0; i < s.length; i += 1) {
    if (result[i]) {
      let node = tree;
      let cur = i;
      // L
      while (cur < s.length && node[s[cur]]) {
        node = node[s[cur]];
        if (node.result) {
          result[cur + 1] = true;
        }
        cur += 1;
      }
    }
  }
  return result[s.length] === true;
};

// O (D * L)
function createTree(dict) {
  const tree = {};

  dict.forEach((word) => {
    let node = tree;
    for (let i = 0; i < word.length; i += 1) {
      const letter = word[i];
      node[letter] = node[letter] || {};
      node = node[letter];
    }
    node.result = true;
  });

  return tree;
}

// let str = "ilikesamsung";
// let dict = [
//   "i",
//   "like",
//   "sam",
//   "sung",
//   "samsung",
//   " mobile",
//   "ice",
//   "cream",
//   "icecream",
//   "man",
//   "go",
//   "mango",
// ];

// console.log(wordBreak(str, dict));

const WBP = () => {
  const columns = [
    {
      title: "Word",
      dataIndex: "word",
      width: 150,
      ellipsis: true,
    },
    {
      title: "Dictionary",
      dataIndex: "dictionary",
      width: 150,
    },
    {
      title: "Output for TestCase",
      dataIndex: "Output",
      fixed: "right",
      width: 50,
    },
  ];

  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    const updateSource = [...dataSource];
    for (let i = 0; i < 10; i++) {
      let testcase = GenerateTestCase();

      updateSource.push({
        word: testcase[0],
        dictionary: testcase[1],
        Output: "",
      });
    }

    setDataSource(updateSource);
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Word Break Problem</h1>
      <p>
        Note: Please select the row to generate the output for a particular test
        case. The below test cases are randomly generated by using a function.
      </p>
      <Table
        columns={columns}
        dataSource={dataSource}
        onRow={(record) => ({
          onClick: () => {
            let newOutput;

            var X = record.word;
            var Y = record.dictionary;
            newOutput = wordBreak(X, Y);

            let updatedSource = [...dataSource];

            updatedSource = updatedSource.map((item) => {
              if (item.word === record.word) {
                return {
                  ...record,
                  Output: newOutput.toString(),
                };
              } else {
                return item;
              }
            });
            setDataSource(updatedSource);
          },
        })}
      />
    </div>
  );
};

export default WBP;
