"use client";

import { nanoid } from "nanoid";
import { useModelStore } from "@/store/modelStore";

export default function Sidebar() {
  const layers = useModelStore((s: any) => s.layers);
  const addLayer = useModelStore((s: any) => s.addLayer);
  const updateUnits = useModelStore((s: any) => s.updateUnits);
  const removeLayer = useModelStore((s: any) => s.removeLayer);
  const setLearningRate = useModelStore((s: any) => s.setLearningRate);
  const lr = useModelStore((s: any) => s.training.learningRate);

  return (
    <div className="w-72 border-r border-neutral-800 p-4 space-y-4">
      <h2 className="text-xs uppercase tracking-wider text-neutral-500">
        Model Layers
      </h2>

      {layers.map((layer: any) => (
        <div
          key={layer.id}
          className="border border-neutral-700 rounded p-2 space-y-2"
        >
          <div className="flex justify-between text-sm">
            <span>{layer.type}</span>
            {layer.type === "dense" && (
              <button
                className="text-red-400"
                onClick={() => removeLayer(layer.id)}
              >
                ✕
              </button>
            )}
          </div>

          {layer.type === "dense" && (
            <input
              type="range"
              min={1}
              max={256}
              value={layer.units}
              onChange={(e) =>
                updateUnits(layer.id, Number(e.target.value))
              }
              className="w-full"
            />
          )}

          <div className="text-xs text-neutral-400">
            Units: {layer.units}
          </div>
        </div>
      ))}

      <button
        className="w-full text-sm text-neutral-300 hover:text-white border border-neutral-700 rounded py-1"
        onClick={() =>
          addLayer({
            id: nanoid(),
            type: "dense",
            units: 64,
            activation: "relu"
          })
        }
      >
        + Add Dense Layer
      </button>

      <div className="pt-4 border-t border-neutral-800">
        <h2 className="text-xs uppercase tracking-wider text-neutral-500 mb-2">
          Training
        </h2>

        <label className="text-xs text-neutral-400">
          Learning Rate (α)
        </label>

        <input
          type="range"
          min={0.0001}
          max={0.01}
          step={0.0001}
          value={lr}
          onChange={(e) =>
            setLearningRate(Number(e.target.value))
          }
          className="w-full"
        />

        <div className="text-xs text-neutral-400">
          α = {lr.toFixed(4)}
        </div>
      </div>
    </div>
  );
}
