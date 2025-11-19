// "use client";

// import React, { useState, useCallback, useMemo } from "react";
// import "reactflow/dist/style.css";
// import type { AddRoleButtonProps, AddUserTriggerProps } from "../type";
// import ModalUser from "./modal-select-user";

// // import { useCreateEmployeeRole } from "@/actions/employee-role/client/useGetEmployeeRole";
// // import { toast } from "sonner";

// function AddRoleButton({
//   onAdd,
//   className,
//   label = "+ Add Role",
// }: AddRoleButtonProps) {
//   return (
//     <button
//       type="button"
//       onClick={(e) => {
//         e.stopPropagation();
//         onAdd();
//       }}
//       className={
//         className ||
//         "border border-dashed border-gray-400 text-gray-400 mt-2 rounded-lg px-6 py-2 w-[240px] hover:border-gray-600 hover:text-gray-600 text-sm"
//       }
//     >
//       {label}
//     </button>
//   );
// }

// function AddUserTrigger({
//   users,
//   takenIds,
//   onSave,
//   className = "mt-2",
// }: AddUserTriggerProps) {
//   const [selected, setSelected] = useState<string[]>([]);
//   return (
//     <ModalUser
//       users={users}
//       taken={takenIds}
//       value={selected}
//       onChange={setSelected}
//       onSave={onSave}
//       triggerElement={
//         <button
//           type="button"
//           className={`${className} w-5 h-5 rounded-full border bg-background text-[11px] leading-none hover:bg-gray-100 shadow`}
//           title="Add user"
//         >
//           +
//         </button>
//       }
//     />
//   );
// }

// function layout(nodes: Node[], edges: Edge[]): [Node[], Edge[]] {
//   const g = new dagre.graphlib.Graph();
//   g.setDefaultEdgeLabel(() => ({}));
//   g.setGraph({ rankdir: "TB", nodesep: 40, ranksep: 60 });

//   nodes.forEach((n) =>
//     g.setNode(n.id, { width: 240, height: n.type === "role" ? 80 : 60 })
//   );
//   edges.forEach((e) => g.setEdge(e.source, e.target));
//   dagre.layout(g);

//   const xs = nodes.map((n) => g.node(n.id).x);
//   const shiftX = (Math.min(...xs) + Math.max(...xs)) / 2;

//   return [
//     nodes.map((n) => {
//       const { x, y } = g.node(n.id);
//       return {
//         ...n,
//         position: { x: x - shiftX, y },
//         targetPosition: Position.Top,
//         sourcePosition: Position.Bottom,
//       };
//     }),
//     edges,
//   ];
// }

// const runLayout = (
//   nextNodes: Node[],
//   nextEdges: Edge[],
//   setNodes: (n: Node[]) => void,
//   setEdges: (e: Edge[]) => void,
//   rf?: { fitView: () => void }
// ) => {
//   const [ln, le] = layout(nextNodes, nextEdges);
//   setNodes(ln);
//   setEdges(le);
//   if (rf) requestAnimationFrame(() => rf.fitView());
// };

// function RoleCardNode({ id, data }: NodeProps<RoleDatas>) {
//   const rf = useReactFlow();
//   const edges = useEdges();
//   const hasChild = edges.some((e) => e.source === id && e.type === "add-role");
//   const parentId = rf
//     .getEdges()
//     .find((e) => e.target === id && e.type === "add-role")?.source;

//   const spawnRole = (name: string, parent: string) => {
//     const rid = crypto.randomUUID();
//     const newNode: Node<RoleDatas> = {
//       id: rid,
//       type: "role",
//       data: {
//         label: name,
//         onOpenModal: data.onOpenModal,
//         onOpenProfile: data.onOpenProfile,
//       },
//       position: { x: 0, y: 0 },
//     };

//     runLayout(
//       [...rf.getNodes(), newNode],
//       [
//         ...rf.getEdges(),
//         {
//           id: `e-${parent}-${rid}`,
//           source: parent,
//           target: rid,
//           type: "add-role",
//         },
//       ],
//       rf.setNodes,
//       rf.setEdges,
//       rf
//     );
//   };

//   const addSibling = () =>
//     parentId && data.onOpenModal((name) => spawnRole(name, parentId));
//   const addChild = () =>
//     !hasChild && data.onOpenModal((name) => spawnRole(name, id));
//   const editLabel = () =>
//     data.onOpenModal((name) =>
//       rf.setNodes((nds) =>
//         nds.map((n) =>
//           n.id === id ? { ...n, data: { ...n.data, label: name } } : n
//         )
//       )
//     );

