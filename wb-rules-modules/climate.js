var MODULE_NAME 		= "climate";
var MODULE_VERSION  = "1.8.0";

var data = {}

exports.start = function(config) {
  if (!validateConfig(config)) return;

  data[config.id] = {};
  data[config.id].t_floor_target = 0;

  //  device  //
	createDevice(config);

  //  rules  //
  createRule_externalSensor_tAir(
    config.id,
    config.t_air.device,
    config.t_air.control
  );
  createRule_externalSensor_tFloor(
    config.id,
    config.t_floor.device,
    config.t_floor.control
  );
  createRule_RANGE_externalfloor_heater_dimmer(
    config.id,
    config.floor_heater_dimmer.device,
    config.floor_heater_dimmer.control
  );
  if (config.radiator) {
    createRule_SWITCH_externalRadiator(
      config.id,
      config.radiator.device,
      config.radiator.control,
      config.radiator.activationValue
    );
  }

  //  timer  //
  createTimer_logic(config);

  log(config.id + ": Started (" + MODULE_NAME + " ver. " + MODULE_VERSION + ")");
};

//  Validate config  //

function validateConfig (_config) {
  if (!_config) {
    log("Error: " + MODULE_NAME + ": No config");
    return false;
  }

  if (!_config.id || !_config.id.length) {
    log("Error: " + MODULE_NAME + ": Config: Bad id");
    return false;
  }

  if (!_config.title || !_config.title.length) {
    log("Error: " + MODULE_NAME + ": Config: Bad title");
    return false;
  }

  return true;
}

//
//  Device  //
//

function createDevice(config) {
  var cells = {
		enabled:      { type: "switch", value: true, readonly: false  },
    t_air:        { type: "temperature",  value: 0, readonly: false },
    t_floor:      { type: "temperature",  value: 0, readonly: false },
    t_floor_min:  { type: "range",  max: 40, value: 20, readonly: false },
    t_floor_max:  { type: "range",  max: 40, value: 28, readonly: false },
    t_target:     { type: "range",  max: 40, value: 0, readonly: false },
    floor_heater_dimmer: { type: "range",  max: 100, value: 0, readonly: false },
    mode:         { type: "text", value: "AUTO", readonly: false }
	}

  if (config.radiator) {
    cells["radiator"] = { type: "switch", value: false, readonly: false }
  }

	defineVirtualDevice(config.id, {
	  title: config.title,
	  cells: cells
	});
}

//
//  Rules  //
//

//  sensor -> t_air  //
function createRule_externalSensor_tAir(device_id, device, control) {
  defineRule({
    whenChanged: device + "/" + control,
    then: function (newValue, devName, cellName) {
      var val = newValue;
      if (typeof newValue === 'string' || newValue instanceof String) {
        val = parseFloat(newValue);
      }

      if (dev[device_id]["t_air"] === val) return;
      dev[device_id]["t_air"] = val;
    }
  });
}

//  sensor -> t_floor  //
function createRule_externalSensor_tFloor(device_id, device, control) {
  defineRule({
    whenChanged: device + "/" + control,
    then: function (newValue, devName, cellName) {
      var val = newValue;
      if (typeof newValue === 'string' || newValue instanceof String) {
        val = parseFloat(newValue);
      }

      if (dev[device_id]["t_floor"] === val) return;
      dev[device_id]["t_floor"] = val;
    }
  });
}

//  floor_heater_dimmer -> device  //
function createRule_RANGE_externalfloor_heater_dimmer(device_id, device, control) {
  defineRule({
    whenChanged: device_id + "/floor_heater_dimmer",
    then: function (newValue, devName, cellName) {
      var deviceValue = Math.round(newValue * 255.0 / 100.0);
      if (dev[device][control] !== deviceValue) {
        dev[device][control] = deviceValue;
      }
    }
  });
}

//  floor_heater_dimmer -> device  //
function createRule_SWITCH_externalRadiator(device_id, device, control, activationValue) {
  if (activationValue === undefined || activationValue === null) {
    activationValue = true;
  }

  defineRule({
    whenChanged: device_id + "/radiator",
    then: function (newValue, devName, cellName) {
      var value = (newValue) ? activationValue : (!activationValue);
      if (dev[device][control] != value) { dev[device][control] = value; }
    }
  });
}

//
//  Timers  //
//

function createTimer_logic(config) {
  setInterval(function() {
    temperature_check(config.id, config);
  }, 1000);
}

function temperature_check(device_id, config) {
  //  check enabled  //
  if (!dev[device_id]["enabled"]) {
    dev[device_id]["floor_heater_dimmer"] = 0;
    return;
  }

  //
  //  Check air  //
  //

  //  hot -> set min temperature  //
	if (dev[device_id]["t_air"] >= dev[device_id]["t_target"] + 0.5) {
    if (data[device_id].t_floor_target !== dev[device_id]["t_floor_min"]) {
      data[device_id].t_floor_target = dev[device_id]["t_floor_min"];
      // log("Floor target: " + data[device_id].t_floor_target);
    }
  }

  //  cold -> set max temperature  //
	if (dev[device_id]["t_air"] <= dev[device_id]["t_target"] - 0.5) {
    if (data[device_id].t_floor_target !== dev[device_id]["t_floor_max"]) {
      data[device_id].t_floor_target = dev[device_id]["t_floor_max"];
      // log("Floor target: " + data[device_id].t_floor_target);
    }
  }

  //
  //  Check floor  //
  //

  //  hot -> set min floor_heater_dimmer  //
	if (dev[device_id]["t_floor"] >= (data[device_id].t_floor_target + 0.5) ) {
    dev[device_id]["floor_heater_dimmer"] = 0; // k - infinity
    // log("Floor: Cooling ...");

    // P - regulator
    // var delta = data[device_id].t_floor_target - dev[device_id]["t_floor"];
    //  floor_heater_dimmer = delta * k
    // more k -> more speed to target (check overheating)
  }

  //  cold -> set max floor_heater_dimmer  //
	if (dev[device_id]["t_floor"] <= (data[device_id].t_floor_target - 0.5) ) {
    dev[device_id]["floor_heater_dimmer"] = 100;
    // log("Floor: Heating ...");
  }

  //
  //  Check radiator  //
  //

  if (config.radiator) {
    //  hot -> set radiator off  //
  	if (dev[device_id]["t_air"] >= dev[device_id]["t_target"] + 0.5) {
      if (dev[device_id]["radiator"] != false) { dev[device_id]["radiator"] = false; }
    }

    //  cold -> set radiator on  //
  	if (dev[device_id]["t_air"] <= dev[device_id]["t_target"] - 0.5) {
      if (dev[device_id]["radiator"] != true) { dev[device_id]["radiator"] = true; }
    }
  }
}
