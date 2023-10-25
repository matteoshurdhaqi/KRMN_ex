import RestClient from "./restClient.js";

const user = {
        id:36,
        firstname: 'giovanni',
        lastname: 'belli',
        email: 'ciaobelli@example.com'
    }

const cli = new RestClient('http://dms.cyberdelia.eu/api/v1');

cli.get('user');
