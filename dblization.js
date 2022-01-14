// 여기선 백에서 100% 되게 짜볼 것입니땅
// 백업화긴 한데 일단 걍 쌩으로 저장하는 식으로 짜보자

const { getBlocks } = require("./chainedBlock");
const Blocks = require("./models/blocks");

function jsonation() {}

function dblization() {
  // 어찌됐던 블록과 트랜잭션은 class화 할거기 때문에
  // 이에 대한 맞춤 함수를 하나 만들어보았다
  const block = getBlocks();

  const db = block[0].header.version;
  const index = block[0].header.index;
  //   자동화, json화

  //   console.log(db);
  //   Blocks.create({
  //     index: "3",
  //     version: "2",
  //     perviousHash: "1",
  //     timestamp: "1",
  //     merkleRoot: "1",
  //     difficulty: "1",
  //     nonce: "1",
  //   });

  Blocks.create({ index });
}
//     version: block[0].header.version,

module.exports = { dblization };
