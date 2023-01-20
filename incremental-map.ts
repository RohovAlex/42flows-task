class IncrementalMap {
    currentState = new Map();
    changes = new Map();
    history = new Map();

    set(key: any, value: any) {
        this.changes.set(key, value);
        this.currentState.set(key, value);
    }
    get(key: any) {
        return this.currentState.get(key);
    }
    snapshot(version: number) {
        this.history.set(version, new Map(this.changes.entries()));
        this.changes = new Map();
    }
    loadSnapshot(version: number) {
        const snapshot = this.history.get(version);
        snapshot.forEach((value: any, key: any) => {
            this.currentState.set(key, value);
        });
    }
}
const map = new IncrementalMap();

map.set('a', 10);
map.set('b', 10);
console.log(' === 10', map.get('a'));
console.log(' === 10', map.get('b'));

map.snapshot(1);

map.set('a', 20);
console.log(' === 20', map.get('a'));
console.log(' === 10', map.get('b'));

map.loadSnapshot(1);
console.log(' === 10', map.get('a'));
console.log(' === 10', map.get('b'));

map.set('a', 30);
map.set('b', 30);
console.log(' === 30', map.get('a'));
console.log(' === 30', map.get('b'));

map.snapshot(2);

map.set('a', 50);
map.set('b', 50);
console.log(' === 50', map.get('a'));
console.log(' === 50', map.get('b'));

map.loadSnapshot(2);
console.log(' === 30', map.get('a'));
console.log(' === 30', map.get('b'));

map.loadSnapshot(1);
console.log(' === 10', map.get('a'));
console.log(' === 10', map.get('b'));
