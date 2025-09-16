import Cookies from "universal-cookie";

const cookies = new Cookies();

class cookieServices {
    get(name: string) {
        return cookies.get(name);
    }
    set(name: string, value: string) {
        return cookies.set(name, value);
    }
    remove(name: string) {
        return cookies.remove(name);
    }
}

export default new cookieServices();