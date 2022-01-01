# upcloud-api

A Javascript client for the UpCloud API

## Installing `upcloud-api`

`upcloud-api` is available as a Node module on [npmjs.com](https://www.npmjs.com/) and can simply be installed with:

```
npm install upcloud-api
```

## Including `upcloud-api` in your scripts/applications

To use `upcloud-api` you need to include it in your scripts:

```
const uc = require("upcloud-api");
```

Or, if you aren't installing with `npm`, you can simply clone this repository and directly reference `upcloud-api.js`:

```
const uc = require("/path/to/upcloud-api.js");
```

## Initialisation

To initialise `upcloud-api` you need an UpCloud username and password for an account or subaccount with permission to access the UpCloud API. You can learn more about creating accounts with API permission in [Upcloud's documentation](https://upcloud.com/community/tutorials/getting-started-upcloud-api/).

Once you have the appropriate username and password you can initialise `upcloud-api` with:

```
uc.init(USERNAME_GOES_HERE,PASSWORD_GOES_HERE);
```

## Scope and Roadmap

This is an early pre-release of `upcloud-api` with many limitations:

1. This release only covers a handful of UpCloud API capabilities:
    1. Getting a list of servers,
    2. Getting a server's details,
    3. Creating a server,
    4. Getting list of storage templates,
    5. Cloning storage from a template, and
    6. Attaching storage to a server.
2. There is no error handling yet in `upcloud-api` so if you fail to authenticate, fail to connect to the UpCloud API or there is an error in the data passed to the API, `upcloud-api` will fail without any error handling and your script will terminate with an error.

This version currently uses version 1.3 of the UpCloud API.

## Using `upcloud-api`

### Invoking the API

All interaction with the API through `upcloud-api` is done through the `call` method of `upcloud-api`. The syntax for the `call` method is:

```
uc.call(COMMAND_NAME, PARAMETERS, POST_DATA, CALLBACK_FUNCTION);
```

The four arguments are:

* `COMMAND_NAME`: The name of an `upcloud-api` command as discussed below.
* `PARAMETERS`: An object containing one or more parameters required by the command being invoked.
* `DATA`: An object containing data to be sent as JSON in a POST request to the UpCloud API for commands which require POST requests with JSON data in the body of the request. To determine what data to send in a POST request, refer to the [UpCloud API documentation](https://developers.upcloud.com/1.3/).
* `CALLBACK_FUNCTION`: A function to invoke when the UpCloud API responds to the command. Three arguments will be sent to a single function containing the JSON object returned by the UpCloud API.

For instance, to retrieve a list of servers you could use:

```
uc.call("listServers", {}, {}, (res) => {
  console.log(res);
});
```

Or, to retrieve a server's specific details:

```
uc.call("serverDetails", { serveruuid: SERVER_UUID_HERE }, {}, (res) => {
  console.log(res);
});
```

Or, to attach storage to a server:

```
uc.call("createServer", { serveruuid: SERVER_UUID_HERE }, {
  storage_device": {
    type: "disk",
    address: "virtio",
    storage: "STORAGE_TEMPLATE_UUID_HERE",
    boot_disk: 0
  }
}, (res) => {
  console.log(res);
});
```

### Commands

#### `listServers`

*Description*: Requests a list of servers

*UpCloud API Endpoint*: `https://api.upcloud.com/1.3/server`

*Request Type*: GET

*Parameters*: None

### `listTemplates`

*Description*: Requests a list of storage templates

*UpCloud API Endpoint*: `https://api.upcloud.com/1.3/storage/template`

*Request Type*: GET

*Parameters*: None

### `listStorages`

*Description*: Requests a list of active storage items

*UpCloud API Endpoint*: `https://api.upcloud.com/1.3/storage`

*Request Type*: GET

*Parameters*: None

### `serverDetails`

*Description*: Request details of a specific server

*UpCloud API Endpoint*: `https://api.upcloud.com/1.3/server`

*Request Type*: GET

*Parameters*:

* `serveruuid`: UUID for the server

### `storageDetails`

*Description*: Request details of a specific storage item

*UpCloud API Endpoint*: `https://api.upcloud.com/1.3/storage`

*Request Type*: GET

*Parameters*:

* `storageuuid`: UUID for the storage item

### `createServer`

*Description*: Create a new server

*UpCloud API Endpoint*: `https://api.upcloud.com/1.3/server`

*Request Type*: POST

*Parameters*: None

*POST Data*: See the [UpCloud API documentation](https://developers.upcloud.com/1.3/)

### `cloneStorage`

*Description*: Clone a storage template to a new storage item

*UpCloud API Endpoint*: `https://api.upcloud.com/1.3/storage/[UUID]/clone`

*Request Type*: POST

*Parameters*:

* `storageuuid`: UUID for the storage template

*POST Data*: See the [UpCloud API documentation](https://developers.upcloud.com/1.3/)

### `attachStorage`

*Description*: Attach a storage item to a server

*UpCloud API Endpoint*: `https://api.upcloud.com/1.3/server/[UUID]/storage/attach`

*Request Type*: POST

*Parameters*:

* `serveruuid`: UUID for the server

*POST Data*: See the [UpCloud API documentation](https://developers.upcloud.com/1.3/)

## Dependencies

`upcloud-api` depends on the following `npm`/Node packages:

* [`request`](https://www.npmjs.com/package/request) - Simplified HTTP client for connecting to the UpCloud endpoints

## Copyright and License

This version is `upcloud-api` Copyright 2021, @likeablegeek. Distributed by [FlightSim Ninja](https://flightsim.ninja/).

You may not use this work/module/file except in compliance with the License. Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
