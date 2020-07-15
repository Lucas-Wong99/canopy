import React, { useRef, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  canvas: {
    position: "absolute",
    top: "28%",
    right: "55%",
    zIndex: 0
  }
}));

function Vines({ statusCount }) {
  const classes = useStyles();
  const [state, setState] = useState({
    lattice: [
      //vertical lattice
      [
        { x: 100, y: 100 },
        { x: 100, y: 500 }
      ],
      [
        { x: 200, y: 100 },
        { x: 200, y: 500 }
      ],
      [
        { x: 300, y: 100 },
        { x: 300, y: 400 }
      ],
      [
        { x: 400, y: 100 },
        { x: 400, y: 300 }
      ],
      [
        { x: 500, y: 100 },
        { x: 500, y: 300 }
      ],
      [
        { x: 600, y: 100 },
        { x: 600, y: 500 }
      ],
      [
        { x: 700, y: 100 },
        { x: 700, y: 500 }
      ],
      //horizontal lattice
      [
        { x: 100, y: 100 },
        { x: 700, y: 100 }
      ],
      [
        { x: 100, y: 200 },
        { x: 700, y: 200 }
      ],
      [
        { x: 100, y: 300 },
        { x: 700, y: 300 }
      ]
    ],
    branches: [
      {
        points: [
          { x: 400, y: 200 },
          { x: 400, y: 200 },
          { x: 400, y: 200 },
          { x: 400, y: 200 }
        ],
        angle: 0,
        distanceToLattice: 1000
      }
    ],
    interations: 0
  });

  const canvasEl = useRef(null);

  function drawVineWithLattice(
    context,
    lattice,
    x,
    y,
    interations,
    sort,
    prune
  ) {
    // Set stroke colour
    context.lineWidth = 0.85;
    context.strokeStyle = `rgb(0, ${Math.random() * (150 - 50) + 50}, 0)`;

    // Grab current branch state
    let branches = state.branches;

    // T value controls the splines, (the curve shape for the vines)
    let t = 0;

    //The core animation loop that will get called by requestAnimationFrame

    const animation = function () {
      // Drawing branches loop
      branches.forEach((branch) => {
        // Draw spline segment
        const ax =
          (-branch.points[0].x +
            3 * branch.points[1].x -
            3 * branch.points[2].x +
            branch.points[3].x) /
          6;
        const ay =
          (-branch.points[0].y +
            3 * branch.points[1].y -
            3 * branch.points[2].y +
            branch.points[3].y) /
          6;
        const bx =
          (branch.points[0].x - 2 * branch.points[1].x + branch.points[2].x) /
          2;
        const by =
          (branch.points[0].y - 2 * branch.points[1].y + branch.points[2].y) /
          2;
        const cx = (-branch.points[0].x + branch.points[2].x) / 2;
        const cy = (-branch.points[0].y + branch.points[2].y) / 2;
        const dx =
          (branch.points[0].x + 4 * branch.points[1].x + branch.points[2].x) /
          6;
        const dy =
          (branch.points[0].y + 4 * branch.points[1].y + branch.points[2].y) /
          6;
        context.beginPath();
        context.moveTo(
          ax * Math.pow(t, 3) + bx * Math.pow(t, 2) + cx * t + dx,
          ay * Math.pow(t, 3) + by * Math.pow(t, 2) + cy * t + dy
        );
        context.lineTo(
          ax * Math.pow(t + 0.1, 3) +
            bx * Math.pow(t + 0.1, 2) +
            cx * (t + 0.1) +
            dx,
          ay * Math.pow(t + 0.1, 3) +
            by * Math.pow(t + 0.1, 2) +
            cy * (t + 0.1) +
            dy
        );
        context.stroke();
        context.closePath();
      });

      // Advance t
      t += 0.1;

      // When finished drawing splines, create a new set of branches
      if (t >= 1) {
        // Create array to store next iteration of branchces
        const new_branches = [];

        // Iterate over each branch
        branches.forEach((branch) => {
          for (let k = 0; k < 2; k++) {
            // Generate random deviation from previous angle
            var angle = branch.angle - (Math.random() * 180 - 90);

            // Determine closest lattice point
            var distanceToLattice = 100000;
            for (var l in lattice) {
              var result = distancePointToLine(branch.points[3], lattice[l]);
              if (result < distanceToLattice) distanceToLattice = result;
            }

            // Generate random length
            var length = Math.random() * 15 + 4;

            // Calculate new point
            var x2 =
              branch.points[3].x + Math.sin((Math.PI * angle) / 180) * length;
            var y2 =
              branch.points[3].y - Math.cos((Math.PI * angle) / 180) * length;

            // Add to new branch array
            new_branches.push({
              points: [
                branch.points[1],
                branch.points[2],
                branch.points[3],
                { x: x2, y: y2 }
              ],
              angle: angle,
              distanceToLattice: distanceToLattice
            });
          }
        });

        // Sort branches by distance to lattice
        new_branches.sort(function (a, b) {
          return a.distanceToLattice - b.distanceToLattice;
        });

        // If over 10 branches, prune the branches furthest from the lattice
        if (prune) {
          if (sort) {
            while (new_branches.length > 20)
              new_branches.splice(
                Math.floor(Math.random() * (new_branches.length - 15) + 15),
                1
              );
          } else {
            while (new_branches.length > 20) {
              new_branches.splice(
                Math.floor(Math.random() * (new_branches.length - 15) + 15),
                1
              );
            } //Math.random() * (max - min) + min;
          }
        }

        // Replace old branch array with new
        branches = new_branches;
        setState((prev) => ({ ...prev, branches: new_branches }));
        // Restart drawing splines at t=0
        t = 0;
      }

      // Interations from state control how far into the animation to start
      //-- this will be the source of controlling from our Database

      interations--;
      if (interations > 0) requestAnimationFrame(animation);
    };
    animation();
  }

  // Function to help sort and prune based on distance from lattice
  function distancePointToLine(point, line) {
    // Length of line segment
    const L = Math.sqrt(
      Math.pow(line[1].x - line[0].x, 2) + Math.pow(line[1].y - line[0].y, 2)
    );

    // Calculate position of projection along line segment
    const r =
      ((point.x - line[0].x) * (line[1].x - line[0].x) +
        (point.y - line[0].y) * (line[1].y - line[0].y)) /
      Math.pow(L, 2);

    // Calculate distance of point to projection
    const s =
      ((line[0].y - point.y) * (line[1].x - line[0].x) -
        (line[0].x - point.x) * (line[1].y - line[0].y)) /
      Math.pow(L, 2);

    // Calculate perpendicular projection of point on line
    if (r >= 0 && r <= 1) {
      return Math.abs(s) * L;
    } else {
      return Math.min(
        Math.sqrt(
          Math.pow(point.x - line[0].x, 2) + Math.pow(point.y - line[0].y, 2)
        ),
        Math.sqrt(
          Math.pow(point.x - line[1].x, 2) + Math.pow(point.y - line[1].y, 2)
        )
      );
    }
  }

  let interval1;
  //let interval2;  <- if we want multiple sources we will have to initiate multiple branches in state, and pass them in as
  // args to the drawVineWithLattice function

  function drawVines() {
    // Lattice now comes from state
    // Get canvas context
    const canvas = canvasEl.current;
    const context = canvas.getContext("2d");

    // Draw vines
    interval1 = drawVineWithLattice(
      context,
      state.lattice,
      55,
      255,
      state.interations,
      true,
      true
    );
    //interval2 = drawVineWithLattice(context, state.lattice, 255, 255, state.interations, true, true);
  }

  const drawLattice = function () {
    const canvas = canvasEl.current;
    const context = canvas.getContext("2d");

    // Draw lattice
    context.lineWidth = 0.5;
    //context.strokeStyle = "rgb(213, 0, 0)";
    context.strokeStyle = "rgb(250, 250, 250)";

    state.lattice.forEach((lattice) => {
      context.beginPath();
      context.moveTo(lattice[0].x, lattice[0].y);
      context.lineTo(lattice[1].x, lattice[1].y);
      context.stroke();
      context.closePath();
    });
  };

  useEffect(() => {
    drawLattice();
  }, []);

  useEffect(() => {
    setState((prev) => ({ ...prev, interations: statusCount }));
  }, [statusCount]);

  useEffect(() => {
    drawVines();
  }, [state.interations]);

  return (
    <canvas
      className={classes.canvas}
      ref={canvasEl}
      height="600"
      width="800"
    />
  );
}

export default Vines;
