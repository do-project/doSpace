/*************************************************************************************
 *deviceone token 解密算法
 *
 **************************************************************************************/

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function InvalidCharacterError(message) {
    this.message = message;
}
InvalidCharacterError.prototype = new Error;
InvalidCharacterError.prototype.name = 'InvalidCharacterError';

// encoder
// [https://gist.github.com/999166] by [https://github.com/nignag]

function btoa(input) {
    var str = String(input);
    for (
        // initialize result and counter
        var block, charCode, idx = 0, map = chars, output = '';
        // if the next str index does not exist:
        //   change the mapping table to "="
        //   check if d has no fractional digits
        str.charAt(idx | 0) || (map = '=', idx % 1);
        // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
        output += map.charAt(63 & block >> 8 - idx % 1 * 8)
    ) {
        charCode = str.charCodeAt(idx += 3 / 4);
        if (charCode > 0xFF) {
            throw new InvalidCharacterError("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");
        }
        block = block << 8 | charCode;
    }
    return output;
}

// decoder
// [https://gist.github.com/1020396] by [https://github.com/atk]

function atob(input) {
    var str = String(input).replace(/=+$/, '');
    if (str.length % 4 == 1) {
        throw new InvalidCharacterError("'atob' failed: The string to be decoded is not correctly encoded.");
    }
    for (
        // initialize result and counters
        var bc = 0, bs, buffer, idx = 0, output = '';
        // get next character
        buffer = str.charAt(idx++);
        // character found in table? initialize bit storage and add its ascii value;
        ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
            // and if not first of each 4 characters,
            // convert the first 8 bits to one ascii character
        bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0
    ) {
        // try to find character in table (0-63, not found => -1)
        buffer = chars.indexOf(buffer);
    }
    return output;
}

function decodebase64(str) {
    return decodeURIComponent(escape(atob(str.replace("-", "+").replace("_", "/"))));
}
//调用这个函数就机密
function decode(jwt) {
    var segments = jwt.split('.');
    if (jwt == "") {
        return "";
    }
    if (segments.length != 3) {
        throw "JWT is required to have three segments"
    }
    return decodebase64(segments[1]);
}

module.exports.btoa = btoa;
module.exports.atob = atob;
module.exports.decodebase64 = decodebase64;
module.exports.decode = decode;