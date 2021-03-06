import { Indexable } from "./types";

export const CONTAINER = 'container';
export const FIELD = 'field';
export const TEMPLATE = 'template';

class Registry {
    private mapping: Indexable
    constructor() {
        this.mapping = {};
    }

    get(name: string) {
        const o = this.mapping[name];
        if (o == null) throw new Error('No object registered for: ' + name);
        return o;
    }

    register(name: string, o: any) {
        this.mapping[name] = o;
    }
}

export const fields = new Registry();
export const registerField = fields.register.bind(fields);

export const containers = new Registry();
export const registerContainer = containers.register.bind(containers);

export const templates = new Registry();
export const registerTemplate = templates.register.bind(templates);

export default Registry;
