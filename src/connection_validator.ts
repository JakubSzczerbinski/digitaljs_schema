import { BigIntStats } from "fs";
import { Circuit, Connector, Device, Digitaljs, Input, Output, Plug } from "./types";
import { flatMap, map, ObjMap, range } from "./utils";

type In = {
  name: string,
  bits: number,
}

type Out = {
  name: string,
  bits: number,
}

type IO = {
  outputs: Array<Out>,
  inputs: Array<In>
}

type ConnErrors = {
  connector: Connector
  errors: Array<string>;
}

const ioOfDevice = (dev : Device, subcircuit_ios : ObjMap<IO>) : IO => {
  const Ninputs = (n : number, bits : number) : Array<In> => {
    const inputNames = range(n).map(n => "in" + n);
    const inputs = inputNames.map((name : string) : In => ({
      name,
      bits
    }));
    return inputs;
  }

  switch (dev.type) {
    // UnaryGate
    case "Not":
    case "Repeater":
      return {
        outputs: [
          {
            name: "out",
            bits: dev.bits,
          }
        ],
        inputs: [
          {
            name: "in",
            bits: dev.bits,
          }
        ]
      }

    // BinaryGate
    case "And":
    case "Nand":
    case "Or":
    case "Nor":
    case "Xor":
    case "Xnor":
      return {
        outputs: [
          {
            name: "out",
            bits: dev.bits,
          }
        ],
        inputs: [
          {
            name: "in1",
            bits: dev.bits,
          },
          {
            name: "in2",
            bits: dev.bits,
          }
        ]
      }
    
    // ReducingGate
    case "AndReduce":
    case "NandReduce":
    case "OrReduce":
    case "NorReduce":
    case "XorReduce":
    case "XnorReduce":
      return {
        outputs: [
          {
            name: "out",
            bits: 1
          }
        ],
        inputs: [
          {
            name: "in",
            bits: dev.bits
          }
        ]
      }
    
    // Bit shift
    case "ShiftLeft":
    case "ShiftRight":
      return {
        outputs: [
          {
            name: "out",
            bits: dev.bits.out
          }
        ],
        inputs: [
          {
            name: "in1",
            bits: dev.bits.in1
          },
          {
            name: "in2",
            bits: dev.bits.in2
          }
        ]
      }
    
    // Comparision
    case "Eq":
    case "Ne":
    case "Ge":
    case "Gt":
    case "Le":
    case "Lt":
      return {
        outputs: [
          {
            name: "out",
            bits: 1,
          }
        ],
        inputs: [
          {
            name: "in1",
            bits: dev.bits.in1
          },
          {
            name: "in2",
            bits: dev.bits.in2
          }
        ],
      }

    // Constant
    case "Constant":
      return {
        outputs: [
          {
            name: "out",
            bits: dev.constant.length,
          }
        ],
        inputs: []
      }
    
    // UnaryArith
    case "Negation":
    case "UnaryPlus":
      return {
        outputs: [
          {
            name: "out",
            bits: dev.bits.out
          }
        ],
        inputs: [
          {
            name: "in",
            bits: dev.bits.in,
          }
        ],
      }
    
    // BinaryArith
    case "Addition":
    case "Subtraction":
    case "Multiplication":
    case "Division":
    case "Modulo":
    case "Power":
      return {
        outputs: [
          {
            name: "out",
            bits: dev.bits.out,
          }
        ],
        inputs: [
          {
            name: "in1",
            bits: dev.bits.in1
          },
          {
            name: "in2",
            bits: dev.bits.in2
          }
        ]
      }
    
    // Mux
    case "Mux": {
      const inputs = Ninputs(Math.pow(2, dev.bits.sel), dev.bits.in);
      inputs.push({
        name: "sel",
        bits: dev.bits.sel
      })
      return {
        outputs: [
          {
            name: "out",
            bits: dev.bits.in,
          }
        ],
        inputs
      }
    }
    // Mux1Hot
    case "Mux1Hot": {
      const inputs = Ninputs(dev.bits.sel + 1, dev.bits.in);
      inputs.push({
        name: "sel",
        bits: dev.bits.sel
      });
      return {
        outputs: [
          {
            name: "out",
            bits: dev.bits.in
          }
        ],
        inputs
      }
    }
  
    // Dff
    case "Dff":
      return {
        outputs: [
          {
            name: "out",
            bits: dev.bits
          }
        ],
        inputs: [
          {
            name: "in",
            bits: dev.bits
          },
          {
            name: "clk",
            bits: 1
          },
          {
            name: "arst",
            bits: 1
          }
        ]
      }

    // Memory
    case "Memory": {
      const rdPortsOut : Array<Out> = dev.rdports.map(
        (rdPort, i) => ({
          name: `rd${i}data`,
          bits: dev.bits,
        }));

      const rdPortsIn : Array<In> = dev.rdports.map(
        (rdPort, i) : Array<In> => ([
          {
            name: `rd${i}addr`,
            bits: dev.abits
          },
        ].concat(
          rdPort.enable_polarity ? [{
            name: `rd${i}en`,
            bits: 1
          }] : []
        ).concat(
          rdPort.clock_polarity ? [{
            name: `rd${i}clk`,
            bits: 1
          }] : []
        ))
      ).reduce((a, b) => a.concat(b), [])

      const wrPortsIn : Array<In> = dev.rdports.map(
        (wrPort, i) : Array<In> => ([
          {
            name: `wr${i}addr`,
            bits: dev.abits,
          },
          {
            name: `wr${i}data`,
            bits: dev.bits,
          }
        ].concat(
          wrPort.enable_polarity ? [{
            name: `wr${i}en`,
            bits: 1
          }] : []
        ).concat(
          wrPort.clock_polarity ? [{
            name: `wr${i}clk`,
            bits: 1,
          }] : []
        ))
      ).reduce((a, b) => a.concat(b), [])

      return {
        outputs: rdPortsOut,
        inputs: rdPortsIn.concat(rdPortsOut)
      }
    }

    // Input
    // Clock
    // Button
    case "Input":
    case "Clock":
    case "Button":
      return {
        outputs: [
          {
            name: "out",
            bits: 1
          }
        ],
        inputs: []
      }

    // Output
    // Lamp
    case "Output":
    case "Lamp":
      return {
        outputs: [],
        inputs: [
          {
            name: "in",
            bits: 1
          }
        ]
      }

    // NumEntry
    case "NumEntry":
      return {
        outputs: [
          {
            name: "out",
            bits: dev.bits
          }
        ],
        inputs: []
      }
    
    // NumDisplay
    case "NumDisplay":
      return {
        outputs: [],
        inputs: [
          {
            name: "in",
            bits: dev.bits
          }
        ]
      }

    // BusGroup
    case "BusGroup":
      const inputs = dev.groups.map((v, i) => ({
        name: "in" + i,
        bits: v
      }))
      const outputBits = dev.groups.reduce((a, b) => a + b, 0);
      return {
        outputs: [
          {
            name: "out",
            bits: outputBits
          }
        ],
        inputs
      }

    // BusUngroup
    case "BusUngroup":
      const inputBits = dev.groups.reduce((a, b) => a + b, 0);
      const outputs = dev.groups.map((v, i) => ({
        name: "out" + i,
        bits: v
      }))
      return {
        outputs,
        inputs: [
          {
            name: "in",
            bits: inputBits
          }
        ]
      }

    // BusSlice
    case "BusSlice":
      return {
        outputs: [
          {
            name: "out",
            bits: dev.slice.count
          }
        ],
        inputs: [
          {
            name: "in",
            bits: dev.slice.total
          }
        ]
      }
    
    // Extend
    case "SignExtend":
    case "ZeroExtend":
      return {
        outputs: [
          {
            name: "out",
            bits: dev.extend.output
          }
        ],
        inputs: [
          {
            name: "in",
            bits: dev.extend.input
          }
        ]
      }
    
    // FSM
    case "FSM":
      return {
        outputs: [
          {
            name: "out",
            bits: dev.bits.out
          }
        ],
        inputs: [
          {
            name: "clk",
            bits: 1,
          },
          {
            name: "arst",
            bits: 1,
          },
          {
            name: "in",
            bits: dev.bits.in
          }
        ],
      }
    // Subcircuit
    case "Subcircuit":
      return subcircuit_ios[dev.celltype];
  }
}

