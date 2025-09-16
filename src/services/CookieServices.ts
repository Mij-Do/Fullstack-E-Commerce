import Cookies from "universal-cookie";

const cookies = new Cookies();

class cookieServices {
    get(name: string) {
        return cookies.get(name);
    }
    set(name: string, value: string, options?: {}) {
        return cookies.set(name, value, options);
    }
    remove(name: string) {
        return cookies.remove(name);
    }
}

export default new cookieServices();