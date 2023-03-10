from time import sleep
import paho.mqtt.client as mqtt
from paho.mqtt.client import Client
from random import randint, random

harbour = ["ParkingSpot:Harbour:"+str(i) for i in range(1,4)]
parking = ["ParkingSpot:Mobility_Hub:"+str(i) for i in range(1,5)]
weather = ["WeatherObserved:Basis:"+str(i) for i in range(1,3)]
dokk1 = "OffStreetParking:Dokk1:1"
wind_generator = "GreenEnergyGenerator:Wind_Energy:1"
wind_consumer = "EnergyConsumer:Wind_Energy:1"

eletric_charger = ["electricVehicleChargingStation00"+str(i) for i in range(1,3)]
air_quality = "particulateMatter001"
weight = "weight001"
led = ["LED00"+str(i) for i in range(2,5)]
windmills = "windmills001"

def GenerateHarbour(client: Client):
    # Generates random Yes or No
    for device in harbour:
        client.publish(addr(device,"status"), 
                       ["Yes","No"][randint(0,1)])

def GenerateParking(client: Client):
    # Generates random Yes or No
    for device in parking:
        client.publish(addr(device,"status"), 
                       ["Yes","No"][randint(0,1)])

temp_hist = [randint(0,30) for i in range(len(weather))]
humid_hist = [randint(0,90) for i in range(len(weather))]
feels_temp_hist = [randint(0,30) for i in range(len(weather))]
def GenerateWeather(client: Client):
    global temp_hist
    global humid_hist
    global feels_temp_hist
    for i in range(len(weather)):
        temp_hist[i] += randint(-10,10)/10
        humid_hist[i] += randint(-1,1)/10
        if humid_hist[i] > 100: humid_hist[i] = 100
        if humid_hist[i] < 0: humid_hist[i] = 0
        feels_temp_hist[i] += randint(-10,10)/10
        client.publish(addr(weather[i],"temperature"),temp_hist[i])
        client.publish(addr(weather[i],"relativeHumidity"),humid_hist[i])
        client.publish(addr(weather[i],"feelLikesTemperature"),feels_temp_hist[i])

dokk1_free = randint(0,1000)
def GenerateDokk(client: Client):
    # has 1000 spots
    global dokk1_free
    dokk1_free += randint(-50,50)
    if dokk1_free > 1000: dokk1_free = 1000
    if dokk1_free < 0: dokk1_free = 0
    client.publish(addr(dokk1,"availableSpotNumber"), str(dokk1_free))
    client.publish(addr(dokk1,"occupiedSpotNumber"), str(200-dokk1_free))

def GenerateWind(client:Client):
    client.publish( addr(wind_consumer,"p"), str(randint(0,1000)))
    client.publish( addr(wind_generator,"maxEolicPowerGenerated"), str(randint(0,1000)))


def addr(device,attr):
    return f"/idFZy8D9KzFko7db/{device}/attrs/{attr}"

def SendRandomData(client):
    while True:
        print("A")
        GenerateHarbour(client)
        print("B")
        GenerateDokk(client)
        print("C")
        GenerateParking(client)
        print("D")
        GenerateWeather(client)
        print("E")
        GenerateWind(client)
        print("F")
        sleep(10)
        print("G")
    
    

def onConnect(client:mqtt.Client, userdata, flags, rc):
    print("Connected! ")
    #SendRandomData(client)
    client.publish(addr(harbour[0],"status"), "test")

def onMessage(client, userdata, msg):
    print("Message:", msg.topic, msg.payload)

def onPublished(client, userdata, mid):
    print("Published", userdata, mid)
    
client = mqtt.Client("Lucca")
client.username_pw_set(
    "LegoDemonstrator",
    "Lego12Demo34nstr56ator"
)

client.on_connect = onConnect
client.on_message = onMessage
client.on_publish = onPublished

#LegoDemonstrator
#Lego12Demo34nstr56ator
print("Starting software")
client.connect("mosquitto")
SendRandomData(client)
