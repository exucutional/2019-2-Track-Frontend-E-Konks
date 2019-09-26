import { WSAEHOSTDOWN } from "constants";

/*
 * Функция `convertBytesToHuman` должна принимать
 * аргумент `bytes` только числового типа.
 * Необходимо предусмотреть защиту от
 * передачи аргументов неправильного типа
 * и класса (например, отрицательные числа)
 */

export default function convertBytesToHuman(bytes) {
  if (typeof(bytes) !== "number") {
    return false;
  }
  if (bytes < 0) {
    return false;
  }
  var str = "";
  var degree = 0;
  var remain = (bytes > 1024) ? (bytes % 1024) : 0;
  while (Math.floor(bytes / 1024) > 0) {
    bytes = Math.floor(bytes / 1024);
    degree++;
  }
  if (remain / 1024 > 0.01) {
    str = bytes + (remain / 1024).toFixed(2).slice(1);
  } else {
    str = bytes;
  }
  switch(degree) {
    case 0:
      str += 'B';
      break;
    case 1:
      str += 'KB'
      break;
    case 2:
      str += 'MB';
      break;
    case 3:
      str += 'GB'
      break;
    case 4:
      str += 'TB';
      break;
    case 5:
      str += 'PB';
      break;
    case 6:
      str += 'EB';
      break;
    case 7:
      str += 'ZB';
      break;
    default:
      str += 'YB';
  }
  return str;
}
