import Engine from './Engine';
import DisableWith from './behaviors/DisableWith';
import Remote from './behaviors/Remote';

let engine = new Engine();

engine.register(new DisableWith());
engine.register(new Remote());

export default engine;
