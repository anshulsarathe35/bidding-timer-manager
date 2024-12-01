class BiddingTimerManager {
    constructor() {
        this.timers = {};
    }

    createTimer(id, duration, onEndCallback) {
        if (this.timers[id]) {
            throw new Error(`Timer with ID "${id}" already exists.`);
        }

        const endTime = Date.now() + duration;
        this.timers[id] = {
            endTime,
            interval: setInterval(() => {
                const remaining = Math.max(0, endTime - Date.now());
                if (remaining === 0) {
                    clearInterval(this.timers[id].interval);
                    delete this.timers[id];
                    if (onEndCallback) onEndCallback();
                }
            }, 1000)
        };
    }

    getRemainingTime(id) {
        const timer = this.timers[id];
        if (!timer) throw new Error(`Timer with ID "${id}" does not exist.`);
        return Math.max(0, timer.endTime - Date.now());
    }

    removeTimer(id) {
        const timer = this.timers[id];
        if (!timer) throw new Error(`Timer with ID "${id}" does not exist.`);
        clearInterval(timer.interval);
        delete this.timers[id];
    }

    clearAllTimers() {
        Object.keys(this.timers).forEach(id => this.removeTimer(id));
    }
}


module.exports = BiddingTimerManager;
