function init() {
  script.log("Panasonic Projector IP module loaded");
}

function moduleParameterChanged(param) {
  script.log(param.name + " parameter changed, new value: " + param.get());
}

function send_command(command) {
	local.send("00" + command + "\r \n");
}

function power(value) {
  send_command(value);
}

function shutter(value) {
  send_command("OSH:" + value);
}

function shutter_fade(in_out, duration) {
  send_command("VXX:SEFS" + in_out + "=" + duration);
}

function input_select(input) {
  send_command("IIS:" + input);
}

function projection_method(method) {
  send_command("OIL:" + method);
}

function screen_format(ratio) {
  send_command("VSF:" + ratio);
}

function screen_position(h_v, positionV, positionH) {
  if (h_v == "V") position = positionV;
  else position = positionH;
  send_command("VXX:" + h_v + "SPI0=" + position);
}

function screen_rotation(rotaion) {
  send_command("VXX:IROI1=+0000" + rotaion);
}

function picture_mode(mode) {
  send_command("VPM:" + mode);
}

function picture_contrast(value) {
  value = value + 32;
  if (value < 10) value = "00" + value;
  else value = "0" + value;
  send_command("VCN:" + value);
}

function picture_brightness(value) {
  value = value + 32;
  if (value < 10) value = "00" + value;
  else value = "0" + value;
  send_command("VBR:" + value);
}

function picture_color(value) {
  value = value + 32;
  if (value < 10) value = "00" + value;
  else value = "0" + value;
  send_command("VCO:" + value);
}

function picture_tint(value) {
  value = value + 32;
  if (value < 10) value = "00" + value;
  else value = "0" + value;
  send_command("VTN:" + value);
}

function picture_color_temp(temp) {
  send_command("OTE:" + temp);
}

function picture_color_temp_u1(value) {
  if (value < 100) value = "0" + value;
  send_command("VXX:NCGS1=" + value);
}

function picture_color_temp_u2(value) {
  if (value < 100) value = "0" + value;
  send_command("VXX:NCGS3=" + value);
}

function picture_white_gain(value) {
  if (value < 10) value = "0" + value;
  send_command("VWH:" + value);
}

function picture_gamma(temp) {
  send_command("VGA:" + temp);
}

function picture_gamma_u1(value) {
  if (value < 100) value = "0" + value;
  send_command("VXX:NCGS1=" + value);
}

function picture_daylight_view(view) {
  send_command("VXX:DLVI0=+" + view);
}

function picture_sharpness(value) {
  if (value < 10) value = "00" + value;
  else value = "0" + value;
  send_command("VSR=" + value);
}

function picture_noise_reduction(red) {
  send_command("VNS:" + red);
}

function picture_dyn_contrast(con) {
  send_command("OAI:" + con);
}

function picture_dyn_contrast_nx(con) {
  send_command("VXX:DCNI1=+000" + con);
}

function numberToString(num) {
    return '' + num; // Einfache String-Konkatenation, um eine Zahl in einen String umzuwandeln
}

function padStartCustom(str, targetLength, padString) {
    padString = padString || '0'; // Standardmäßig mit '0' auffüllen
    while (str.length < targetLength) {
        str = padString + str;
    }
    return str;
}

function formatNumber(num) {
    // Erstellen der absoluten Zahl und Formatieren auf 4 Stellen
    var formatted = Math.abs(num);
	formatted = numberToString(formatted);
	formatted = padStartCustom(formatted, 4, '0');

    // Fügen Sie das Vorzeichen hinzu, wenn die Zahl negativ ist
    return num < 0 ? '-' + formatted : formatted;
}

function screen_shift(v_h, valueV, valueH) {
  if (v_h == "V") value = valueV;
  else value = valueH;
  value = formatNumber(value);
  send_command("VT" + v_h + ":" + value);
}

function picture_aspect(asp) {
  send_command("VSE:" + asp);
}

function picture_zoom_lock(lock) {
  send_command("OZS:" + lock);
}

function screen_zoom(v_h, value) {
  if (value < 100) value = "0" + value;
  send_command("OZ" + v_h + ":" + value);
}

function picture_zoom_mode(mode) {
  send_command("OZT:" + mode);
}

function geometry(mode) {
  send_command("VXX:GMMI0=+000" + mode);
}

function geometry_keystone(module, keystone, subkeystone, linearity) {
  if (module == "OSK") value = subkeystone;
  else if (module == "OKS") value = keystone;
  else if (module == "VLI") value = linearity;
  if (module == "OSK") value += 63;
  else value += 127;

  if (value < 10) value = "00" + value;
  else if (value < 100) value = "0" + value;

  send_command(module + ":" + value);
}

function geometry_gkeystone(module, ltr, vk, hk, vb, hb) {
  if (module == "VXX:GMKS0=+") value = ltr;
  else if (module == "VXX:GMKS8=") value = vk;
  else if (module == "VXX:GMKS9=") value = hk;
  else if (module == "VXX:GMKI4=") value = vb;
  else if (module == "VXX:GMKI7=") value = hb;

  if (module == "VXX:GMKI4=" || module == "VXX:GMKI7=") {
    if (value < 0) vorz = "-";
    else vorz = "+";

    if (value < 10) value = "0000" + value;
    else if (value < 10) value = "0000" + value;
    else if (value < 100) value = "000" + value;
    else if (value < 1000) value = "00" + value;
    value = vorz + value;
  }

  send_command(module + value);
}

function geometry_keystone(module, keystone, subkeystone, linearity) {
  if (module == "OSK") value = subkeystone;
  else if (module == "OKS") value = keystone;
  else if (module == "VLI") value = linearity;
  if (module == "OSK") value += 63;
  else value += 127;

  if (value < 10) value = "00" + value;
  else if (value < 100) value = "0" + value;

  send_command(module + ":" + value);
}

