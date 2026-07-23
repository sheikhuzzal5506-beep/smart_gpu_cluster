import { useEffect, useState } from "react";

import NodeCard from "../../components/ui/NodeCard";
import NodeTable from "../../components/ui/NodeTable";
import AddNodeModal from "../../components/ui/AddNodeModal";

import { getNodes } from "../../services/gpuNodeService";

export default function GPUNodes() {

    const [nodes, setNodes] = useState([]);
    const [loading, setLoading] = useState(true);

    const [open, setOpen] = useState(false);

    const [selectedNode, setSelectedNode] = useState(null);

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

    function handleCloseModal() {

        setOpen(false);

        setSelectedNode(null);

        loadNodes();

    }

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
                    value={nodes.length}
                    color="text-cyan-400"
                />

                <NodeCard
                    title="Healthy Nodes"
                    value={nodes.filter(node => node.health_status === "Healthy").length}
                    color="text-green-400"
                />

                <NodeCard
                    title="Busy Nodes"
                    value={nodes.filter(node => node.status === "Busy").length}
                    color="text-yellow-400"
                />

            </div>

            <NodeTable
                nodes={nodes}
                onEdit={handleEditNode}
            />

            <AddNodeModal
                isOpen={open}
                onClose={handleCloseModal}
                selectedNode={selectedNode}
            />

        </div>

    );

}