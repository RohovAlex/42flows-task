const task = async <T>(value: T) => {
    await new Promise((r) => setTimeout(r, 100 * Math.random()));
    console.log(value);
};

class AsyncQueue {
    queue: Function[] = []
    count: number = 0
    add (task: Function) {
        const hasChannel = this.count === 0;
        if (hasChannel) {
          this.next(task);
          return;
        }
        this.queue.push(task);
      }
    async next(task: Function): Promise<void> {
        this.count++;
        await task();
        this.count --;
        if (this.queue.length > 0) {
            const task = this.queue.shift();
            if (task) this.next(task);
        }
    }
}

const queue = new AsyncQueue();

const run = async () => {
    await Promise.all([
        queue.add(() => task(1)),
        queue.add(() => task(2)),
        queue.add(() => task(3)),
        queue.add(() => task(4)),
    ]);
}

run();
