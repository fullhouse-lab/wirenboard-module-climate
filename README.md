Module to climate control

##  Preparation

Please connect your device to the internet

Install NodeJS, if it is not yet
```
curl -sL https://deb.nodesource.com/setup_12.x | bash -
apt-get install -y nodejs git make g++ gcc build-essential
```

##  Install

To install this packet use `wirenboard-module` command. Install it if necessary
```
npm i -g wirenboard-module
```

Add climate module and rule
```
wirenboard-module climate
```

Home bridge
```json
{
    "comment": "-------------------------  HEATER KITCHEN  -------------------------",
    "accessory": "mqttthing",
    "type": "custom",
    "name": "Кухня Отопление",
    "services": [
        {
            "type": "thermostat",
            "name": "Кухня",
            "topics": {
                "getCurrentTemperature": "/devices/heater_kitchen/controls/t_air",
                "getTargetTemperature": "/devices/heater_kitchen/controls/t_target",
                "setTargetTemperature": "/devices/heater_kitchen/controls/t_target/on",
                "getCurrentHeatingCoolingState": "/devices/heater_kitchen/controls/radiator",
                "setTargetHeatingCoolingState": "/devices/heater_kitchen/controls/enabled/on",
                "getTargetHeatingCoolingState": "/devices/heater_kitchen/controls/enabled"
            },
            "minTemperature": 0,
            "maxTemperature": 40,
            "heatingCoolingStateValues": [
                0,
                1
            ],
            "restrictHeatingCoolingState": [
                0,
                1
            ]
        },
        {
            "type": "heaterCooler",
            "name": "Пол на Кухне",
            "topics": {
                "getCurrentTemperature": "/devices/heater_kitchen/controls/t_floor",
                "setCoolingThresholdTemperature": "/devices/heater_kitchen/controls/t_floor_min/on",
                "getCoolingThresholdTemperature": "/devices/heater_kitchen/controls/t_floor_min",
                "setHeatingThresholdTemperature": "/devices/heater_kitchen/controls/t_floor_max/on",
                "getHeatingThresholdTemperature": "/devices/heater_kitchen/controls/t_floor_max",
                "setTargetHeaterCoolerState": "/devices/heater_kitchen/controls/kuku/on",
                "getTargetHeaterCoolerState": "/devices/heater_kitchen/controls/kuku"
            },
            "minTemperature": 0,
            "maxTemperature": 40,
            "restrictHeaterCoolerState": [
                0
            ]
        }
    ]
}
```

Siri (RU)
- Сири, выставь 24 градуса на кухне
- Сири, сделай потеплее / попрохладнее на кухне

----

Best regards
- **FullHouse team**
- https://fullhouse-online.ru
- support@fullhouse-online.ru
