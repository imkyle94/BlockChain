// 여기서 블록 생성 등의 데이터 사전 준비를 해줄 것
// 참여자는 4명으로 한정
// 트랜잭션은 넘어감
// 대신 객체 구조, db 쿼리 등은 사전 준비를 다 해놓았음
//

const { Transaction } = require("sequelize/dist");
const { addBlock1, getBlocks, nextBlock } = require("./chainedBlock");
const { addBlock } = require("./checkValidBlock");
const { connectClient, connectToPeers, getSockets } = require("./p2pServer.js");

let transaction = [];

function getTransaction() {
  return transaction;
}

function makeTransaction() {}

function JH() {
  console.log("정호 함수");

  // 시간에 따른 트랜잭션 생성함수를 만들자

  //

  var i = 0;
  // while (i < 2000000) {
  //   const data = req.body.data || ["aa"];
  const data = ["abcd"];
  // const block = nextBlock(data);

  const result1 = addBlock1(data);

  console.log(result1);

  // addBlock();
  // console.log(result1);

  // const block2 = await addBlock(block);
  // console.log(block2);

  // i++;
  // }

  const result = getBlocks();
  console.log(result);
  // console.log(result);

  // connectToPeers(["a", "b", "c"]);

  // connectToPeers(["ws://localhost:6001"]);
  // connectToPeers(["ws://localhost:6001"]);

  //   connectToPeers("c");

  // let sockInfo = [];

  // getSockets().forEach((s) => {
  //   sockInfo.push(s._socket.remoteAddress + ":" + s._socket.remotePort);
  // });

  // console.log(sockInfo);
}

module.exports = { JH };
