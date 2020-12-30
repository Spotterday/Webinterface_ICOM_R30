# ICOM IC-R30 Webinterface

![IC-R30 Webinterface](https://github.com/Spotterday/Webinterface_ICOM_R30/blob/main/IC-R30%20Webinterface.PNG)

## Hardware requirements

Based on the following document [RS-R30-Brochure](doc/RS-R30-Brochure.pdf), you will need a USB dongle which supports SPP (CI-V command）.
A possible USB dongel which works under Linux and Windows is this : [USB Dongle](https://amzn.to/3o0EV8l) (*Affiliate  Link*)
Bluetooth Profile : A2DP, ATT, AVRCP, GAVDP, GATT, HCRP, HFP, HID, HID over GATT, OPP, PAN, SPP

## Software requirements

OS : Raspbian GNU/Linux 10 (buster) / Windows 10

## Installation

### Prepare Linux

```
apt-get full-upgrade
apt-get install pi-bluetooth
apt-get install npm
apt-get install nodejs
apt-get install bluealsa
apt-get install libasound2 libasound2-dev
``` 

### Disable onboard Bluetooth

``` 
sudo nano /boot/config.txt

# Add line to /boot/config.txt
dtoverlay=pi3-disable-bt

# Disable hciuart
sudo systemctl disable hciuart.service

# Reboot
sudo reboot
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

## Known Issues

### IC-R30 Settings not working

### Receive audio via Bluetooth not working




