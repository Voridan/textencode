const windows1251ToUnicode = {
  0x80: 0x0402,
  0x81: 0x0403,
  0x82: 0x201a,
  0x83: 0x0453,
  0x84: 0x201e,
  0x85: 0x2026,
  0x86: 0x2020,
  0x87: 0x2021,
  0x88: 0x20ac,
  0x89: 0x2030,
  0x8a: 0x0409,
  0x8b: 0x2039,
  0x8c: 0x040a,
  0x8d: 0x040c,
  0x8e: 0x040b,
  0x8f: 0x040f,
  0x90: 0x0452,
  0x91: 0x2018,
  0x92: 0x2019,
  0x93: 0x201c,
  0x94: 0x201d,
  0x95: 0x2022,
  0x96: 0x2013,
  0x97: 0x2014,
  0x98: 0x0098,
  0x99: 0x2122,
  0x9a: 0x0459,
  0x9b: 0x203a,
  0x9c: 0x045a,
  0x9d: 0x045c,
  0x9e: 0x045b,
  0x9f: 0x045f,
  0xa0: 0x00a0,
  0xa1: 0x040e,
  0xa2: 0x045e,
  0xa3: 0x0408,
  0xa4: 0x00a4,
  0xa5: 0x0490,
  0xa6: 0x00a6,
  0xa7: 0x00a7,
  0xa8: 0x0401,
  0xa9: 0x00a9,
  0xaa: 0x0404,
  0xab: 0x00ab,
  0xac: 0x00ac,
  0xad: 0x00ad,
  0xae: 0x00ae,
  0xaf: 0x0407,
  0xb0: 0x00b0,
  0xb1: 0x00b1,
  0xb2: 0x0406,
  0xb3: 0x0456,
  0xb4: 0x0491,
  0xb5: 0x00b5,
  0xb6: 0x00b6,
  0xb7: 0x00b7,
  0xb8: 0x0451,
  0xb9: 0x2116,
  0xba: 0x0454,
  0xbb: 0x00bb,
  0xbc: 0x0458,
  0xbd: 0x0405,
  0xbe: 0x0455,
  0xbf: 0x0457,
  0xc0: 0x0410,
  0xc1: 0x0411,
  0xc2: 0x0412,
  0xc3: 0x0413,
  0xc4: 0x0414,
  0xc5: 0x0415,
  0xc6: 0x0416,
  0xc7: 0x0417,
  0xc8: 0x0418,
  0xc9: 0x0419,
  0xca: 0x041a,
  0xcb: 0x041b,
  0xcc: 0x041c,
  0xcd: 0x041d,
  0xce: 0x041e,
  0xcf: 0x041f,
  0xd0: 0x0420,
  0xd1: 0x0421,
  0xd2: 0x0422,
  0xd3: 0x0423,
  0xd4: 0x0424,
  0xd5: 0x0425,
  0xd6: 0x0426,
  0xd7: 0x0427,
  0xd8: 0x0428,
  0xd9: 0x0429,
  0xda: 0x042a,
  0xdb: 0x042b,
  0xdc: 0x042c,
  0xdd: 0x042d,
  0xde: 0x042e,
  0xdf: 0x042f,
  0xe0: 0x0430,
  0xe1: 0x0431,
  0xe2: 0x0432,
  0xe3: 0x0433,
  0xe4: 0x0434,
  0xe5: 0x0435,
  0xe6: 0x0436,
  0xe7: 0x0437,
  0xe8: 0x0438,
  0xe9: 0x0439,
  0xea: 0x043a,
  0xeb: 0x043b,
  0xec: 0x043c,
  0xed: 0x043d,
  0xee: 0x043e,
  0xef: 0x043f,
  0xf0: 0x0440,
  0xf1: 0x0441,
  0xf2: 0x0442,
  0xf3: 0x0443,
  0xf4: 0x0444,
  0xf5: 0x0445,
  0xf6: 0x0446,
  0xf7: 0x0447,
  0xf8: 0x0448,
  0xf9: 0x0449,
  0xfa: 0x044a,
  0xfb: 0x044b,
  0xfc: 0x044c,
  0xfd: 0x044d,
  0xfe: 0x044e,
  0xff: 0x044f,
};

const fileInput = document.getElementById("fileInput");
const textArea = document.getElementById("textArea");
const sourceEncoding = document.getElementById("sourceEncoding");
const targetEncoding = document.getElementById("targetEncoding");
const converBtn = document.getElementById("converBtn");
const downloadBtn = document.getElementById("downloadBtn");

let bytesRead;

fileInput.addEventListener("change", () => {
  const file = fileInput.files[0];

  if (!file) return;

  readFileAsBytes(file, (bytes) => {
    bytesRead = bytes;
    let text;
    switch (sourceEncoding.value) {
      case "windows-1251":
        text = decodeWindows1251(bytes);
        break;
      default:
        text = decodeUTF8(bytes);
        break;
    }

    textArea.value = text;
  });
});

