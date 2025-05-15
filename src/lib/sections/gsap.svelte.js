// import { gsap } from "gsap/dist/gsap";
// import { SplitText } from "gsap/dist/SplitText";

// gsap.registerPlugin(SplitText);

// export function animate(node, { type, ...args }) {
//   let method = gsap[type];
//   return method(node, args);
// }

// export function splitText(node, options = {}) {
//   if (!node) return;
  
//   const split = new SplitText(node, {
//     type: "chars,words",
//     ...options
//   });
  
//   // Store the split instance on the node for debugging
//   node._splitInstance = split;
  
//   // Return the split instance directly
//   return split;
// }