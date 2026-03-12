"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

const educationItems = [
  {
    year: "2023 - Present",
    title: "B.Tech Computer Science",
    institution: "Lovely Professional University, Jalandhar, Punjab",
    description: "Focusing on Data Structures & Algorithms, building a strong core CS foundation. Current CGPA: 7.7",
  },
  {
    year: "2022 - 2023",
    title: "Post Matriculation (12th Grade)",
    institution: "Bhavans Tripura Vidya Mandir",
    description: "Completed higher secondary education with a focus on science and mathematics. Marks: 74.5%",
  },
  {
    year: "2020 - 2021",
    title: "Matriculation (10th Grade)",
    institution: "Bhavans Tripura Vidya Mandir",
    description: "Completed secondary education forming a strong academic base. Marks: 89%",
  },
];

const codeSnippets = [
  {
    filename: "traverseTree.ts",
    code: [
      { type: "keyword", text: "function" },
      { type: "function", text: "dfs" },
      { type: "plain", text: "(node: TreeNode | null) {" },
      { type: "newline", text: "" },
      { type: "keyword", text: "  if" },
      { type: "plain", text: " (!node) " },
      { type: "keyword", text: "return" },
      { type: "plain", text: ";" },
      { type: "newline", text: "" },
      { type: "comment", text: "  // Process current node" },
      { type: "newline", text: "" },
      { type: "plain", text: "  " },
      { type: "function", text: "process" },
      { type: "plain", text: "(node.val);" },
      { type: "newline", text: "" },
      { type: "plain", text: "  " },
      { type: "function", text: "dfs" },
      { type: "plain", text: "(node.left);" },
      { type: "newline", text: "" },
      { type: "plain", text: "  " },
      { type: "function", text: "dfs" },
      { type: "plain", text: "(node.right);" },
      { type: "newline", text: "" },
      { type: "plain", text: "}" }
    ]
  },
  {
    filename: "binarySearch.ts",
    code: [
      { type: "keyword", text: "function" },
      { type: "function", text: "search" },
      { type: "plain", text: "(arr: number[], target: number) {" },
      { type: "newline", text: "" },
      { type: "keyword", text: "  let" },
      { type: "plain", text: " l = 0, r = arr.length - 1;" },
      { type: "newline", text: "" },
      { type: "keyword", text: "  while" },
      { type: "plain", text: " (l <= r) {" },
      { type: "newline", text: "" },
      { type: "keyword", text: "    let" },
      { type: "plain", text: " mid = Math." },
      { type: "function", text: "floor" },
      { type: "plain", text: "((l + r) / 2);" },
      { type: "newline", text: "" },
      { type: "keyword", text: "    if" },
      { type: "plain", text: " (arr[mid] === target) " },
      { type: "keyword", text: "return" },
      { type: "plain", text: " mid;" },
      { type: "newline", text: "" },
      { type: "keyword", text: "    if" },
      { type: "plain", text: " (arr[mid] < target) l = mid + 1;" },
      { type: "newline", text: "" },
      { type: "keyword", text: "    else" },
      { type: "plain", text: " r = mid - 1;" },
      { type: "newline", text: "" },
      { type: "plain", text: "  }" },
      { type: "newline", text: "" },
      { type: "keyword", text: "  return" },
      { type: "plain", text: " -1;" },
      { type: "newline", text: "" },
      { type: "plain", text: "}" }
    ]
  },
  {
    filename: "quickSort.ts",
    code: [
      { type: "keyword", text: "const" },
      { type: "plain", text: " " },
      { type: "function", text: "quickSort" },
      { type: "plain", text: " = (arr: number[]): number[] => {" },
      { type: "newline", text: "" },
      { type: "keyword", text: "  if" },
      { type: "plain", text: " (arr.length <= 1) " },
      { type: "keyword", text: "return" },
      { type: "plain", text: " arr;" },
      { type: "newline", text: "" },
      { type: "keyword", text: "  const" },
      { type: "plain", text: " pivot = arr[arr.length - 1];" },
      { type: "newline", text: "" },
      { type: "keyword", text: "  const" },
      { type: "plain", text: " left = arr." },
      { type: "function", text: "filter" },
      { type: "plain", text: "(x => x < pivot);" },
      { type: "newline", text: "" },
      { type: "keyword", text: "  const" },
      { type: "plain", text: " right = arr." },
      { type: "function", text: "filter" },
      { type: "plain", text: "(x => x > pivot);" },
      { type: "newline", text: "" },
      { type: "keyword", text: "  return" },
      { type: "plain", text: " [...quickSort(left), pivot, ...quickSort(right)];" },
      { type: "newline", text: "" },
      { type: "plain", text: "};" }
    ]
  },
  {
    filename: "dijkstra.ts",
    code: [
      { type: "keyword", text: "function" },
      { type: "function", text: "shortestPath" },
      { type: "plain", text: "(graph, start) {" },
      { type: "newline", text: "" },
      { type: "keyword", text: "  const" },
      { type: "plain", text: " distances = {};" },
      { type: "newline", text: "" },
      { type: "keyword", text: "  const" },
      { type: "plain", text: " pq = new " },
      { type: "function", text: "PriorityQueue" },
      { type: "plain", text: "();" },
      { type: "newline", text: "" },
      { type: "plain", text: "  distances[start] = 0;" },
      { type: "newline", text: "" },
      { type: "plain", text: "  pq.enqueue(start, 0);" },
      { type: "newline", text: "" },
      { type: "comment", text: "  // Explore neighbors..." },
      { type: "newline", text: "" },
      { type: "keyword", text: "  while" },
      { type: "plain", text: " (!pq.isEmpty()) {" },
      { type: "newline", text: "" },
      { type: "keyword", text: "    let" },
      { type: "plain", text: " curr = pq.dequeue();" },
      { type: "newline", text: "" },
      { type: "keyword", text: "    for" },
      { type: "plain", text: " (let node of graph[curr]) {" },
      { type: "newline", text: "" },
      { type: "plain", text: "      // Relax edges" },
      { type: "newline", text: "" },
      { type: "plain", text: "    }" },
      { type: "newline", text: "" },
      { type: "plain", text: "  }" },
      { type: "newline", text: "" },
      { type: "plain", text: "}" }
    ]
  }
];

