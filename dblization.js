// 여기선 백에서 100% 되게 짜볼 것입니땅
// 백업화긴 한데 일단 걍 쌩으로 저장하는 식으로 짜보자

const fs = require("fs");

const { getBlocks } = require("./chainedBlock");
const Blocks = require("./models/blocks");

function jsonation() {}

function dbscheme(data) {
  // 그러네 이렇게 함수를 따로 빼려고 했는데
  // 또 생각해보니 굳이 그럴 이유가 없다는 것을 또 느꼈네
  // JSON화가 역시.. 중요하다잉

  const length = Object.keys(data).length;

  // data.정호 = "abc";
  console.log(data);
  console.log(data);
  console.log(length);

  // 하드코딩 부분
  let result = [];

  // result.push(`<form onSubmit={handleSubmit2(onSubmit2)}>`);
  // result.push(`<form action="localhost:3001/apis/make2" method="post">`);
  // 이렇게 하니 프로토콜이 튀어나온다
  result.push(`<form action="/apis/make2" method="post">`);
  // for in의 대해서
  // 객체에 다가가는법
  // open api와 같이 해논걸 갖다 쓰는 입장이니까
  // 어떻게 되어있는지 이해를 해야한다
  // for (i = 0; i < length; i++) {
  let i = 0;
  for (key in data) {
    i++;
    // console.log(Object.keys(data));
    // console.log(data[i]);
    console.log(key);
    result.push(key);
    result.push(`
    <label>
      <input
        {...register2(${i})}
        type="radio"
        value="INTEGER"
        name="${i}"
      ></input>
      숫자
    </label>
    <label>
      <input
        {...register2("${i}")}
        type="radio"
        value="STRING"
        name="${i}"
      ></input>
      문자
    </label>
    <label>
      <input
        {...register2("${i}")}
        type="radio"
        value="OBJECT"
        name="${i}"
      ></input>
      객체
    </label>
    <br></br>
 `);
  }
  result.push(`   <input type="submit" />
  </form>`);

  // length 받아올꺼야
  // 받아온걸로 만들거야
  // 올만에 while 써야징
  // while
  return result;
}

function makedb(data) {
  // 두 객체 비교
  const blocks = getBlocks();
  // console.log(blocks[0].header);
  const keys = Object.keys(blocks[0].header);
  const values = Object.values(data);
  console.log(keys.length);
  let result = {};

  for (i = 0; i < keys.length; i++) {
    result[keys[i]] = `{ allowNull : true,  type : Sequelize.${values[i]} },`;
  }

  console.log(result);
  return result;
  // console.log(keys);
  // console.log(values);

  // 이거 처리해주는 것도 괜찮은 컨텐츠다
  // const data = { name: "email", value: "a@11`1a" };
  // args[data.name] = data.value;

  // 이건 굳이 필요가 없네;;
  // const args1 = {};
  // const db = block[0].header;
  // for (a in db) {
  //   args1[a] = db[a];
  //   console.log(a);
  // }
  // console.log(args1);
}

function fsing() {
  const date = new Date().toTimeString();
  const b = { a: "a", b: "b" };
  const data = { name: "email", value: "a@11`1a", b };
  const data1 = JSON.stringify(data);

  fs.writeFileSync(date + ".txt", data1, "utf8");
}

function dblization() {
  // 어찌됐던 블록과 트랜잭션은 class화 할거기 때문에
  // 이에 대한 맞춤 함수를 하나 만들어보았다

  // block구조에 대해 header, body(transcations)
  // 2가지 방법이 있을 수 있다

  // 애초에 설계가 잘 들어간 경우지(쉬우니까 라고 할 수도 있고)

  // 후자라면
  // ""는 윈도우 파일명에 못들어가는 어떠한 것처럼 최소한의 규제라고 볼 것 같거든?

  const block = getBlocks();
  // console.log(block);

  const header = block[0].header;
  const body = block[0].body;

  const jh = JSON.stringify(header);
  console.log(jh);

  // 이거 처리해주는 것도 괜찮은 컨텐츠다
  // const data = { name: "email", value: "a@11`1a" };
  // const args = {};
  // args[data.name] = data.value;

  // 이건 굳이 필요가 없네;;
  // const args1 = {};
  // const db = block[0].header;
  // for (a in db) {
  //   args1[a] = db[a];
  //   console.log(a);
  // }
  // console.log(args1);

  //   자동화, json화
  // 컬럼 자동화까지 구현을 하고 싶은데ㅠㅠ
  // 여기서 트랜잭션들에 대한 처리가 들어온다면

  //  맞춤은 객체 구조에 초점을 맞추었다

  // Blocks.create(db);
}

module.exports = { dblization, jsonation, fsing, dbscheme, makedb };
