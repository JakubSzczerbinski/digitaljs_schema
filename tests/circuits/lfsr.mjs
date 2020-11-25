export default {
    "devices": {
        "dev0": {
            "label": "out",
            "type": "NumDisplay",
            "propagation": 0,
            "numbase": "hex",
            "bits": 8,
            "position": {
                "x": 305.984375,
                "y": 0
            }
        },
        "dev1": {
            "label": "clk",
            "type": "Clock",
            "propagation": 100,
            "position": {
                "x": 0,
                "y": 66
            }
        },
        "dev2": {
            "label": "reset",
            "type": "Button",
            "propagation": 0,
            "position": {
                "x": 0,
                "y": 116
            }
        },
        "dev4": {
            "label": "$procdff$4",
            "type": "Dff",
            "propagation": 1,
            "polarity": {
                "clock": true,
                "arst": true
            },
            "bits": 8,
            "initial": "x",
            "position": {
                "x": 140,
                "y": 78
            }
        },
        "dev5": {
            "label": "$xor$lfsr.sv:10$1",
            "type": "Xnor",
            "propagation": 1,
            "bits": 1,
            "position": {
                "x": 480.046875,
                "y": 64
            }
        },
        "dev6": {
            "label": "",
            "type": "BusGroup",
            "propagation": 0,
            "groups": [
                1,
                7
            ],
            "position": {
                "x": 650.046875,
                "y": 128
            }
        },
        "dev7": {
            "label": "",
            "type": "BusSlice",
            "propagation": 0,
            "slice": {
                "first": 7,
                "count": 1,
                "total": 8
            },
            "position": {
                "x": 321.625,
                "y": 50
            }
        },
        "dev8": {
            "label": "",
            "type": "BusSlice",
            "propagation": 0,
            "slice": {
                "first": 3,
                "count": 1,
                "total": 8
            },
            "position": {
                "x": 322.125,
                "y": 94
            }
        },
        "dev9": {
            "label": "",
            "type": "BusSlice",
            "propagation": 0,
            "slice": {
                "first": 0,
                "count": 7,
                "total": 8
            },
            "position": {
                "x": 487.84375,
                "y": 136
            }
        }
    },
    "connectors": [
        {
            "from": {
                "id": "dev4",
                "port": "out"
            },
            "to": {
                "id": "dev0",
                "port": "in"
            },
            "name": "out"
        },
        {
            "from": {
                "id": "dev4",
                "port": "out"
            },
            "to": {
                "id": "dev7",
                "port": "in"
            },
            "name": "out"
        },
        {
            "from": {
                "id": "dev4",
                "port": "out"
            },
            "to": {
                "id": "dev8",
                "port": "in"
            },
            "name": "out"
        },
        {
            "from": {
                "id": "dev4",
                "port": "out"
            },
            "to": {
                "id": "dev9",
                "port": "in"
            },
            "name": "out"
        },
        {
            "from": {
                "id": "dev1",
                "port": "out"
            },
            "to": {
                "id": "dev4",
                "port": "clk"
            },
            "name": "clk"
        },
        {
            "from": {
                "id": "dev2",
                "port": "out"
            },
            "to": {
                "id": "dev4",
                "port": "arst"
            },
            "name": "reset"
        },
        {
            "from": {
                "id": "dev5",
                "port": "out"
            },
            "to": {
                "id": "dev6",
                "port": "in0"
            },
            "name": "linear_feedback"
        },
        {
            "from": {
                "id": "dev6",
                "port": "out"
            },
            "to": {
                "id": "dev4",
                "port": "in"
            }
        },
        {
            "from": {
                "id": "dev7",
                "port": "out"
            },
            "to": {
                "id": "dev5",
                "port": "in1"
            }
        },
        {
            "from": {
                "id": "dev8",
                "port": "out"
            },
            "to": {
                "id": "dev5",
                "port": "in2"
            }
        },
        {
            "from": {
                "id": "dev9",
                "port": "out"
            },
            "to": {
                "id": "dev6",
                "port": "in1"
            }
        }
    ],
    "subcircuits": {}
}