//   const handleSaveUsers = useCallback(
//     (ids: string[]) => {
//       if (!ids.length) return;
//       let prev = id;
//       const existing = rf.getNodes();
//       const existingEdges = rf.getEdges();
//       const newNodes: Node<UserDatas>[] = [];
//       const newEdges: Edge[] = [];

//       ids.forEach((uid) => {
//         if (!existing.some((n) => n.id === uid)) {
//           const u = dummyUsers.find((d) => d.id === uid)!;
//           newNodes.push({
//             id: uid,
//             type: "user",
//             data: {
//               label: `${u.firstName} ${u.lastName}`,
//               description: u.description,
//               photoUrl: u.photoUrl,
//               onOpenProfile: data.onOpenProfile,
//               onOpenModal: data.onOpenModal,
//             },
//             position: { x: 0, y: 0 },
//           });
//         }
//         newEdges.push({
//           id: `e-${prev}-${uid}`,
//           source: prev,
//           target: uid,
//           type: "add-role",
//         });
//         prev = uid;
//       });

//       runLayout(
//         [...existing, ...newNodes],
//         [...existingEdges, ...newEdges],
//         rf.setNodes,
//         rf.setEdges,
//         rf
//       );
//     },
//     [id, data, rf]
//   );

//   const takenIds = rf
//     .getNodes()
//     .filter((n) => n.type === "user")
//     .map((n) => n.id);

//   return (
//     <div className="relative flex flex-col items-center select-none">
//       <div className="relative rounded-lg bg-background border shadow-sm px-6 py-4 w-[240px] text-center">
//         <Handle type="target" position={Position.Top} />

//         {parentId && (
//           <AddRoleButton
//             onAdd={addSibling}
//             className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border bg-background text-[13px] text-gray-600 hover:bg-gray-100 hover:text-black shadow"
//             label="+"
//           />
//         )}

//         <PencilIcon
//           size={14}
//           className="absolute top-1 right-1 cursor-pointer text-muted-foreground hover:text-black"
//           onClick={(e) => {
//             e.stopPropagation();
//             editLabel();
//           }}
//         />
//         <div className="font-bold text-sm">{data.label}</div>
//         <Handle type="source" position={Position.Bottom} />
//       </div>

//       {!hasChild && (
//         <>
//           <AddUserTrigger
//             users={dummyUsers}
//             takenIds={takenIds}
//             onSave={handleSaveUsers}
//           />
//           <AddRoleButton onAdd={addChild} />
//         </>
//       )}
//     </div>
//   );
// }

// function UserCardNode({ id, data }: NodeProps<UserDatas>) {
//   const rf = useReactFlow();
//   const edges = useEdges();
//   const hasChild = edges.some((e) => e.source === id && e.type === "add-role");

//   const addChild = () => {
//     data.onOpenModal((name) => {
//       const rid = crypto.randomUUID();
//       const newNode: Node<RoleDatas> = {
//         id: rid,
//         type: "role",
//         data: {
//           label: name,
//           onOpenModal: data.onOpenModal,
//           onOpenProfile: data.onOpenProfile,
//         },
//         position: { x: 0, y: 0 },
//       };

//       runLayout(
//         [...rf.getNodes(), newNode],
//         [
//           ...rf.getEdges(),
//           { id: `e-${id}-${rid}`, source: id, target: rid, type: "add-role" },
//         ],
//         rf.setNodes,
//         rf.setEdges,
//         rf
//       );
//     });
//   };

//   return (
//     <div
//       className="flex flex-col items-center select-none cursor-pointer"
//       onClick={() => data.onOpenProfile(id)}
//     >
//       <div className="flex items-center gap-3 rounded-full border px-3 py-2 bg-background shadow w-[240px]">
//         <Handle type="target" position={Position.Top} />
//         <GlobalImage
//           src={data.photoUrl}
//           alt={data.label}
//           className="w-8 h-8 rounded-full object-cover shrink-0"
//         />
//         <div className="text-xs">
//           <div className="font-medium">{data.label}</div>
//           <div className="text-muted-foreground">{data.description}</div>
//         </div>
//         <Handle type="source" position={Position.Bottom} />
//       </div>
//       {!hasChild && <AddRoleButton onAdd={addChild} />}
//     </div>
//   );
// }

// export function AddRoleEdge(props: EdgeProps) {
//   const { id, sourceX, sourceY, targetX, targetY, source, target } = props;
//   const rf = useReactFlow();
//   const sourceType = rf.getNode(source)?.type;
//   const targetType = rf.getNode(target)?.type;

//   const isRoleToRole = sourceType === "role" && targetType === "role";
//   const GAP = isRoleToRole ? 0 : 40;
//   const yMid = isRoleToRole ? sourceY + (targetY - sourceY) / 2 : sourceY + GAP;

