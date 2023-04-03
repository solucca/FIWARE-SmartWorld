# Digital Twin of SmartWorld by FIWARE [<img src="https://img.shields.io/badge/NGSI-LD-d6604d.svg" width="90"  align="left" />](https://www.etsi.org/deliver/etsi_gs/CIM/001_099/009/01.04.01_60/gs_cim009v010401p.pdf)[<img src="https://fiware.github.io/tutorials.IoT-Agent/img/fiware.png" align="left" width="162">](https://www.fiware.org/)<br/>

[![FIWARE IoT Agents](https://nexus.lab.fiware.org/repository/raw/public/badges/chapters/iot-agents.svg)](https://github.com/FIWARE/catalogue/blob/master/iot-agents/README.md)
[![License: MIT](https://img.shields.io/github/license/fiware/tutorials.Iot-Agent.svg)](https://opensource.org/licenses/MIT)
[![Support badge](https://img.shields.io/badge/tag-fiware-orange.svg?logo=stackoverflow)](https://stackoverflow.com/questions/tagged/fiware)
[![JSON LD](https://img.shields.io/badge/JSON--LD-1.1-f06f38.svg)](https://w3c.github.io/json-ld-syntax/)

---
## Smartworld by FIWARE

FIWARE's Smartworld is a Model of a Smart City using bricks, sensors, electronics and the FIWARE system. 

The Model was created to show the endless possibilities of the FIWARE technology in multiple fields, like digital governance, energy management, city management, mobility and construction.

---

## General setup

For the general setup of the digital twin of the SmartWorld by FIWARE (lego-demonstrator) have a look at the ```DigitalTwinFlowchart.pdf```. The Base of the hole digital twin is the lego-demonstrator itself with all its microcontrollers, actuators and sensors. The information of the sensors is transferred from the microcontrollers via WiFi to the ```mosquitto MQTT-Broker```. From there the ```IoT-Agent``` is reading this information, translating it into ```NGSI-LD``` and sending it to the ```Orion-LD context broker```. The current data of the lego-demonstrator is available in real time and standartized in the context broker. The Digital Twin representation in the website is getting its information from the context broker. When you want to see the data over time you need to store it somewhere else. For this task the context broker sends the new data to ```Quantumleap```, which stores the data in a ```Crate-DB``` database. The dashboard-tool ```Grafana``` gets the information over time out of the database and show it in dashboards.

---

## Start up the context broker

To run the context broker you need to have docker compose version 2 installed.

The commands to control the system are:

- ```./services create``` : pulls the docker images
- ```./services setup``` : downloads context data and saves it to be used later whitout internet, and starts the context broker
- ```./services start``` : starts the context broker without the need of internet
- ```./services simulate``` : starts the context broker along with the simulator (needs internet)
- ```./services stop``` : stops all the docker containers
- ```./services delete``` : deletes all volumes, resets the context broker to its initial state, without any data and configuration

---

## Grafana Setup
Here is a description on how to correctly setup grafana and import all the dashboards into it:

Open Grafana in a browser with ```http://localhost:3003/```.

Configure the data source: Go to ```Configuration``` -> ```Data Sources``` -> ```Add Data Source```. Select a ```PostgreSQL``` data source. Fill in the following:

|             |Content              |
|-------------|---------------------|
|Name:        |```CrateDB```           |
|Host:        |```crate-db``` |
|Database:    |```doc```    |
|User:        |```crate```    |
|Password:    |``` ```              |
|TLS/SSL Mode:|```disable```        |

4. Import dashboard: Go to ```Create``` -> ```Import``` -> ```Upload JSON file```.
For the digital twin select the JSON files of the folder ```Grafana-Dashboards/Grafana_Lego```.

---

## License

[MIT](LICENSE) © 2020 FIWARE Foundation e.V.