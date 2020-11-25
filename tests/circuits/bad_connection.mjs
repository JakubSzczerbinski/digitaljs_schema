export default {
    "devices": {
        "a": {
            "label": "a",
            "type": "Button",
        },
        "b": {
            "label": "b",
            "type": "NumDisplay",
            "bits": 2,
        },
    },
    "connectors": [
        {
            "from": {
                "id": "a",
                "port": "out"
            },
            "to": {
                "id": "b",
                "port": "in"
            }
        }
    ],
    "subcircuits": {},
}
