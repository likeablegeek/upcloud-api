/*****
 * Import required modules
 */

const request = require("request");

/****
 * Define upcloud-api object
 */
let uc = {

    /*****
     * Global variables
     */
    user: "",
    pass: "",
    host: "api.upcloud.com",
    ver: "1.3",

    /*****
     * Module name
     */
    name: "upcloud-api", // Module name

    /*****
     * API manifest
     */

    manifest: {
        listServers: {
            type: "GET",
            path: "server"
        },
        listTemplates: {
            type: "GET",
            path: "storage/template"
        },
        listStorages: {
            type: "GET",
            path: "storage"
        },
        serverDetails: {
            type: "GET",
            path: "server/[serveruuid]"
        },
        storageDetails: {
            type: "GET",
            path: "storage/[storageuuid]"
        },
        createServer: {
            type: "POST",
            path: "server"
        },
        cloneStorage: {
            type: "POST",
            path: "storage/[storageuuid]/clone"
        },
        attachStorage: {
            type: "POST",
            path: "server/[serveruuid]/storage/attach"
        }
    },

    /*****
     * Utility function for issuing API calls
     */
    call: (cmd, params = {}, data = {}, callback = () => {}) => {

        let fn = (uc.manifest[cmd].type == "GET") ? request.get : request.post;

        let path = uc.manifest[cmd].path;

        for (param in params) {
            path = path.replace("[" + param + "]", params[param]);
        }

        let options = {
            url: "https://" + uc.host + "/" + uc.ver + "/" + path,
            auth: {
                username: uc.user,
                password: uc.pass
            }
        };

        if (uc.manifest[cmd].type == "POST") {
            options.json = true;
            options.body = data;
        }

        fn(options, (err, res, body) => {

            // Convert to string, parse as JSON
            if (typeof(body) == "string") {
                data = JSON.parse(body);
            } else {
                data = body;
            }

            // Call callback and pass data
            callback(data);

        });

    },

    /*****
     * Initialise API
     */
    init: (user, pass, ver = uc.ver, host = uc.host) => {
        uc.user = user;
        uc.pass = pass;
        uc.ver = ver;
        uc.host = host;
    },

}

module.exports = uc;