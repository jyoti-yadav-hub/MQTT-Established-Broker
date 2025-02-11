const aedes = require('aedes')()
const server = require('net').createServer(aedes.handle)
const httpServer = require('http').createServer()
const ws = require('websocket-stream')

MQTT_Port = 1008;
const wsPort = 1009;
// emitted when a client connects to the broker
aedes.on('client', function (client) {
    console.log(`CLIENT_CONNECTED : MQTT Client ${(client ? client.id : client)} connected to aedes broker ${aedes.id}`)
})
// emitted when a client disconnects from the broker
aedes.on('clientDisconnect', function (client) {
    console.log(`CLIENT_DISCONNECTED : MQTT Client ${(client ? client.id : client)} disconnected from the aedes broker ${aedes.id}`)
})
// emitted when a client subscribes to a message topic
aedes.on('subscribe', function (subscriptions, client) {
    console.log(`TOPIC_SUBSCRIBED : MQTT Client ${(client ? client.id : client)} subscribed to topic: ${subscriptions.map(s => s.topic).join(',')} on aedes broker ${aedes.id}`)
})
aedes.on('message', function (topic, msg) {
    console.log(`MESSAGW : MQTT Client ${(topic)} --------- ${msg}`)
})
// emitted when a client unsubscribes from a message topic
aedes.on('unsubscribe', function (subscriptions, client) {
    console.log(`TOPIC_UNSUBSCRIBED : MQTT Client ${(client ? client.id : client)} unsubscribed to topic: ${subscriptions.join(',')} from aedes broker ${aedes.id}`)
})
// emitted when a client publishes a message packet on the topic
aedes.on('publish', function (packet, client) {
    if (client) {
        console.log(`MESSAGE_PUBLISHED : MQTT Client published message "${packet.payload}" on ${packet.topic} to aedes`)
    }
})

server.listen(MQTT_Port, function () {
    console.log('Aedes MQTT server started and listening on port', MQTT_Port)
}),

ws.createServer({ server: httpServer }, aedes.handle)

httpServer.listen(wsPort, function () {
    console.log('websocket server listening on port ', wsPort)
})