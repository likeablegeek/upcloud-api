/*

upcloud-api: A Node JS module providing a client for th UpCloud API.

Version: 1.0.5
Author: @likeablegeek (https://likeablegeek.com/)
Distributed by: FlightSim Ninja (http://flightim.ninja)

Copyright 2021.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

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
        listServerConfs: {
            type: "GET",
            path: "server_size"
        },
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
        listCDROMs: {
            type: "GET",
            path: "storage/cdrom"
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
        modifyServer: {
            type: "PUT",
            path: "server/[serveruuid]"
        },
        startServer: {
            type: "POST",
            path: "server/[serveruuid]/start"
        },
        stopServer: {
            type: "POST",
            path: "server/[serveruuid]/stop"
        },
        restartServer: {
            type: "POST",
            path: "server/[serveruuid]/restart"
        },
        cancelServerOperation: {
            type: "POST",
            path: "server/[serveruuid]/cancel"
        },
        deleteServer: {
            type: "DELETE",
            path: "server/[serveruuid]?storages=[storageaction]&backups=[backupaction]"
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

        let fn = request.get; // GET is default requesst type

        switch(uc.manifest[cmd].type) {
            case "GET":
                fn = request.get;
                break;
            case "POST":
                fn = request.post;
                break;
            case "PUT":
                fn = request.put;
                break;
            case "DELETE":
                fn = request.del;
                break;
            }

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

        if (uc.manifest[cmd].type == "POST" || uc.manifest[cmd].type == "PUT") {
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