function geometry_gcurved(module, ltr, vk, hk, vb, hb, va, ha, mar) {
  if (module == "VXX:GMCS0=+") value = ltr;
  else if (module == "VXX:GMCS8=") value = vk;
  else if (module == "VXX:GMCS9=") value = hk;
  else if (module == "VXX:GMCI2=") value = vb;
  else if (module == "VXX:GMCI6=") value = hb;
  else if (module == "VXX:GMCI3=") value = va;
  else if (module == "VXX:GMCI7=") value = ha;
  else if (module == "VXX:GMCIA=+") value = mar;

  if (
    module != "VXX:GMCS0=+" &&
    module != "VXX:GMCS8=" &&
    module != "VXX:GMCS9="
  ) {
    if (value < 0) {
      vorz = "-";
      value = Math.abs(value);
    } else vorz = "+";

    if (value < 10) value = "0000" + value;
    else if (value < 100) value = "000" + value;
    else if (value < 1000) value = "00" + value;
    else if (value < 10000) value = "0" + value;
    value = vorz + value;
  }

  send_command(module + ":" + value);
}

function geometry_gcorner(corner, vh, value) {
  if (geometry_gcorner_check(corner, vh, value)) {
    if (value < 0) {
      vorz = "-";
      value = Math.abs(value);
    } else vorz = "+";

    if (value < 10) value = "0000" + value;
    else if (value < 100) value = "000" + value;
    else if (value < 1000) value = "00" + value;
    else if (value < 10000) value = "0" + value;
    value = vorz + value;

    if (vh == 1) {
      if (corner == 1) send_command("VXX:GMFI1=" + value);
      else if (corner == 2) send_command("VXX:GMFI2=" + value);
      else if (corner == 3) send_command("VXX:GMFI3=" + value);
      else if (corner == 4) send_command("VXX:GMFI4=" + value);
      else if (corner == 5) send_command("VXX:GMFI5=" + value);
    } else {
      if (corner == 1) send_command("VXX:GMFI6=" + value);
      else if (corner == 2) send_command("VXX:GMFI7=" + value);
      else if (corner == 3) send_command("VXX:GMFI8=" + value);
      else if (corner == 4) send_command("VXX:GMFI9=" + value);
      else if (corner == 5) send_command("VXX:GMFIA=" + value);
    }
  } else {
    util.showMessageBox(
      "Falsche Werte",
      "Die Werte sind nicht in den Grenzen für die Ecke"
    );
  }
}

function geometry_gcorner_check(corner, vh, value) {
  if (vh == 1) {
    if (corner == 1 || corner == 2) {
      if (value > 300) return false;
      else if (value < 0) return false;
      else return true;
    } else if (corner == 3 || corner == 4) {
      if (value > 0) return false;
      else if (value < -300) return false;
      else return true;
    } else if (corner == 5) {
      if (value > 127) return false;
      else if (value < -127) return false;
      else return true;
    }
  } else {
    if (corner == 1 || corner == 3) {
      if (value > 480) return false;
      else if (value < 0) return false;
      else return true;
    } else if (corner == 2 || corner == 4) {
      if (value > 0) return false;
      else if (value < -480) return false;
      else return true;
    } else if (corner == 5) {
      if (value > 127) return false;
      else if (value < -127) return false;
      else return true;
    }
  }
}

function advanced_blanking(side, up, down, right, left) {
  if (side == "DBU:") value = up;
  else if (side == "DBB:") value = down;
  else if (side == "DBR:") value = right;
  else if (side == "DBL:") value = left;

  if (value < 10) value = "00" + value;
  else if (value < 100) value = "0" + value;

  send_command(side + value);
}

function advanced_blending(command) {
  send_command(command);
}

function advanced_blending_onoff(side, value) {
  send_command(side + value);
}

function advanced_blending_start(side, up, down, right, left) {
  if (side == "VEU:") value = up;
  else if (side == "VEB:") value = down;
  else if (side == "VER:") value = right;
  else if (side == "VEL:") value = left;

  if (value < 10) value = "000" + value;
  else if (value < 100) value = "00" + value;
  else if (value < 1000) value = "0" + value;

  send_command(side + value);
}

function advanced_blending_width(side, up, down, right, left) {
  if (side == "VXX:EUWI0=+") value = up;
  else if (side == "VXX:EBWI0=+") value = down;
  else if (side == "VXX:ERWI0=+") value = right;
  else if (side == "VXX:ELWI0=+") value = left;

  if (value < 10) value = "0000" + value;
  else if (value < 100) value = "000" + value;
  else if (value < 1000) value = "00" + value;
  else if (value < 10000) value = "0" + value;

  send_command(side + value);
}

function advanced_blending_marker(value) {
  send_command("VGM:" + value);
}

function advanced_raster(vh, position) {
  position += 5000;
  send_command(vh + position);
}

function display_color(command) {
  send_command("VXX:CMAI0=+0000" + command);
}

function display_color_3(color, red, green, blue, w, tp) {
	w = formatNumber(w);
	red = formatNumber(red);
	green = formatNumber(green);
	blue = formatNumber(blue);
	if (color == "1") 
		send_command("VMR:"+ red + "," + green + "," + blue);
	else if (color == "2") 
		send_command("VMG:"+ red + "," + green + "," + blue);
	else if (color == "3") 
		send_command("VMB:"+ red + "," + green + "," + blue);
	else if (color == "4")
		send_command("VMW:" + w);
	else if (color == "5") 
		send_command("VXX:CATI1=+0000" + tp);	
	else if (color == "6")
		send_command("VXX:CREI1=+00001");

}

function quad_pixel_drive(value) {
  send_command("VXX:QPDI1=+0000" + value);
}