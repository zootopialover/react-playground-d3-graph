import dagre from "dagre";

var g = new dagre.graphlib.Graph({ compound: true });

g.setGraph({ rankdir: "LR", node: { shape: "rectangle", style: "rounded" } });

g.setDefaultEdgeLabel(function () {
  return {};
});

const MIN_PER_RANK = 1; /* Nodes/Rank: How 'fat' the DAG should be.  */
const MAX_PER_RANK = 5;
const MIN_RANKS = 3; /* Ranks: How 'tall' the DAG should be.  */
const MAX_RANKS = 5;
const PERCENT = 10; /* Chance of having an Edge.  */

let nodes = 100;
const ranks = 10;
const nodesList = [];

const t0 = performance.now();
for (let i = 0; i < ranks; i++) {
  /* New nodes of 'higher' rank than all nodes generated till now.  */
  const new_nodes = Math.floor(Math.random() * 10);

  /* Edges from old nodes ('nodes') to new ones ('new_nodes').  */
  for (let j = 0; j < nodes; j++) {
    if (!(j in nodesList)) {
      nodesList.push(j);
      g.setNode("n" + j, {
        label: "n" + j,
        width: 40,
        height: 10 * Math.floor(Math.random() * 10)
      });
    }
    for (let k = 0; k < new_nodes; k++) {
      if (Math.floor(Math.random() * 100) % 100 < PERCENT && j !== k) {
        if (!(k in nodesList)) {
          nodesList.push(k);
          g.setNode("n" + k, {
            label: "n" + k,
            width: 40,
            height: 10 * Math.floor(Math.random() * 10)
          });
        }
        g.setEdge("n" + j, "n" + k, {
          label: ""
        });
      }
    }
  }
  nodes += new_nodes; /* Accumulate into old node set.  */
}

const t1 = performance.now();
dagre.layout(g, { rankdir: "LR" });
const t2 = performance.now();
g.setNode("n1", {
  label: "n1",
  width: 40,
  height: 1000
});
dagre.layout(g, { rankdir: "LR" });
const t3 = performance.now();
console.log("nodes: " + nodes);
console.log("Generating graph: " + (t1 - t0) + " milliseconds.");
console.log("dagre.layout: " + (t2 - t1) + " milliseconds.");
console.log("dagre.layout: " + (t3 - t2) + " milliseconds.");
