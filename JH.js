// 여기서 블록 생성 등의 데이터 사전 준비를 해줄 것
// 참여자는 4명으로 한정
// 트랜잭션은 넘어감
// 대신 객체 구조, db 쿼리 등은 사전 준비를 다 해놓았음
//

const { getBlocks, nextBlock } = require("./chainedBlock");
const { addBlock } = require("./checkValidBlock");
const { connectToPeers, getSockets } = require("./p2pServer.js");
const { connect } = require("./routers");

function JH() {
  console.log("정호 함수~");

  var i = 0;
  while (i < 1) {
    //   const data = req.body.data || ["aa"];
    const data = ["abcd"];
    const block = nextBlock(data);
    const block2 = addBlock(block);
    // console.log(block2);

    i++;
  }
  const result = getBlocks();
  console.log(result);

  // connectToPeers(["a", "b", "c"]);
  connectToPeers(["ws://localhost:6001"]);
  connectToPeers(["ws://localhost:6001"]);
  connectToPeers(["ws://localhost:6001"]);
  //   connectToPeers("c");

  const socket = getSockets();
  console.log(socket);
}

module.exports = { JH };