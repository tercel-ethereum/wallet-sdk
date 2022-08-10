import {stringToHex, hexToString, parseEvent, encodeEventTopics} from '../src/util.js';

let res;
res = stringToHex("Seaport");
console.log(res);

res = Number("Seaport".length).toString(16);
console.log(res);

res = hexToString("0x536561706f7274");
console.log(res);

res = encodeEventTopics("Transfer(address,address,uint256)");
console.log(res);


let logs = [
    {
      "transactionIndex": 0,
      "blockNumber": 23,
      "transactionHash": "0xc410f22ba03c11af3768900268756767f4ccc00bef51d2598b45f7f9435cfc95",
      "address": "0x2ef97f60B99611a0741B5ffA485DE4E595bA9411",
      "topics": [
        "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
        "0x000000000000000000000000b12a2f6faab46ae34d339672da774b5b49c556e4",
        "0x0000000000000000000000000aba74d628aee342c5217edfa0f22dc948d5e675",
        "0x000000000000000000000000000000002c8e2fff3c4b99196b919037a154b755"
      ],
      "data": "0x",
      "logIndex": 0,
      "blockHash": "0xb3f0b20287d08223595c1cb99933e799e1b9512c07eea61e5d671d7accea68d4"
    },
    {
      "transactionIndex": 0,
      "blockNumber": 23,
      "transactionHash": "0xc410f22ba03c11af3768900268756767f4ccc00bef51d2598b45f7f9435cfc95",
      "address": "0x2ef97f60B99611a0741B5ffA485DE4E595bA9411",
      "topics": [
        "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
        "0x000000000000000000000000b12a2f6faab46ae34d339672da774b5b49c556e4",
        "0x0000000000000000000000000aba74d628aee342c5217edfa0f22dc948d5e675",
        "0x00000000000000000000000000000000dd2be9c98041ab647cb87047e8d8b494"
      ],
      "data": "0x",
      "logIndex": 1,
      "blockHash": "0xb3f0b20287d08223595c1cb99933e799e1b9512c07eea61e5d671d7accea68d4"
    }
  ];
let abi = ["event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)"];
res = parseEvent(logs, abi);
console.log(res);