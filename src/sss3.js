import secrets from './lib/secrets.js'

class SSS3 {
    share(seedWords) {
        const s = secrets.str2hex(seedWords);
        return secrets.share(s, 3, 2);
    }

    combine(sharedA, sharedB) {
        const comb = secrets.combine([sharedA, sharedB])
        return secrets.hex2str(comb)
    }

    newShare(id, shares=[]) {
        return secrets.newShare(id, shares);
    }
}

let sss3 = new SSS3()

export default sss3