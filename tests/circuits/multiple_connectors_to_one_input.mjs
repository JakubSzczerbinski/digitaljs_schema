export default {
    "devices": {
        "a": {
            "label": "a",
            "type": "Button",
        },
        "b": {
            "label": "b",
            "type": "Button",
        },
        "c": {
            "label": "c",
            "type": "Lamp",
        },
    },
    "connectors": [
        {
            "from": {
                "id": "a",
                "port": "out"
            },
            "to": {
                "id": "c",
                "port": "in"
            }
        },
        {
            "from": {
                "id": "b",
                "port": "out"
            },
            "to": {
                "id": "c",
                "port": "in"
            }
        }
    ],
    "subcircuits": {},
}
