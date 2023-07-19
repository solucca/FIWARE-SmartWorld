# SmartWorld Proxy by FIWARE [<img src="https://img.shields.io/badge/NGSI-LD-d6604d.svg" width="90"  align="left" />](https://www.etsi.org/deliver/etsi_gs/CIM/001_099/009/01.04.01_60/gs_cim009v010401p.pdf)[<img src="https://fiware.github.io/tutorials.IoT-Agent/img/fiware.png" align="left" width="162">](https://www.fiware.org/)<br/>
[![License: MIT](https://img.shields.io/github/license/fiware/tutorials.Iot-Agent.svg)](https://opensource.org/licenses/MIT)
[![Support badge](https://img.shields.io/badge/tag-fiware-orange.svg?logo=stackoverflow)](https://stackoverflow.com/questions/tagged/fiware)
[![JSON LD](https://img.shields.io/badge/JSON--LD-1.1-f06f38.svg)]

# Overview
This simple proxy was created using Node.js. Its job is to simply redirect requests to the context broker and return then with the right headers. <br>
This way users can access the FrontEnd without having to disable CORS Policy. This makes it possible to access it from your smartphone for example.