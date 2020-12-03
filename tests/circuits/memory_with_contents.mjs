export default {
    "devices": {
        "dev0": {
            "label": "clk",
            "type": "Clock",
            "propagation": 100,
            "position": {
                "x": 6.03125,
                "y": 0
            }
        },
        "dev1": {
            "label": "addr",
            "type": "NumEntry",
            "propagation": 0,
            "numbase": "hex",
            "bits": 4,
            "position": {
                "x": 0,
                "y": 50
            }
        },
        "dev2": {
            "label": "data",
            "type": "NumDisplay",
            "propagation": 0,
            "numbase": "hex",
            "bits": 4,
            "position": {
                "x": 336.265625,
                "y": 75
            }
        },
        "dev3": {
            "label": "wraddr",
            "type": "NumEntry",
            "propagation": 0,
            "numbase": "hex",
            "bits": 4,
            "position": {
                "x": 0,
                "y": 100
            }
        },
        "dev4": {
            "label": "wrdata",
            "type": "NumEntry",
            "propagation": 0,
            "numbase": "hex",
            "bits": 4,
            "position": {
                "x": 0,
                "y": 150
            }
        },
        "dev5": {
            "label": "mem",
            "type": "Memory",
            "propagation": 1,
            "bits": 4,
            "abits": 4,
            "rdports": [
                {
                    "transparent": true
                }
            ],
            "wrports": [
                {
                    "clock_polarity": true
                }
            ],
            "words": 16,
            "offset": 0,
            "position": {
                "x": 152.0625,
                "y": 54
            },
            "memdata": [
                "0000",
                "0001",
                "0010",
                "0011",
                "0100",
                "0101",
                "0110",
                "0111",
                "1000",
                "1001",
                "1010",
                "1011",
                "1100",
                "1101",
                "1110",
                "1111"
            ]
        }
    },
    "connectors": [
        {
            "from": {
                "id": "dev0",
                "port": "out"
            },
            "to": {
                "id": "dev5",
                "port": "wr0clk"
            },
            "name": "clk"
        },
        {
            "from": {
                "id": "dev1",
                "port": "out"
            },
            "to": {
                "id": "dev5",
                "port": "rd0addr"
            },
            "name": "addr"
        },
        {
            "from": {
                "id": "dev5",
                "port": "rd0data"
            },
            "to": {
                "id": "dev2",
                "port": "in"
            },
            "name": "data"
        },
        {
            "from": {
                "id": "dev3",
                "port": "out"
            },
            "to": {
                "id": "dev5",
                "port": "wr0addr"
            },
            "name": "wraddr"
        },
        {
            "from": {
                "id": "dev4",
                "port": "out"
            },
            "to": {
                "id": "dev5",
                "port": "wr0data"
            },
            "name": "wrdata"
        }
    ],
    "subcircuits": {}
}