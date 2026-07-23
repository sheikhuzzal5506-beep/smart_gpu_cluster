import { useEffect, useMemo, useState } from "react";

import NodeCard from "../../components/ui/NodeCard";
import NodeTable from "../../components/ui/NodeTable";
import AddNodeModal from "../../components/ui/AddNodeModal";

import {
  getNodes,
  deleteNode,
} from "../../services/gpuNodeService";

export default function GPUNodes() {

  const [nodes, setNodes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState(null);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("All");

  const [healthFilter, setHealthFilter] = useState("All");

  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    loadNodes();
  }, []);

  async function loadNodes() {

    try {

      const data = await getNodes();

      setNodes(data);

    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);

    }

  }

  function handleAddNode() {

    setSelectedNode(null);

    setOpen(true);

  }

  function handleEditNode(node) {

    setSelectedNode(node);

    setOpen(true);

  }

  async function handleDeleteNode(node) {

    const ok = window.confirm(
      `Delete ${node.node_name}?`
    );

    if (!ok) return;

    try {

      await deleteNode(node.id);

      await loadNodes();

      alert("GPU Node Deleted Successfully!");

    } catch (err) {

      console.error(err);

      alert("Delete Failed!");

    }

  }

  function handleCloseModal() {

    setOpen(false);

    setSelectedNode(null);

    loadNodes();

  }

  const filteredNodes = useMemo(() => {

    let data = [...nodes];

    if (search !== "") {

      data = data.filter((node) =>
        node.node_name
          .toLowerCase()
          .includes(search.toLowerCase())
      );

    }

    if (statusFilter !== "All") {

      data = data.filter(
        (node) => node.status === statusFilter
      );

    }

    if (healthFilter !== "All") {

      data = data.filter(
        (node) => node.health_status === healthFilter
      );

    }

    switch (sortBy) {

      case "name":

        data.sort((a, b) =>
          a.node_name.localeCompare(b.node_name)
        );

        break;

      case "gpu":

        data.sort(
          (a, b) =>
            b.available_gpus - a.available_gpus
        );

        break;

      case "utilization":

        data.sort(
          (a, b) =>
            b.utilization_percent -
            a.utilization_percent
        );

        break;

      case "temperature":

        data.sort(
          (a, b) =>
            b.temperature - a.temperature
        );

        break;

      default:

        break;

    }

    return data;

  }, [
    nodes,
    search,
    statusFilter,
    healthFilter,
    sortBy,
  ]);

  if (loading) {

    return (

      <div className="text-white text-xl">

        Loading GPU Nodes...

      </div>

    );

  }

  return (

    <div className="space-y-8">

      <div className="flex justify-between items-center">

        <div>

          <h1 className="text-4xl font-bold text-white">
            GPU Nodes
          </h1>

          <p className="text-slate-400 mt-2">
            Manage all GPU servers.
          </p>

        </div>

        <button
          onClick={handleAddNode}
          className="bg-cyan-500 hover:bg-cyan-600 px-5 py-3 rounded-xl text-white"
        >
          + Add GPU Node
        </button>

      </div>

      <div className="grid md:grid-cols-3 gap-6">

        <NodeCard
          title="Total Nodes"
          value={filteredNodes.length}
          color="text-cyan-400"
        />

        <NodeCard
          title="Healthy Nodes"
          value={
            filteredNodes.filter(
              (node) =>
                node.health_status === "Healthy"
            ).length
          }
          color="text-green-400"
        />

        <NodeCard
          title="Busy Nodes"
          value={
            filteredNodes.filter(
              (node) =>
                node.status === "Busy"
            ).length
          }
          color="text-yellow-400"
        />
              </div>

      <NodeTable
        nodes={filteredNodes}
        search={search}
        setSearch={setSearch}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        healthFilter={healthFilter}
        setHealthFilter={setHealthFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
        onEdit={handleEditNode}
        onDelete={handleDeleteNode}
      />

      <AddNodeModal
        isOpen={open}
        onClose={handleCloseModal}
        selectedNode={selectedNode}
      />

    </div>

  );

}