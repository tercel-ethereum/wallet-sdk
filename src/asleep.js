
export default class Asleep {
    constructor() {
        this._timer = null;
    }
    
    async msleep(ms) {
        clearInterval(this._timer);
        return new Promise(resolve => {
            this._timer = setTimeout(resolve, ms)
        })
    }

    async sleep(s) {
        this.msleep(s*1000);
    }
}