export default function Education() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSnippet, setActiveSnippet] = useState(codeSnippets[0]);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 150]);

  useEffect(() => {
    // Pick a random code snippet on mount
    const randomSnippet = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
    setActiveSnippet(randomSnippet);
  }, []);

  return (
    <section id="education" className="relative w-full min-h-screen py-32 bg-background overflow-hidden" ref={containerRef}>
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row gap-16 md:gap-32">
          
          {/* Left Column: Text & Timeline */}
          <div className="flex-1 z-10">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                Education.
              </h2>
              <p className="text-secondary text-lg leading-relaxed mb-16 max-w-xl">
                My academic journey defines my strong foundation in logical problem solving and software engineering. I am constantly learning, adapting, and growing my skill set.
              </p>
            </motion.div>

            <div className="space-y-12">
              {educationItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="relative pl-8 border-l border-border"
                >
                  <div className="absolute w-3 h-3 bg-accent rounded-full -left-[1.5px] top-1.5 transform -translate-x-1/2"></div>
                  <span className="text-sm font-mono text-accent mb-2 block">{item.year}</span>
                  <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
                  <h4 className="text-sm text-secondary mb-3">{item.institution}</h4>
                  <p className="text-secondary text-sm leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Code Snippets & Floating Cards */}
          <div className="flex-1 relative hidden lg:block h-[600px]">
            {/* Animated Code Mockup */}
            <motion.div 
              style={{ y: y1 }}
              className="absolute top-10 right-10 w-96 bg-[#0c0c0c] border border-border rounded-lg overflow-hidden shadow-2xl z-20"
            >
              <div className="flex items-center space-x-2 px-4 py-3 border-b border-border bg-[#111]">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                <AnimatePresence mode="popLayout">
                  <motion.span 
                    key={activeSnippet.filename}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="ml-4 text-xs font-mono text-secondary"
                  >
                    {activeSnippet.filename}
                  </motion.span>
                </AnimatePresence>
                <div className="ml-auto text-xs font-mono text-accent animate-pulse">Running...</div>
              </div>
              <div className="p-6 font-mono text-sm leading-[1.7] text-zinc-300 min-h-[250px]">
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={activeSnippet.filename}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {activeSnippet.code.map((token, i) => {
                      if (token.type === "newline") return <br key={i} />;
                      const color = 
                        token.type === "keyword" ? "text-[#c678dd]" :
                        token.type === "function" ? "text-[#61afef]" :
                        token.type === "comment" ? "text-[#7f848e] italic" : "";
                      return (
                        <span key={i} className={color}>
                          {token.text.replace(/ /g, "\u00A0")}
                        </span>
                      );
                    })}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Floating Tech Card */}
            <motion.div
              style={{ y: y2 }}
              className="absolute bottom-10 left-0 w-64 bg-card/40 backdrop-blur-xl border border-border rounded-xl p-6 shadow-xl z-30"
            >
              <h4 className="font-mono text-xs text-accent mb-4 tracking-wider uppercase">Focus Areas</h4>
              <ul className="space-y-3 text-sm font-medium">
                <li className="flex justify-between items-center group cursor-default">
                  <span className="group-hover:text-accent transition-colors duration-300">Data Structures</span>
                  <span className="text-xs text-secondary">500+ LeetCode</span>
                </li>
                <li className="flex justify-between items-center group cursor-default">
                  <span className="group-hover:text-accent transition-colors duration-300">Full Stack (MERN)</span>
                  <span className="text-xs text-secondary">Node/React</span>
                </li>
                <li className="flex justify-between items-center group cursor-default">
                  <span className="group-hover:text-accent transition-colors duration-300">Real-time Systems</span>
                  <span className="text-xs text-secondary">WebSockets</span>
                </li>
              </ul>
            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
