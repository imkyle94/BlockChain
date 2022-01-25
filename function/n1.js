const { connectClient } = require("../p2pServer");
const { getTransaction } = require("../JH");
const { addBlock } = require("../checkValidBlock");
const { addBlock1 } = require("../chainedBlock");

function n1() {
  // 자바스크립트는 싱글 쓰레드다
  // 따라서 이 조건을 지켜주며 코딩을 해야한다
  // 그래서 setTimeout을 쓰는 거구나
  connectClient(6001);

  const transaction = getTransaction();

  //   블록을 찾은 과정이 addBlock
  addBlock(transaction);

  addBlock1;

  //   이렇게 함수 나열이 되는데 어떻게 실행이 되지
}

module.exports = { n1 };