//   const path = `M ${sourceX},${sourceY}
//                 L ${sourceX},${yMid}
//                 L ${targetX},${yMid}
//                 L ${targetX},${targetY}`;

//   const handleSaveUsers = useCallback(
//     (ids: string[]) => {
//       if (!ids.length) return;

//       const originalSource = source;
//       const originalTarget = target;

//       const existingNodes = rf.getNodes();
//       const existingEdges = rf.getEdges();

//       let prevId = originalSource;
//       const newNodes: Node<UserDatas>[] = [];
//       const userChainEdges: Edge[] = [];

//       ids.forEach((uid) => {
//         if (!existingNodes.some((n) => n.id === uid)) {
//           const u = dummyUsers.find((d) => d.id === uid)!;
//           newNodes.push({
//             id: uid,
//             type: "user",
//             data: {
//               label: `${u.firstName} ${u.lastName}`,
//               description: u.description,
//               photoUrl: u.photoUrl,
//               onOpenProfile: rf.getNode(originalSource)!.data.onOpenProfile,
//               onOpenModal: rf.getNode(originalSource)!.data.onOpenModal,
//             },
//             position: { x: 0, y: 0 },
//           });
//         }
//         userChainEdges.push({
//           id: `e-${prevId}-${uid}`,
//           source: prevId,
//           target: uid,
//           type: "add-role",
//         });
//         prevId = uid;
//       });

//       userChainEdges.push({
//         id: `e-${prevId}-${originalTarget}`,
//         source: prevId,
//         target: originalTarget,
//         type: "add-role",
//       });

//       const kept = existingEdges.filter(
//         (e) => !(e.source === originalSource && e.target === originalTarget)
//       );
//       const adjusted = kept.map((e) =>
//         e.source === originalSource ? { ...e, source: prevId } : e
//       );

//       runLayout(
//         [...existingNodes, ...newNodes],
//         [...adjusted, ...userChainEdges],
//         rf.setNodes,
//         rf.setEdges,
//         rf
//       );
//     },
//     [rf, source, target]
//   );

//   const takenIds = rf
//     .getNodes()
//     .filter((n) => n.type === "user")
//     .map((n) => n.id);

//   return (
//     <>
//       <BaseEdge id={id} path={path} style={{ strokeDasharray: "6 4" }} />
//       {sourceType === "role" && (
//         <EdgeLabelRenderer>
//           <div
//             style={{
//               position: "absolute",
//               left: sourceX,
//               top: yMid,
//               transform: "translate(-50%, -50%)",
//               pointerEvents: "all",
//             }}
//           >
//             <AddUserTrigger
//               users={dummyUsers}
//               takenIds={takenIds}
//               onSave={handleSaveUsers}
//             />
//           </div>
//         </EdgeLabelRenderer>
//       )}
//     </>
//   );
// }

// export const OrgEmployeeTree = () => {
//   // const { mutate } = useCreateEmployeeRole();

//   const [nodes, setNodes] = useNodesState<Node[]>([]);
//   const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>([]);
//   const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
//   const [afterSaveRole, setAfterSaveRole] = useState<
//     null | ((name: string) => void)
//   >(null);
//   const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
//   const [isUserModalOpen, setIsUserModalOpen] = useState(false);

//   const openRoleModal = (cb: (name: string) => void) => {
//     setAfterSaveRole(() => cb);
//     setIsRoleModalOpen(true);
//   };

//   const openUserProfile = (userId: string) => {
//     const u = dummyUsers.find((d) => d.id === userId);
//     if (!u) return;
//     setSelectedUser({
//       id: u.id,
//       photoUrl: u.photoUrl,
//       name: `${u.firstName} ${u.lastName}`,
//       mainRole: "Developer",
//       position: u.description.trim(),
//       traits: ["Team Player"],
//       email: `${u.firstName.toLowerCase()}@example.com`,
//       gender: "Female",
//       phone: "081-234-5678",
//       startDate: "2025-01-01",
//       address: "Bangkok, Thailand",
//     });
//     setIsUserModalOpen(true);
//   };

//   const createRootRole = (name: string) => {
//     const id = crypto.randomUUID();
//     const node: Node<RoleDatas> = {
//       id,
//       type: "role",
//       data: {
//         label: name,
//         onOpenModal: openRoleModal,
//         onOpenProfile: openUserProfile,
//       },
//       position: { x: 0, y: 0 },
//     };
//     runLayout([node], [], setNodes, setEdges);
//   };

