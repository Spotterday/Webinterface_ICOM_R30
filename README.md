# ICOM IC-R30 Webinterface

![IC-R30 Webinterface](https://github.com/Spotterday/Webinterface_ICOM_R30/blob/main/IC-R30%20Webinterface.PNG)

## Donate
Guys I know a lot of stuff on Github is free. But I would appreciate a small coffee donation. The project has taken time and grey hairs.

[![paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/paypalme/spotterday/10)

## Hardware requirements

Based on the following document [RS-R30-Brochure](doc/RS-R30-Brochure.pdf), you will need a USB dongle which supports SPP (CI-V command）.
A possible USB dongel which works under Linux and Windows is this : [USB Dongle](https://amzn.to/3o0EV8l) (*Affiliate  Link*)
Bluetooth Profile : A2DP, ATT, AVRCP, GAVDP, GATT, HCRP, HFP, HID, HID over GATT, OPP, PAN, SPP

## Software requirements

OS : Raspbian GNU/Linux 10 (buster) / Windows 10

## Installation

### Prepare Linux

```
pi@R30:~ $ sudo apt-get full-upgrade
pi@R30:~ $ sudo apt-get install pi-bluetooth
pi@R30:~ $ sudo apt-get install npm
pi@R30:~ $ sudo apt-get install nodejs
pi@R30:~ $ sudo apt-get install bluealsa
pi@R30:~ $ sudo apt-get install libasound2 libasound2-dev
``` 

### Disable onboard Bluetooth

``` 
pi@R30:~ $ sudo nano /boot/config.txt

# Add line to /boot/config.txt
dtoverlay=pi3-disable-bt

# Disable hciuart
pi@R30:~ $ sudo systemctl disable hciuart.service

# Reboot
pi@R30:~ $ sudo reboot
```

### Connect Bluetooth <-> IC-R30


### Download IC-R30 Webinterface project from Github

```	
pi@R30:~ $ wget https://github.com/Spotterday/Webinterface_ICOM_R30/archive/main.zip
pi@R30:~ $ unzip main.zip
pi@R30:~ $ cd Webinterface_ICOM_R30-main
```

### Compile node js sub projects with NPM 

```	
pi@R30:~/Webinterface_ICOM_R30-main $ npm install
```	

### Configure Webinterface

```	
pi@R30:~/Webinterface_ICOM_R30-main $ cd config
pi@R30:~/Webinterface_ICOM_R30-main/config $ nano default.json
```	

The main part is the device and scanner section

hwmac : In your R30 settings : Bluetooth Set -> Bluetooth Device Information -> BD Address

```
{
  "version" : {
    "web" : "1.4.0",
    "server" : "1.4.5"
  },
  "server"  : {
    "audio" : {
      "src" : ""
    },
    "http": {
      "host": "0.0.0.0",
      "port": 3000
    },
    "devices": {
      "win"   : "Com4",
      "linux" : "/dev/rfcomm0"
    }
  },
  "scanner" : {
    "usa"   : false,
    "hwmac" : "00:0B:E4:XX:XX:XX",
    "serial": {
      "baudrate"  : 9600,
      "databits"  : 7,
      "autoopen"  : true,
      "stopbits"  : 1,
      "parity"    : "none",
      "lock"      : true
    }
  },
  "debug"   : {
    "server"  : false,
    "web"     : false,
    "data"    : false
  },
  "remote"  : {
    "connect"   : false,
    "host"      : "",
    "port"      : 6000,
    "username"  : "",
    "key"       : "",
    "rights"    : {
      "change" : {
        "freq"  : false,
        "mode"  : false
      }
    }
  }
}
```

### Run Webinterface
```
pi@R30:~/Webinterface_ICOM_R30-main $ node client.js
```

### Run Webinterface as Service



## Known Issues

### IC-R30 Settings not working

### Receive audio via Bluetooth not working