const ioOfCircuit = (circuit : Circuit) : IO => {
  const devs = circuit.devices;
  const inputs = flatMap(devs, (key : string, val: Device) : Array<In> => {
    if (val.type == "Input") {
      return [{
        name: val.net,
        bits: val.bits
      }]
    }
    return [];
  })

  const outputs = flatMap(devs, (key : string, val : Device) : Array<Out> => {
    if (val.type == "Output") {
      return [{
        name: val.net,
        bits: val.bits
      }]
    }
    return [];
  })

  return {
    inputs,
    outputs
  }
}

export const checkConnections = (djs : Digitaljs, verbose: boolean) : boolean => {
  const subcircuit_ios = map(djs.subcircuits, 
    (key : string, c : Circuit) => ioOfCircuit(c));

  const ioMatches = (input : In, output : Out) => input.bits == output.bits

  const checkCircuit = 
    (devices : ObjMap<Device>, connectors : Array<Connector>) : Array<string> => {
      const devIOs = map(devices,
        (name : string, dev : Device) => ioOfDevice(dev, subcircuit_ios));
      
      const inConnections = map(devIOs,
        (name: string, io: IO) : ObjMap<Array<Connector>> =>
          io.inputs.map((input : In) => ({[input.name]: []})).reduce((a, b) => ({...a, ...b}), {}));

      connectors.forEach((conn: Connector) => {
        if (inConnections[conn.to.id] && inConnections[conn.to.id][conn.to.port])
          inConnections[conn.to.id][conn.to.port].push(conn);
      })

      const getInput = (plug: Plug) : In | undefined => {
        const io : IO | undefined = devIOs[plug.id];
        return io?.inputs.find((input : In) => input.name == plug.port)
      }

      const getOutput = (plug: Plug) : Out | undefined => {
        const io : IO | undefined = devIOs[plug.id];
        return io?.outputs.find((output : Out) => output.name == plug.port)
      }

      const invalidConnectionErrors : Array<string> = connectors.map(
        (conn : Connector) : ConnErrors => {
          const input = getInput(conn.to);
          const output = getOutput(conn.from);
          if (!input || !output) {
            let errors : Array<string> = []
            errors = errors.concat(input ? [] : ["Input not found."])
            errors = errors.concat(output ? [] : ["Output not found."])
            return {
              connector: conn,
              errors
            }
          }

          if (!ioMatches(input, output)) {
            return {
              connector: conn,
              errors: [
                "Input and output don't match. " +
                `Input size = ${input.bits}, ` +
                `Output size = ${output.bits}.`
              ]
            }
          }
          return {
            connector: conn,
            errors: []
          }   
      }).filter(ce => ce.errors.length > 0).map(
        (ce : ConnErrors) : Array<string> => 
          ce.errors.map(
            err => "Bad connector " + 
            `(${ce.connector.from.id}:${ce.connector.from.port} ` +
            `-> ${ce.connector.to.id}:${ce.connector.to.port}). ` +
            `Error: ${err}`)
      ).reduce((a, b) => a.concat(b), [])

      const missingConnectionsErrors = flatMap(inConnections,
        (dev_name: string, dev_inputs : ObjMap<Array<Connector>>) =>
          flatMap(dev_inputs, (port_name: string, port_users: Array<Connector>) => {
            if (port_users.length > 1)
              return port_users.map(
                (conn : Connector) =>
                  `Multiple connectors plugged into ${conn.to.id}:${conn.to.port}. ` +
                  `(${conn.from.id}:${conn.from.port} -> ${conn.to.id}:${conn.to.port}) is one of them.`)
            
            if (port_users.length < 1 && verbose)
              console.error(`WARN ${dev_name}:${port_name} input is not used.`)

            return [];
          })
      );

      return invalidConnectionErrors.concat(missingConnectionsErrors);
    }

    const subcircuit_errors = flatMap(djs.subcircuits,
      (name : string, c : Circuit) : Array<string> => 
        checkCircuit(c.devices, c.connectors).map(err => `${name}: ${err}`)
    )
    
    const toplevel_errors =
      checkCircuit(djs.devices, djs.connectors).map(err => `toplevel: ${err}`);

    const errors = subcircuit_errors.concat(toplevel_errors);
    
    if (errors.length <= 0) {
      return true;
    }

    if (verbose) {
      errors.forEach(err => console.error(err));
    }

    return false;
}