//   const form = useForm<PermissionControlValues>({ defaultValues: {} });
//   const nodeTypes = useMemo(
//     () => ({ role: RoleCardNode, user: UserCardNode }),
//     []
//   );
//   const edgeTypes = useMemo(() => ({ "add-role": AddRoleEdge }), []);

//   const handleNodesChange = useCallback(
//     (changes: NodeChange[]) => {
//       const removed = changes
//         .filter((c) => c.type === "remove")
//         .map((c) => c.id as string);
//       if (!removed.length) {
//         setNodes((nds) => applyNodeChanges(changes, nds));
//         return;
//       }

//       const newNodes = applyNodeChanges(changes, nodes);
//       const keptEdges = edges.filter(
//         (e) => !removed.includes(e.source) && !removed.includes(e.target)
//       );

//       removed.forEach((rid) => {
//         const ins = edges.filter((e) => e.target === rid);
//         const outs = edges.filter((e) => e.source === rid);
//         ins.forEach((inE) =>
//           outs.forEach((outE) =>
//             keptEdges.push({
//               id: `e-${inE.source}-${outE.target}`,
//               source: inE.source,
//               target: outE.target,
//               type: inE.type,
//             })
//           )
//         );
//       });

//       runLayout(newNodes, keptEdges, setNodes, setEdges);
//     },
//     [nodes, edges, setNodes, setEdges]
//   );

//   return (
//     <>
//       <Card className="w-full">
//         <CardContent className="pt-6">
//           <div className="h-[70vh] relative">
//             <ReactFlow
//               nodes={nodes}
//               edges={edges}
//               onNodesChange={handleNodesChange}
//               onEdgesChange={onEdgesChange}
//               nodeTypes={nodeTypes}
//               edgeTypes={edgeTypes}
//               fitView
//               nodesDraggable={false}
//             >
//               <Controls />
//             </ReactFlow>

//             {!nodes.length && (
//               <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//                 <AddRoleButton
//                   onAdd={() =>
//                     openRoleModal((n) => createRootRole(n || "OWNER"))
//                   }
//                   className="pointer-events-auto border border-gray-400 text-gray-400 px-6 py-2 rounded-lg hover:border-gray-600 hover:text-gray-600 text-sm"
//                 />
//               </div>
//             )}
//           </div>
//         </CardContent>
//       </Card>

//       {isRoleModalOpen && (
//         <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center">
//           <div className="bg-background rounded-lg shadow-xl w-full max-w-4xl p-6 relative">
//             <button
//               type="button"
//               onClick={() => setIsRoleModalOpen(false)}
//               className="absolute top-4 right-4 text-muted-foreground hover:text-black"
//             >
//               <XIcon className="w-5 h-5" />
//             </button>

//             <FormProvider {...form}>
//               <ModelPermissionControl
//                 initialName=""
//                 form={form}
//                 roles={[]}
//                 onSaveName={(name) => {
//                   afterSaveRole?.(name.trim() || "New Role");
//                   setIsRoleModalOpen(false);
//                   setAfterSaveRole(null);
//                 }}
//                 onClose={() => setIsRoleModalOpen(false)}
//               />
//             </FormProvider>
//           </div>
//         </div>
//       )}

//       {isUserModalOpen && selectedUser && (
//         <div
//           className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center"
//           onClick={() => setIsUserModalOpen(false)}
//         >
//           <div
//             className="bg-background rounded-lg shadow-xl p-6 relative"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <UserProfileCard
//               data={selectedUser}
//               onDelete={(rid) => {
//                 setNodes((prevNodes) => {
//                   const nextNodes = prevNodes.filter((n) => n.id !== rid);

//                   setEdges((prevEdges) => {
//                     const ins = prevEdges.filter((e) => e.target === rid);
//                     const outs = prevEdges.filter((e) => e.source === rid);
//                     const kept = prevEdges.filter(
//                       (e) => e.source !== rid && e.target !== rid
//                     );

//                     ins.forEach((inE) =>
//                       outs.forEach((outE) => {
//                         const newEdgeId = `e-${inE.source}-${outE.target}`;
//                         if (!kept.find((e) => e.id === newEdgeId)) {
//                           kept.push({
//                             id: newEdgeId,
//                             source: inE.source,
//                             target: outE.target,
//                             type: inE.type,
//                           });
//                         }
//                       })
//                     );

//                     runLayout(nextNodes, kept, setNodes, setEdges);
//                     return kept;
//                   });

//                   return nextNodes;
//                 });

//                 setIsUserModalOpen(false);
//               }}
//               onChangeRole={() => {
//                 setIsUserModalOpen(false);
//               }}
//             />
//           </div>
//         </div>
//       )}
//     </>
//   );
// };
