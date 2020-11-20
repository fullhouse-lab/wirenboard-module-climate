var climate = require("climate");

climate.start({
	id: 			"heater_kitchen",
	title: 		"Heater Kitchen",
	t_floor: 	{ device: "xiaomi_temperature_10", control: "temperature" },
  t_air: 		{ device: "xiaomi_temperature_1",  control: "temperature" },
  floor_heater_dimmer:  { device: "ddl24_rgb_11", control: "Blue" },
  radiator:             { device: "wb-mrps6_152", control: "K1", activationValue: false }
});

climate.start({
	id: 			"heater_living",
	title: 		"Heater Living",
	t_floor: 	{ device: "xiaomi_temperature_11", control: "temperature" },
  t_air: 		{ device: "xiaomi_temperature_2",  control: "temperature" },
  floor_heater_dimmer:	{ device: "ddl24_rgb_11", control: "Green" },
  radiator:             { device: "wb-mrps6_152", control: "K2", activationValue: false }
});

climate.start({
	id: 			"heater_bedroom_1",
	title: 		"Heater bedroom 1",
	t_floor: 	{ device: "xiaomi_temperature_12", control: "temperature" },
  t_air: 		{ device: "xiaomi_temperature_3",  control: "temperature" },
  floor_heater_dimmer:	{ device: "ddl24_rgb_11", control: "Red" },
  radiator:             { device: "wb-mrps6_152", control: "K3", activationValue: false }
});

climate.start({
	id: 			"heater_bedroom_2",
	title: 		"Heater Bedroom 2",
	t_floor: 	{ device: "xiaomi_temperature_13", control: "temperature" },
  t_air: 		{ device: "xiaomi_temperature_4",  control: "temperature" },
  floor_heater_dimmer:  { device: "ddl24_rgb_2",     control: "Green" },
  radiator:             { device: "wb-mrm2-mini_49", control: "Relay 2", activationValue: false }
});

climate.start({
	id: 			"heater_bedroom_3",
	title: 		"Heater Bedroom 3",
	t_floor: 	{ device: "xiaomi_temperature_14", control: "temperature" },
  t_air: 		{ device: "xiaomi_temperature_5",  control: "temperature" },
  floor_heater_dimmer:	{ device: "ddl24_rgb_2",     control: "Red" },
  radiator:             { device: "wb-mrm2-mini_49", control: "Relay 1", activationValue: false }
});

climate.start({
	id: 			"heater_toilet_1",
	title: 		"Heater Toilet 1",
	t_floor: 	{ device: "xiaomi_temperature_14", control: "temperature" },
  t_air: 		{ device: "xiaomi_temperature_7",  control: "temperature" },
  floor_heater_dimmer:	{ device: "ddl24_rgb_1", control: "Green" }
});

climate.start({
	id: 			"heater_toilet_2",
	title: 		"Heater Toilet 2",
	t_floor: 	{ device: "xiaomi_temperature_14", control: "temperature" },
  t_air: 		{ device: "xiaomi_temperature_8",  control: "temperature" },
  floor_heater_dimmer:	{ device: "ddl24_rgb_1", control: "Blue" }
});

climate.start({
	id: 			"heater_toilet_3",
	title: 		"Heater Toilet 3",
	t_floor: 	{ device: "xiaomi_temperature_14", control: "temperature" },
  t_air: 		{ device: "xiaomi_temperature_9",  control: "temperature" },
  floor_heater_dimmer:	{ device: "ddl24_rgb_1", control: "White" }
});

climate.start({
	id: 			"heater_hall",
	title: 		"Heater Hall",
	t_floor: 	{ device: "xiaomi_temperature_15", control: "temperature" },
  t_air: 		{ device: "xiaomi_temperature_6",  control: "temperature" },
  floor_heater_dimmer:	{ device: "ddl24_rgb_1", control: "Red" }
});