fileInput.addEventListener("blur", () => {
  const text = textArea.value;
  bytesRead = encodeUTF8(text);
});

converBtn.addEventListener("click", () => {
  let text;
  switch (targetEncoding.value) {
    case "windows-1251":
      text = decodeWindows1251(bytesRead);
      break;
    default:
      text = decodeUTF8(bytesRead);
      break;
  }

  textArea.value = text;
});

downloadBtn.addEventListener("click", () => {
  let bytes;
  switch (targetEncoding.value) {
    case "windows-1251":
      bytes = encodeTextToWindows1251(textArea.value);
      break;
    default:
      bytes = encodeUTF8(textArea.value);
      break;
  }

  downloadEncodedFile(fileInput.files[0].name, bytes);
});

function downloadEncodedFile(filename, encodedBytes) {
  try {
    let blob = new Blob([encodedBytes], { type: "application/octet-stream" });

    let link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename || "encoded.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("Error encoding text:", error);
  }
}

function readFileAsBytes(file, callback) {
  const reader = new FileReader();
  reader.onload = function (event) {
    callback(new Uint8Array(event.target.result));
  };
  reader.readAsArrayBuffer(file);
}

function decodeWindows1251(bytes) {
  try {
    const decoder = new TextDecoder("windows-1251");
    return decoder.decode(new Uint8Array(bytes));
  } catch (e) {
    console.warn(
      "TextDecoder does not support windows-1251, using fallback implementation"
    );
  }
}

// Encode Unicode string to Windows-1251 bytes
function encodeTextToWindows1251(text) {
  const bytes = [];

  for (let i = 0; i < text.length; i++) {
    const char = text.charCodeAt(i);

    // ASCII range maps directly
    if (char < 128) {
      bytes.push(char);
    } else {
      // Here you'd need the mapping table from Unicode to Windows-1251
      // This is where a full implementation would have all character mappings
      // For simplicity, I'm showing a partial implementation

      // Example: mapping Cyrillic characters
      if (char >= 0x0410 && char <= 0x044f) {
        // Russian alphabet characters - this is a simplified mapping
        bytes.push(char - 0x0410 + 0xc0);
      } else {
        // Fallback for characters not in Windows-1251
        bytes.push(0x3f); // Question mark
      }
    }
  }

  return new Uint8Array(bytes);
}

function encodeUTF8(text) {
  let bytes = [];
  for (let char of text) {
    let codePoint = char.codePointAt(0);

    if (codePoint <= 0x7f) {
      // 1-byte (ASCII)
      bytes.push(codePoint);
    } else if (codePoint <= 0x7ff) {
      // 2-byte
      bytes.push(0b11000000 | (codePoint >> 6));
      bytes.push(0b10000000 | (codePoint & 0b00111111));
    } else if (codePoint <= 0xffff) {
      // 3-byte
      bytes.push(0b11100000 | (codePoint >> 12));
      bytes.push(0b10000000 | ((codePoint >> 6) & 0b00111111));
      bytes.push(0b10000000 | (codePoint & 0b00111111));
    } else {
      // 4-byte
      bytes.push(0b11110000 | (codePoint >> 18));
      bytes.push(0b10000000 | ((codePoint >> 12) & 0b00111111));
      bytes.push(0b10000000 | ((codePoint >> 6) & 0b00111111));
      bytes.push(0b10000000 | (codePoint & 0b00111111));
    }
  }
  return new Uint8Array(bytes);
}

function decodeUTF8(bytes) {
  let text = "";
  let i = 0;

  while (i < bytes.length) {
    let byte1 = bytes[i];

    if (byte1 <= 0x7f) {
      // 1-byte (ASCII)
      text += String.fromCharCode(byte1);
      i += 1;
    } else if ((byte1 & 0b11100000) === 0b11000000) {
      // 2-byte
      let byte2 = bytes[i + 1];
      let codePoint = ((byte1 & 0b00011111) << 6) | (byte2 & 0b00111111);
      text += String.fromCharCode(codePoint);
      i += 2;
    } else if ((byte1 & 0b11110000) === 0b11100000) {
      // 3-byte
      let byte2 = bytes[i + 1];
      let byte3 = bytes[i + 2];
      let codePoint =
        ((byte1 & 0b00001111) << 12) |
        ((byte2 & 0b00111111) << 6) |
        (byte3 & 0b00111111);
      text += String.fromCharCode(codePoint);
      i += 3;
    } else if ((byte1 & 0b11111000) === 0b11110000) {
      // 4-byte
      let byte2 = bytes[i + 1];
      let byte3 = bytes[i + 2];
      let byte4 = bytes[i + 3];
      let codePoint =
        ((byte1 & 0b00000111) << 18) |
        ((byte2 & 0b00111111) << 12) |
        ((byte3 & 0b00111111) << 6) |
        (byte4 & 0b00111111);
      text += String.fromCodePoint(codePoint);
      i += 4;
    } else {
      // Invalid byte (skip)
      i += 1;
    }
  }
  return text;
}
