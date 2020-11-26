export default {
    "devices": {
      "out2": 
      {
        "type": "Output",
        "label": "",
        "net": "out2",
        "order": 3,
        "bits": 2
      },
      "__INTERMEDIATE__4": 
      {
        "type": "BusSlice",
        "label": "",
        "slice": {
          "first": 0,
          "count": 2,
          "total": 3
        }
      },
      "in1": 
      {
        "type": "Input",
        "label": "",
        "net": "in1",
        "order": 1,
        "bits": 2
      },
      "__INTERMEDIATE__2": 
      {
        "type": "Constant",
        "label": "",
        "constant": "1"
      },
      "T_1": 
      {
        "type": "Addition",
        "label": "",
        "bits": {
          "in1": 2,
          "in2": 1,
          "out": 3
        },
        "signed": {
          "in1": false,
          "in2": false
        }
      },
      "reset": 
      {
        "type": "Input",
        "label": "",
        "net": "reset",
        "order": 0,
        "bits": 1
      },
      "out1": 
      {
        "type": "Output",
        "label": "",
        "net": "out1",
        "order": 2,
        "bits": 2
      }
    },
    "connectors": [
      {
        "to": 
        {
          "id": "T_1",
          "port": "in1"
        },
        "from": 
        {
          "id": "in1",
          "port": "out"
        }
      },
      {
        "to": 
        {
          "id": "T_1",
          "port": "in2"
        },
        "from": 
        {
          "id": "__INTERMEDIATE__2",
          "port": "out"
        }
      },
      {
        "to": 
        {
          "id": "out1",
          "port": "in"
        },
        "from": 
        {
          "id": "in1",
          "port": "out"
        }
      },
      {
        "to": 
        {
          "id": "out2",
          "port": "in"
        },
        "from": 
        {
          "id": "__INTERMEDIATE__4",
          "port": "out"
        }
      },
      {
        "to": 
        {
          "id": "__INTERMEDIATE__4",
          "port": "in"
        },
        "from": 
        {
          "id": "T_1",
          "port": "out"
        }
      }
    ],
    "subcircuits": {
    }
  }